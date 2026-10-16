import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H6v4h3v9h4v-9h3.2L17 11h-4V9c0-.6.4-1 1-1z" />
    </svg>
  );
}

export function IconDribbble() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm6.3 5.3a8 8 0 01-2.7.6 19 19 0 00-1.8-3.4 8 8 0 014.5 2.8zM12 4a8 8 0 012.3.3 17 17 0 011.6 3.1A19 19 0 0012 8.2 19 19 0 008.6 7.4 8 8 0 0112 4zM4.7 9.4A8 8 0 0111 4.1 17 17 0 0114.7 8 21 21 0 007 9.8a16 16 0 01-2.3-.4zM4 12a8 8 0 00.3 2.1A16 16 0 0112 12.2a21 21 0 016.2-1 8 8 0 01.5 2.8 19 19 0 00-7.5 1.6A21 21 0 015.6 20 8 8 0 014 12zm8 8a8 8 0 01-5.3-2 19 19 0 014.6-4.3A17 17 0 0116 18.8 8 8 0 0112 20zm5.7-2.6a19 19 0 00-4.8-5 19 19 0 006.3-.8 8 8 0 01-1.5 5.8z" />
    </svg>
  );
}

export function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm10 2H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2zm-5 3.2A3.8 3.8 0 1112 16.8 3.8 3.8 0 0112 8.2zm0 2a1.8 1.8 0 100 3.6 1.8 1.8 0 000-3.6zM17.2 6.6a.9.9 0 11-1.8 0 .9.9 0 011.8 0z" />
    </svg>
  );
}

export function IconLinkedin() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M6.5 9H3.7v11h2.8V9zM5.1 4.2A1.7 1.7 0 103.4 5.9a1.7 1.7 0 001.7-1.7zM20.3 9h-2.7v1.5h.1c.4-.8 1.4-1.7 2.9-1.7 3.1 0 3.7 2 3.7 4.7V20h-2.8v-5.7c0-1.4 0-3.1-1.9-3.1s-2.2 1.5-2.2 3v5.8H12.6V9h2.7v1.5h.1c.5-.9 1.7-1.8 3.5-1.8 1.2 0 1.4.2 1.4.2z" />
    </svg>
  );
}

export function IconArrowRight() {
  return <ArrowForwardIosIcon sx={{ fontSize: 14 }} aria-hidden="true" />;
}

export function IconArrowLeft() {
  return <ArrowBackIosIcon sx={{ fontSize: 14 }} aria-hidden="true" />;
}

export function IconEye({ off = false }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      {off ? (
        <>
          <path strokeLinecap="round" d="M3 3l18 18" />
          <path strokeLinecap="round" d="M10.6 10.6a2 2 0 002.8 2.8" />
          <path strokeLinecap="round" d="M9.9 5.2A10.4 10.4 0 0112 5c6.5 0 10 7 10 7a18.2 18.2 0 01-3.8 4.6" />
          <path strokeLinecap="round" d="M6.1 6.1A18 18 0 002 12s3.5 7 10 7a10.6 10.6 0 004-.8" />
        </>
      ) : (
        <>
          <path strokeLinecap="round" d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
          <circle cx="12" cy="12" r="3" />
        </>
      )}
    </svg>
  );
}

export function IconDownload() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M12 3v10.2l3.6-3.6L17 11l-5 5-5-5 1.4-1.4L11 13.2V3h1zM4 19h16v2H4v-2z" />
    </svg>
  );
}

export function IconLocation() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <path d="M12 2a7 7 0 00-7 7c0 5.3 7 13 7 13s7-7.7 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />
    </svg>
  );
}

export function IconEmail() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <path d="M4 5h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2zm8 7L4.5 7h15L12 12z" />
    </svg>
  );
}

export function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <path d="M6.6 3.2l2.4 2.4a1.5 1.5 0 01.3 1.6L8.4 9.6a12.5 12.5 0 006 6l2.4-.9a1.5 1.5 0 011.6.3l2.4 2.4a1.5 1.5 0 01-.1 2.2l-1.8 1.8c-.8.8-2 1.1-3.1.6A18.8 18.8 0 013.2 8.2c-.5-1.1-.2-2.3.6-3.1L5.6 3.3a1.5 1.5 0 011-.1z" />
    </svg>
  );
}

export function IconChevronUp() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <path d="M7.4 15.4 12 10.8l4.6 4.6L18 14l-6-6-6 6 1.4 1.4z" />
    </svg>
  );
}

const processIcons = {
  research: (
    <svg viewBox="0 0 32 32" className="h-8 w-8 fill-picto-primary">
      <path d="M21.3 18.7H10.7a1.3 1.3 0 000 2.6h10.6a1.3 1.3 0 000-2.6zm0-5.4h-8a1.3 1.3 0 000 2.7h8a1.3 1.3 0 000-2.7zM26.7 5.3h-4V4a1.3 1.3 0 10-2.7 0v1.3h-2.6V4a1.3 1.3 0 10-2.7 0v1.3H12V4a1.3 1.3 0 10-2.7 0v1.3H5.3A1.3 1.3 0 004 6.7v18.6A4 4 0 008 29.3h16a4 4 0 004-4V6.7a1.3 1.3 0 00-1.3-1.4zM25.3 25.3a1.3 1.3 0 01-1.3 1.4H8a1.3 1.3 0 01-1.3-1.4V8h2.6v1.3a1.3 1.3 0 102.7 0V8h2.6v1.3a1.3 1.3 0 102.7 0V8H20v1.3a1.3 1.3 0 102.7 0V8h2.6z" />
    </svg>
  ),
  analyze: (
    <svg viewBox="0 0 32 32" className="h-8 w-8 fill-picto-primary">
      <path d="M9.3 21.3a2 2 0 001.4-3.4l3.8-3.8h.6l2.1 2.2v.1a2 2 0 103.2-1.6l4.8-4.9a3.3 3.3 0 10-1.9-1.8l-4.8 4.8h-.2l-2.3-2.3a2 2 0 10-2.5 0L9.3 17.3a2 2 0 000 4zm18 5.4H4.7V4a1.3 1.3 0 10-2.7 0v24A1.3 1.3 0 003.3 29.3h24a1.3 1.3 0 000-2.6z" />
    </svg>
  ),
  design: (
    <svg viewBox="0 0 32 32" className="h-8 w-8 fill-picto-primary">
      <path d="M29.3 9.7a2 2 0 00-.4-1L23.3 3a2 2 0 00-2.8 0l-3.8 3.8L3 21.4a2 2 0 00-.4 1.9V28a1.3 1.3 0 001.4 1.3h5.6a2 2 0 001-0.4L25.2 14.4 29 10.7a2 2 0 00.3-.9zM9.1 26.7H5.3v-3.8L18.6 9.7l3.7 3.7zM24.2 11.5l-3.8-3.7 1.9-1.9 3.8 3.8z" />
    </svg>
  ),
  launch: (
    <svg viewBox="0 0 32 32" className="h-8 w-8 fill-picto-primary">
      <path d="M28 18.7h-1.3V9.3a4 4 0 00-4-4H9.3a4 4 0 00-4 4v9.4H4A1.3 1.3 0 002.7 20v2.7a4 4 0 004 4h18.6a4 4 0 004-4V20A1.3 1.3 0 0028 18.7zM8 9.3a1.3 1.3 0 011.3-1.3h13.4A1.3 1.3 0 0124 9.3v9.4H8zm18.7 13.4a1.3 1.3 0 01-1.4 1.3H6.7a1.3 1.3 0 01-1.4-1.3v-1.4h21.4z" />
    </svg>
  ),
  ux: (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-picto-primary">
      <path d="M12 2a5 5 0 015 5v1h1a3 3 0 013 3v7a3 3 0 01-3 3H6a3 3 0 01-3-3v-7a3 3 0 013-3h1V7a5 5 0 015-5zm3 6V7a3 3 0 10-6 0v1z" />
    </svg>
  ),
  ui: (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-picto-primary">
      <path d="M4 4h16a2 2 0 012 2v4H2V6a2 2 0 012-2zm-2 8h9v8H4a2 2 0 01-2-2zm11 0h9v6a2 2 0 01-2 2h-7z" />
    </svg>
  ),
  web: (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-picto-primary">
      <path d="M3 5h18v12H3zm2 2v8h14V7zm4 13h6v1H9z" />
    </svg>
  ),
};

export function ProcessIcon({ name }) {
  return processIcons[name] || processIcons.research;
}

export function ContactIcon({ name }) {
  if (name === "email") return <IconEmail />;
  if (name === "phone") return <IconPhone />;
  return <IconLocation />;
}

const socialMap = {
  Facebook: IconFacebook,
  Dribbble: IconDribbble,
  Instagram: IconInstagram,
  LinkedIn: IconLinkedin,
};

export function SocialIcon({ label }) {
  const Cmp = socialMap[label] || IconFacebook;
  return <Cmp />;
}
