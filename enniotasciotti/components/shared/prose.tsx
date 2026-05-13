import { cn } from '@/lib/utils';

interface ProseProps {
  children: React.ReactNode;
  className?: string;
}

export function Prose({ children, className }: ProseProps) {
  return (
    <div
      className={cn(
        'prose max-w-prose',
        '[&_h2]:font-display [&_h2]:font-light [&_h2]:text-step-3 [&_h2]:mt-12 [&_h2]:mb-4',
        '[&_h3]:font-display [&_h3]:font-light [&_h3]:text-step-2 [&_h3]:mt-8 [&_h3]:mb-3',
        '[&_p]:text-step-0 [&_p]:leading-relaxed [&_p]:mb-6',
        '[&_a]:text-[var(--color-accent)] [&_a]:underline [&_a:hover]:no-underline',
        '[&_strong]:font-semibold',
        '[&_blockquote]:border-l-4 [&_blockquote]:border-[var(--color-accent)] [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-[var(--color-quote)]',
        className
      )}
      style={{ color: 'var(--color-text)' }}
    >
      {children}
    </div>
  );
}
