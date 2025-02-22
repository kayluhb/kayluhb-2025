import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type LinksFunction,
} from 'react-router'

import styles from './tailwind.css?url'

export const links: LinksFunction = () => [
  { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
  { rel: 'stylesheet', href: styles },
  { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          content="#07c9fe"
          media="(prefers-color-scheme: light)"
          name="theme-color"
        />
        <meta
          content="#6A5ACD"
          media="(prefers-color-scheme: dark)"
          name="theme-color"
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
