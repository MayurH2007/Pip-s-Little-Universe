/* Drawn fallbacks shown only when an official haX.baby PNG is unavailable.
   They depict Pip's world (observatory, window, music box, lantern), never Pip. */

// export function ObservatoryFallback() {
//   return (
//     <svg viewBox="0 0 400 400" className="art-fallback" role="img" aria-label="The Midnight Observatory floating on a cloud">
//       <circle cx="300" cy="80" r="34" fill="var(--gold)" opacity=".25" />
//       <path d="M318 52a32 32 0 1 0 0 56 26 26 0 0 1 0-56Z" fill="var(--gold)" />
//       {/* cloud island */}
//       <path
//         d="M70 300c-26 0-40-18-34-36 6-17 26-22 40-15 6-26 34-40 60-30 14-20 46-24 66-8 20-14 54-8 64 18 28-4 50 16 46 40-4 22-24 32-46 32Z"
//         fill="var(--cloud)"
//       />
//       <path d="M86 296c30 10 64 10 96 0m40 4c30 8 64 6 90-4" stroke="var(--lavender)" strokeWidth="4" strokeLinecap="round" fill="none" />
//       {/* tower */}
//       <rect x="152" y="176" width="96" height="92" rx="10" fill="var(--blush)" />
//       <rect x="152" y="176" width="96" height="92" rx="10" fill="none" stroke="var(--cocoa)" strokeOpacity=".25" strokeWidth="3" />
//       <path d="M186 268v-34a14 14 0 0 1 28 0v34Z" fill="var(--cocoa)" />
//       <circle cx="173" cy="204" r="9" fill="var(--gold)" />
//       <circle cx="227" cy="204" r="9" fill="var(--gold)" />
//       {/* dome */}
//       <path d="M140 180a60 60 0 0 1 120 0Z" fill="var(--berry)" />
//       <path d="M195 122h10v58h-10Z" fill="var(--midnight)" opacity=".75" />
//       <rect x="198" y="96" width="44" height="14" rx="7" transform="rotate(-28 198 110)" fill="var(--lavender)" />
//       <rect x="236" y="74" width="12" height="18" rx="4" transform="rotate(-28 236 92)" fill="var(--gold)" />
//       <path d="M140 180h120" stroke="var(--cocoa)" strokeOpacity=".3" strokeWidth="4" strokeLinecap="round" />
//       {/* lanterns on string */}
//       <path d="M70 150q60 30 82 26M248 170q50 0 84-30" stroke="var(--cream)" strokeOpacity=".6" strokeWidth="2" fill="none" />
//       <circle cx="100" cy="164" r="7" fill="var(--gold)" />
//       <circle cx="300" cy="156" r="7" fill="var(--blush)" />
//       <circle cx="128" cy="172" r="5" fill="var(--lavender)" />
//     </svg>
//   );
// }
import pipCloudImage from '../assets/pip_avatar_cloud.png';
export function ObservatoryFallback() {
  return (
    <img 
      src={pipCloudImage} 
      alt="Pip resting on a cloud" 
      className="art-fallback" 
style={{ 
        width: '100%', 
        maxWidth: '280px', 
        height: 'auto', 
        display: 'block', 
        margin: '0 auto', 
        objectFit: 'contain' 
      }}
    />  );
}

export function PortraitFallback() {
  return (
    <svg viewBox="0 0 300 360" className="art-fallback" role="img" aria-label="Pip's bedroom window at night">
      <path d="M30 340V140a120 120 0 0 1 240 0v200Z" fill="var(--midnight)" />
      <path d="M190 90a40 40 0 1 0 0 70 32 32 0 0 1 0-70Z" fill="var(--gold)" />
      {[
        [70, 120], [110, 80], [230, 200], [80, 230], [150, 160], [210, 120],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="var(--cloud)" />
      ))}
      <path d="M150 20v320M30 230h240" stroke="var(--cocoa)" strokeWidth="10" />
      <path d="M30 340V140a120 120 0 0 1 240 0v200Z" fill="none" stroke="var(--cocoa)" strokeWidth="14" />
      <rect x="18" y="330" width="264" height="22" rx="8" fill="var(--cocoa)" />
      <path d="M200 296a24 24 0 1 1 48 0v34h-48Z" fill="var(--blush)" />
      <circle cx="224" cy="300" r="9" fill="var(--gold)" />
    </svg>
  );
}

export function MusicBoxFallback() {
  return (
    <svg viewBox="0 0 300 240" className="art-fallback" role="img" aria-label="A little wooden music box with a dancing star">
      <ellipse cx="150" cy="222" rx="118" ry="12" fill="var(--cocoa)" opacity=".15" />
      <path d="M48 120h204v86a10 10 0 0 1-10 10H58a10 10 0 0 1-10-10Z" fill="var(--berry)" />
      <path d="M48 150h204" stroke="var(--gold)" strokeWidth="5" />
      <path d="M58 112l-6-70a8 8 0 0 1 8-9h180a8 8 0 0 1 8 9l-6 70Z" fill="var(--blush)" />
      <path d="M78 52h144l-5 52H83Z" fill="var(--midnight)" />
      {[ [100, 70], [130, 88], [190, 66], [206, 90] ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2.5" fill="var(--cloud)" />
      ))}
      <path d="M155 64a14 14 0 1 0 0 26 11 11 0 0 1 0-26Z" fill="var(--gold)" />
      <rect x="44" y="112" width="212" height="12" rx="6" fill="var(--cocoa)" />
      <path d="M146 112v-14h8v14Z" fill="var(--gold)" />
      <path d="M150 74l4 9 10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1Z" fill="var(--gold)" transform="translate(0 -6)" />
      <circle cx="150" cy="182" r="14" fill="var(--gold)" />
      <path d="M150 174v16M142 182h16" stroke="var(--berry)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function LanternFallback() {
  return (
    <svg viewBox="0 0 120 170" className="art-fallback" role="img" aria-label="A glowing dream lantern">
      <circle cx="60" cy="96" r="52" fill="var(--gold)" opacity=".22" />
      <path d="M60 6v18" stroke="var(--cocoa)" strokeWidth="4" strokeLinecap="round" />
      <path d="M44 24h32l6 14H38Z" fill="var(--berry)" />
      <rect x="34" y="38" width="52" height="92" rx="16" fill="var(--gold)" />
      <rect x="34" y="38" width="52" height="92" rx="16" fill="none" stroke="var(--cocoa)" strokeWidth="4" />
      <path d="M60 38v92M34 84h52" stroke="var(--cocoa)" strokeOpacity=".45" strokeWidth="3" />
      <path d="M60 70c8 10 8 20 0 26-8-6-8-16 0-26Z" fill="var(--cream)" />
      <path d="M40 130h40l-6 14H46Z" fill="var(--berry)" />
    </svg>
  );
}

/** A sleeping village skyline. Windows glow via --window. */
export function Village({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 220" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden="true">
      <path d="M0 150c140-50 260-40 400-10s260 20 400-20 300-30 400 10v100H0Z" fill="var(--hill-back)" />
      <g fill="var(--house)">
        <path d="M90 160v-48l34-28 34 28v48Z" />
        <path d="M210 168v-60h56v60Z" />
        <path d="M206 112l32-30 32 30Z" />
        <path d="M420 164v-70l26-30 26 30v70Z" />
        <path d="M640 160v-40h70v40Z" />
        <path d="M634 124l41-34 41 34Z" />
        <path d="M880 166v-56l38-30 38 30v56Z" />
        <path d="M1010 170v-44h48v44Z" />
        <path d="M1005 130l29-26 29 26Z" />
      </g>
      <g fill="var(--window)">
        <rect x="114" y="122" width="12" height="14" rx="2" />
        <rect x="230" y="124" width="14" height="14" rx="2" />
        <rect x="440" y="104" width="10" height="16" rx="5" />
        <rect x="664" y="132" width="12" height="12" rx="2" />
        <rect x="908" y="122" width="12" height="14" rx="2" />
        <rect x="1028" y="140" width="10" height="12" rx="2" />
      </g>
      <path d="M0 190c180-30 380-26 600-6s420 10 600-14v50H0Z" fill="var(--hill-front)" />
    </svg>
  );
}
