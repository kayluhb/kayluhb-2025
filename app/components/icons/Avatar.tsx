export function Avatar({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="avatarTitle avatarDesc"
    >
      <title id="avatarTitle">Developer Avatar</title>
      <desc id="avatarDesc">
        A modern cartoon avatar of a developer with styled brown hair and a friendly expression
      </desc>

      {/* Background Circle */}
      <circle
        cx="20"
        cy="20"
        r="19.5"
        className="stroke-gray-200 dark:stroke-gray-700"
        strokeWidth="1"
        fill="currentColor"
      />

      {/* Hair - More styled with a modern cut */}
      <path
        d="M13 14C13 10 16 7 20 7C24 7 27 10 27 14V18C27 18 24 17 20 17C16 17 13 18 13 18V14Z"
        fill="#8B4513"
        className="transition-colors"
      />

      {/* Face - Slightly larger and rounder */}
      <circle cx="20" cy="19" r="8" fill="#F5D0A9" className="transition-colors" />

      {/* Smile - Smoother curve */}
      <path
        d="M16.5 20C16.5 20 18 22.5 20 22.5C22 22.5 23.5 20 23.5 20"
        className="stroke-gray-700 dark:stroke-gray-200"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Eyes - Slightly larger and more expressive */}
      <circle cx="17.5" cy="18" r="1.25" className="fill-gray-700 dark:fill-gray-200" />
      <circle cx="22.5" cy="18" r="1.25" className="fill-gray-700 dark:fill-gray-200" />

      {/* Neck - Smoother transition */}
      <path d="M17 27C17 27 18.5 28 20 28C21.5 28 23 27 23 27V29H17V27Z" fill="#F5D0A9" className="transition-colors" />

      {/* Shirt collar - Modern cut */}
      <path d="M15 29H25L24 34H16L15 29Z" className="fill-blue-500 transition-colors dark:fill-blue-400" />
    </svg>
  );
}
