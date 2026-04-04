export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
        <ellipse cx="9" cy="7" rx="8.5" ry="3.5" stroke="#1E2027" strokeWidth="1.1" fill="none" transform="rotate(-18 9 7)" />
        <circle cx="9" cy="7" r="2.2" fill="#1E2027" />
      </svg>
      <span className="text-[13px] font-semibold tracking-[0.22em] text-[#1E2027]">ORBITTO</span>
    </div>
  )
}
