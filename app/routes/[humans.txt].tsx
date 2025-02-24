import { LoaderFunction } from 'react-router';

export const loader: LoaderFunction = () => {
  const content = `/* TEAM */
    Web Developer: Caleb Brown
    GitHub: @kayluhb

/* SITE */
    Last update: 2024/02/24
    Language: English
    Standards: HTML5, CSS3, JavaScript
    Components: React, React Router 7
    Software: Visual Studio Code, Git`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain',
    },
    status: 200,
  });
};
