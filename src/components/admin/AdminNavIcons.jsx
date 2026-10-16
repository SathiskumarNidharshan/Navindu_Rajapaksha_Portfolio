const iconClass = "h-4 w-4";

function Svg({ children, className = iconClass }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      {children}
    </svg>
  );
}

const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const adminNavIcons = {
  overview: (
    <Svg>
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" {...stroke} />
    </Svg>
  ),
  site: (
    <Svg>
      <circle cx="12" cy="12" r="8" {...stroke} />
      <path d="M4 12h16M12 4c2.5 2.7 2.5 13.3 0 16M12 4c-2.5 2.7-2.5 13.3 0 16" {...stroke} />
    </Svg>
  ),
  hero: (
    <Svg>
      <path d="M12 3l1.8 5.5H19l-4.4 3.2 1.7 5.3L12 13.8 7.7 17l1.7-5.3L5 8.5h5.2L12 3Z" {...stroke} />
    </Svg>
  ),
  about: (
    <Svg>
      <circle cx="12" cy="8" r="3.5" {...stroke} />
      <path d="M5 20c1.8-3.5 4.2-5 7-5s5.2 1.5 7 5" {...stroke} />
    </Svg>
  ),
  process: (
    <Svg>
      <path d="M8 6h12M8 12h12M8 18h12" {...stroke} />
      <circle cx="4.5" cy="6" r="1.2" fill="currentColor" />
      <circle cx="4.5" cy="12" r="1.2" fill="currentColor" />
      <circle cx="4.5" cy="18" r="1.2" fill="currentColor" />
    </Svg>
  ),
  portfolio: (
    <Svg>
      <rect x="3.5" y="7" width="17" height="13" rx="2" {...stroke} />
      <path d="M8 7V5.8A1.8 1.8 0 0 1 9.8 4h4.4A1.8 1.8 0 0 1 16 5.8V7" {...stroke} />
      <path d="M3.5 12h17" {...stroke} />
    </Svg>
  ),
  cta: (
    <Svg>
      <path d="M5 12h12" {...stroke} />
      <path d="M13 7l5 5-5 5" {...stroke} />
      <path d="M5 7v10" {...stroke} />
    </Svg>
  ),
  services: (
    <Svg>
      <path d="M14.7 6.3a3 3 0 0 0-4.2 0L6 10.8l.7 3.5L10.2 15l4.5-4.5a3 3 0 0 0 0-4.2Z" {...stroke} />
      <path d="M11.5 8.5l4 4" {...stroke} />
      <path d="M5 19h6" {...stroke} />
    </Svg>
  ),
  clients: (
    <Svg>
      <circle cx="9" cy="8" r="2.8" {...stroke} />
      <circle cx="16" cy="9" r="2.2" {...stroke} />
      <path d="M3.5 19c.8-3 2.8-4.5 5.5-4.5 1.4 0 2.5.4 3.5 1.1" {...stroke} />
      <path d="M12.5 19c.5-2 1.8-3.2 3.7-3.2 1.7 0 3 .8 3.8 2.2" {...stroke} />
    </Svg>
  ),
  testimonials: (
    <Svg>
      <path d="M8 17H5.8A1.8 1.8 0 0 1 4 15.2V10a4 4 0 0 1 4-4h1v5H6.5v2.5H8V17Z" {...stroke} />
      <path d="M19 17h-2.2A1.8 1.8 0 0 1 15 15.2V10a4 4 0 0 1 4-4h1v5h-2.5v2.5H19V17Z" {...stroke} />
    </Svg>
  ),
  contact: (
    <Svg>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" {...stroke} />
      <path d="m4.5 8 7.5 5.5L19.5 8" {...stroke} />
    </Svg>
  ),
  messages: (
    <Svg>
      <path d="M5 6.5h14a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5H9l-3.5 2.5V17H5A1.5 1.5 0 0 1 3.5 15.5V8A1.5 1.5 0 0 1 5 6.5Z" {...stroke} />
      <path d="M8 10.5h8M8 13.5h5" {...stroke} />
    </Svg>
  ),
  settings: (
    <Svg>
      <circle cx="12" cy="12" r="3" {...stroke} />
      <path
        d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V20a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H4a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H10a1.7 1.7 0 0 0 1-1.5V4a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V10c.2.7.8 1.2 1.5 1.2H20a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"
        {...stroke}
      />
    </Svg>
  ),
};

export function AdminNavIcon({ id }) {
  return adminNavIcons[id] || adminNavIcons.overview;
}
