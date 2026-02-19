import clsx from 'clsx'
import { Link } from './link'

type TextProps = {
  serif?: boolean
  muted?: boolean
} & React.ComponentPropsWithoutRef<'p'>

export function Text({ className, serif, muted, ...props }: TextProps) {
  return (
    <p
      data-slot="text"
      {...props}
      className={clsx(
        className, 
        'text-base/6 sm:text-sm/6',
        muted ? 'text-[var(--text-muted)]' : 'text-[var(--text-secondary)]',
        serif && 'font-serif italic'
      )}
    />
  )
}

export function TextLink({ className, ...props }: React.ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      {...props}
      className={clsx(
        className,
        'text-[var(--text-primary)] underline decoration-[var(--text-primary)]/50 data-hover:decoration-[var(--text-primary)] transition-colors'
      )}
    />
  )
}

export function Strong({ className, ...props }: React.ComponentPropsWithoutRef<'strong'>) {
  return <strong {...props} className={clsx(className, 'font-semibold text-[var(--text-primary)]')} />
}

export function Code({ className, ...props }: React.ComponentPropsWithoutRef<'code'>) {
  return (
    <code
      {...props}
      className={clsx(
        className,
        'border border-[var(--border)] bg-[var(--bg-secondary)] px-1 py-0.5 text-sm font-medium text-[var(--text-primary)] sm:text-[0.8125rem]'
      )}
    />
  )
}
