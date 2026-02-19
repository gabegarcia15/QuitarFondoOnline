import clsx from 'clsx'

type HeadingProps = { 
  level?: 1 | 2 | 3 | 4 | 5 | 6
  serif?: boolean
} & React.ComponentPropsWithoutRef<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>

export function Heading({ className, level = 1, serif, ...props }: HeadingProps) {
  const Element: `h${typeof level}` = `h${level}`

  return (
    <Element
      {...props}
      className={clsx(
        className, 
        'font-display tracking-tight text-[var(--text-primary)]',
        level === 1 && 'text-4xl font-black sm:text-3xl',
        level === 2 && 'text-3xl font-bold sm:text-2xl',
        level === 3 && 'text-2xl font-bold sm:text-xl',
        level >= 4 && 'text-xl font-semibold',
        serif && 'font-serif italic font-normal'
      )}
    />
  )
}

export function Subheading({ className, level = 2, serif, ...props }: HeadingProps) {
  const Element: `h${typeof level}` = `h${level}`

  return (
    <Element
      {...props}
      className={clsx(
        className, 
        'font-display text-[var(--text-primary)]',
        'text-base font-semibold sm:text-sm',
        serif && 'font-serif italic font-normal'
      )}
    />
  )
}
