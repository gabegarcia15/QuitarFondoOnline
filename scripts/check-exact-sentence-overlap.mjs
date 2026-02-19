import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const referenceFile = path.join(root, "documents/reference/eliminarfondodeunaimagen-home-2026-02-19.html");
const targetFiles = [
  "src/components/lead-magnet/landing-page.tsx",
  "src/app/page.tsx",
  "src/lib/guides.ts",
].map((file) => path.join(root, file));

const MIN_WORDS = 6;
const MIN_CHARS = 35;

function readRequired(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing required file: ${path.relative(root, filePath)}`);
  }
  return fs.readFileSync(filePath, "utf8");
}

function decodeHtmlEntities(text) {
  const named = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
    nbsp: " ",
  };

  return text
    .replace(/&#(\d+);/g, (_, num) => String.fromCodePoint(Number.parseInt(num, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&([a-zA-Z]+);/g, (full, key) => named[key] ?? full);
}

function htmlToText(html) {
  const withoutBlocks = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ");

  const withoutTags = withoutBlocks.replace(/<[^>]+>/g, " ");
  return decodeHtmlEntities(withoutTags);
}

function splitIntoSentences(text) {
  const compact = text.replace(/\s+/g, " ").trim();
  if (!compact) {
    return [];
  }

  const chunks = compact.match(/[^.!?]+[.!?]?/gu);
  if (!chunks) {
    return [compact];
  }

  return chunks.map((chunk) => chunk.trim()).filter(Boolean);
}

function normalizeSentence(sentence) {
  return sentence
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[“”«»„‟]/g, '"')
    .replace(/[’‘`´]/g, "'")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isMeaningful(sentence) {
  if (!sentence) {
    return false;
  }
  const words = sentence.split(" ").filter(Boolean).length;
  return words >= MIN_WORDS && sentence.length >= MIN_CHARS;
}

function extractQuotedStringsWithLine(source) {
  const out = [];
  let line = 1;

  for (let i = 0; i < source.length; i += 1) {
    const ch = source[i];

    if (ch === "\n") {
      line += 1;
      continue;
    }

    if (ch !== '"' && ch !== "'") {
      continue;
    }

    const quote = ch;
    const startLine = line;
    let value = "";

    for (i += 1; i < source.length; i += 1) {
      const current = source[i];

      if (current === "\n") {
        line += 1;
      }

      if (current === "\\") {
        const next = source[i + 1];
        if (next !== undefined) {
          value += current + next;
          if (next === "\n") {
            line += 1;
          }
          i += 1;
        }
        continue;
      }

      if (current === quote) {
        break;
      }

      value += current;
    }

    out.push({ value, line: startLine });
  }

  return out;
}

function buildReferenceSet(referenceHtml) {
  const referenceMap = new Map();
  const text = htmlToText(referenceHtml);

  for (const sentence of splitIntoSentences(text)) {
    const normalized = normalizeSentence(sentence);
    if (!isMeaningful(normalized)) {
      continue;
    }

    if (!referenceMap.has(normalized)) {
      referenceMap.set(normalized, sentence.trim());
    }
  }

  return referenceMap;
}

function collectTargetSentences(filePath) {
  const source = readRequired(filePath);
  const records = [];

  for (const entry of extractQuotedStringsWithLine(source)) {
    for (const sentence of splitIntoSentences(entry.value)) {
      const normalized = normalizeSentence(sentence);
      if (!isMeaningful(normalized)) {
        continue;
      }

      records.push({
        file: path.relative(root, filePath),
        line: entry.line,
        sentence: sentence.trim(),
        normalized,
      });
    }
  }

  return records;
}

function main() {
  const referenceHtml = readRequired(referenceFile);
  const referenceMap = buildReferenceSet(referenceHtml);

  const overlaps = [];
  const seen = new Set();

  for (const filePath of targetFiles) {
    for (const record of collectTargetSentences(filePath)) {
      const referenceSentence = referenceMap.get(record.normalized);
      if (!referenceSentence) {
        continue;
      }

      const key = `${record.file}:${record.line}:${record.normalized}`;
      if (seen.has(key)) {
        continue;
      }
      seen.add(key);

      overlaps.push({
        ...record,
        referenceSentence,
      });
    }
  }

  if (overlaps.length > 0) {
    console.error(`Found ${overlaps.length} exact normalized sentence overlap(s):`);
    for (const overlap of overlaps) {
      console.error(`- ${overlap.file}:${overlap.line}`);
      console.error(`  target: "${overlap.sentence}"`);
      console.error(`  reference: "${overlap.referenceSentence}"`);
    }
    process.exit(1);
  }

  console.log("No exact normalized sentence overlaps found in scoped content files.");
}

try {
  main();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`check:copy-uniqueness failed: ${message}`);
  process.exit(1);
}
