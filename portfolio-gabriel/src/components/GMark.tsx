export const G_POINTS = '0,0 6,0 6,1 1,1 1,5 5,5 5,3.2 3,3.2 3,4 2,4 2,2.2 6,2.2 6,6 0,6'
export function GMark() {
  return <svg viewBox="0 0 6 6" aria-hidden="true" fill="currentColor"><polygon points={G_POINTS} /></svg>
}
