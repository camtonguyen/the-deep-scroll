/**
 * A tiny deterministic random generator (Park–Miller). Generated art such as
 * marine snow must render the same bytes every time, so never use Math.random().
 */
export function seededRandom(seed = 7): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}
