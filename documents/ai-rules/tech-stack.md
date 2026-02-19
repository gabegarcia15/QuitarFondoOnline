# Tech Stack Preferences

This document outlines the standard technology choices for web application projects.

## Core Stack

| Layer | Technology | Version |
|-------|------------|---------|
| **Framework** | Next.js (App Router) | 15.x |
| **Backend/Database** | Convex | Latest |
| **Authentication** | Clerk | Latest |
| **Styling** | Tailwind CSS | v4.1+ |
| **Language** | TypeScript | 5.x |

## Why This Stack?

### Next.js 16 (App Router)
- Server Components for optimal performance
- Built-in SEO with metadata API
- File-based routing with dynamic segments
- Server Actions for forms
- Excellent Vercel deployment integration

### Convex
- Real-time database with automatic subscriptions
- Type-safe queries and mutations
- Built-in file storage
- Serverless functions (no cold starts)
- Automatic caching and optimistic updates

### Clerk
- Drop-in authentication UI components
- Social logins (Google, GitHub, etc.)
- User management dashboard
- Webhooks for user sync
- Role-based access control
- Easy Next.js integration with middleware

### Tailwind CSS v4
- Utility-first CSS
- CSS-native configuration (no JS config file - use `@theme` in CSS)
- **REQUIRES `@tailwindcss/postcss` plugin** - styles won't work without it
- Container queries
- New opacity modifier syntax (`bg-black/50`)
- Use `bg-linear-*` not `bg-gradient-*`
- Use `min-h-dvh` not `min-h-screen`

## Project Setup Commands

```bash
# Create Next.js project
npx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir

# Add Convex
npm install convex
npx convex dev

# Add Clerk
npm install @clerk/nextjs

# IMPORTANT: Tailwind v4 requires PostCSS plugin
npm install @tailwindcss/postcss
```

### Required postcss.config.mjs for Tailwind v4

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

## Standard Project Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── [dynamic]/
├── components/
│   ├── ui/           # Reusable UI components
│   └── [feature]/    # Feature-specific components
├── lib/
│   └── utils.ts
└── middleware.ts     # Clerk auth middleware

convex/
├── _generated/
├── schema.ts
├── [feature].ts
└── http.ts           # Webhooks
```

## Environment Variables

```env
# Convex
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=

# Clerk Routes
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

## Clerk + Convex Integration Pattern

1. User signs up/in via Clerk
2. Clerk webhook fires to `/api/webhooks/clerk`
3. Webhook syncs user to Convex `users` table
4. Frontend uses `useUser()` from Clerk + queries Convex for app data

## Payments (When Needed)

- **Provider**: Stripe
- **Pattern**: Stripe Checkout + Webhooks to Convex
