// Testi divisi in parole per le animazioni (fatto qui e non nel browser,
// così l'HTML del server e quello del client coincidono).

export function Words({ text }: { text: string }) {
  const words = text.trim().split(/\s+/);
  return (
    <>
      {words.map((w, i) => (
        <span key={i}>
          <span className="hx-word">{w}</span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </>
  );
}

export function Scrub({ text, as: Tag = 'h2', className, id }: { text: string; as?: 'h2' | 'p' | 'blockquote'; className?: string; id?: string }) {
  const words = text.trim().split(/\s+/);
  return (
    <Tag id={id} className={className} data-scrub aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true">
          <span className="w">{w}</span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}
