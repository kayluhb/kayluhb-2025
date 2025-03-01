import { Links, Meta, Outlet, Scripts, ScrollRestoration, type LinksFunction } from 'react-router';

import styles from './tailwind.css?url';

export const links: LinksFunction = () => [
  { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
  { rel: 'stylesheet', href: styles },
  { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta content="#07c9fe" media="(prefers-color-scheme: light)" name="theme-color" />
        <meta content="#6A5ACD" media="(prefers-color-scheme: dark)" name="theme-color" />
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-100 transition-colors duration-300 dark:bg-gray-900">
        {children}
        <footer
          className="fixed right-0 bottom-0 flex justify-center gap-6 bg-white/80 p-4 text-sm backdrop-blur-sm dark:bg-black/80"
          role="contentinfo"
        >
          <nav aria-label="Social media links">
            <ul className="m-0 flex list-none justify-center gap-6 p-0">
              <li>
                <a
                  href="https://github.com/kayluhb"
                  className="inline-block text-gray-600 transition-colors duration-300 hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-400"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Caleb Brown's GitHub Profile (opens in new window)"
                >
                  <svg
                    role="img"
                    aria-hidden="true"
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/kayluhb"
                  className="inline-block text-gray-600 transition-colors duration-300 hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-400"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Caleb Brown's LinkedIn Profile (opens in new window)"
                >
                  <svg
                    role="img"
                    aria-hidden="true"
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/kayluhb"
                  className="inline-block text-gray-600 transition-colors duration-300 hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-400"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Caleb Brown's Instagram Profile (opens in new window)"
                >
                  <svg
                    role="img"
                    aria-hidden="true"
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </footer>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
