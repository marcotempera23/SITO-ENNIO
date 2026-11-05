// Marchio dello Human Longevity Program (il ciclo in quattro nodi attorno al nucleo),
// usato solo nei collegamenti verso il sito del programma.
export function HlpMark() {
  return (
    <svg className="hlp-mark" viewBox="0 0 48 48" aria-hidden="true">
      <circle className="r" cx="24" cy="24" r="17" />
      <circle className="n" cx="24" cy="7" r="3" />
      <circle className="n" cx="41" cy="24" r="3" />
      <circle className="n" cx="24" cy="41" r="3" />
      <circle className="n" cx="7" cy="24" r="3" />
      <circle className="c" cx="24" cy="24" r="5.5" />
    </svg>
  );
}
