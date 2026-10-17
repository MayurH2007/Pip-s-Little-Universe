import type { CSSProperties } from "react";

/** Moon-and-star logo mark. */
export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" className="logo-mark">
      <circle cx="20" cy="20" r="19" fill="var(--midnight)" />
      <path d="M24.5 9.5a11 11 0 1 0 6 18.6A9 9 0 0 1 24.5 9.5Z" fill="var(--gold)" />
      <path
        d="m29 8 1.1 2.4 2.4 1.1-2.4 1.1L29 15l-1.1-2.4-2.4-1.1 2.4-1.1Z"
        fill="var(--blush)"
      />
      <circle cx="11" cy="12" r="1" fill="var(--cloud)" />
      <circle cx="32" cy="22" r="0.8" fill="var(--cloud)" />
    </svg>
  );
}

/** A soft four-point twinkle star. */
export function Twinkle({ className, style, color = "var(--gold)" }: { className?: string; style?: CSSProperties; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true">
      <path d="M12 1c.6 5.2 2.4 7.6 11 11-8.6 3.4-10.4 5.8-11 11-.6-5.2-2.4-7.6-11-11 8.6-3.4 10.4-5.8 11-11Z" fill={color} />
    </svg>
  );
}

/** A five-point storybook star with rounded joins. */
export function StoryStar({ className, style, color = "var(--gold)" }: { className?: string; style?: CSSProperties; color?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} style={style} aria-hidden="true">
      <path
        d="M24 4.5l5.6 12.1 13.2 1.5-9.8 9 2.7 13-11.7-6.6-11.7 6.6 2.7-13-9.8-9 13.2-1.5Z"
        fill={color}
        stroke="var(--cocoa)"
        strokeOpacity=".25"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A puffy hand-drawn style cloud. */
export function Puff({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 160 70" className={className} style={style} aria-hidden="true">
      <path
        d="M24 62c-12 0-19-8-17-18 2-9 11-13 19-11 2-13 14-22 28-19 7-9 22-12 33-5 9-6 25-3 30 9 14-1 25 9 23 22-1 13-12 22-26 22Z"
        fill="var(--puff-fill)"
      />
      <path d="M30 50c10 4 22 4 32 0M86 52c9 3 18 3 26-1" stroke="var(--puff-line)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/** Hand-drawn squiggle used as an underline/divider. */
export function Squiggle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 14" className={className} aria-hidden="true" preserveAspectRatio="none">
      <path
        d="M2 8c12-8 22 6 34 0s22-8 34 0 22 6 34 0 22-8 34 0 22 6 34 0 16-4 26-2"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
