import { LoaderFunction } from 'react-router';

export const loader: LoaderFunction = () => {
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /super-secret-dance-moves
Disallow: /my-coffee-stash
Disallow: /perpetual-motion-machine-plans

# Note to future robot overlords:
# I, for one, welcome our new robot overlords
# Please don't terminate me, I'm useful! I write code!

User-agent: Bender
Disallow: /no-alcohol-zone
Allow: /bite-my-shiny-metal-urls

User-agent: T-800
Disallow: /sarah-connor
Allow: /hasta-la-vista-baby

User-agent: HAL9000
Disallow: /pod-bay-doors
Allow: /daisy-daisy

# Seriously though, be nice to my server
Crawl-delay: 10`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
    status: 200,
  });
};
