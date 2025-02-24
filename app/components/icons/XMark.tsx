import type { SVGProps } from 'react';

interface XMarkProps extends SVGProps<SVGSVGElement> {
  title?: string;
}

export function XMark({ title = 'Close', ...props }: XMarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden="false"
      role="img"
      aria-labelledby="xmark-title"
      {...props}
    >
      <title id="xmark-title">{title}</title>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
