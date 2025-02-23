export const Chevron: React.FC<{ className: string }> = ({ className }) => (
  <svg
    aria-hidden
    className={'h-4 w-4' + className}
    fill="none"
    role="presentation"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M15 19l-7-7 7-7" />
  </svg>
);
