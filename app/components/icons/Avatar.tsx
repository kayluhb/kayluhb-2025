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
      <desc id="avatarDesc">A cartoon avatar of a developer with brown hair and a friendly smile</desc>

      <circle cx="20" cy="20" r="19.5" className="stroke-gray-700 dark:stroke-gray-300" fill="none" />
      {/* Hair */}
      <path d="M14 12C14 12 16 8 20 8C24 8 26 12 26 12V16C26 16 24 15 20 15C16 15 14 16 14 16V12Z" fill="#654321" />
      {/* Face */}
      <circle cx="20" cy="18" r="7" fill="#DEB887" />
      {/* Smile */}
      <path
        d="M17 19C17 19 18 21 20 21C22 21 23 19 23 19"
        className="stroke-gray-800 dark:stroke-gray-200"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Eyes */}
      <circle cx="18" cy="17" r="1" className="fill-gray-800 dark:fill-gray-200" />
      <circle cx="22" cy="17" r="1" className="fill-gray-800 dark:fill-gray-200" />
      {/* Neck */}
      <path d="M18 25H22V28H18V25Z" fill="#DEB887" />
      {/* Shirt collar */}
      <path d="M16 28H24V32H16V28Z" className="fill-gray-700 dark:fill-gray-300" />
    </svg>
  );
}
