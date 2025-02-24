import { MetaFunction } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Chevron } from '~/components/icons/Chevron';

export const meta: MetaFunction = () => {
  return [{ title: 'About - kayluhb' }, { name: 'description', content: 'Learn more about me and what I do' }];
};

export default function About() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <nav className="absolute top-8 right-10 z-10 flex flex-col items-end gap-2">
        <NavLink
          className="group mb-12 inline-flex items-center text-sm text-gray-600 transition-colors hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-400"
          to="/"
        >
          <Chevron className="mr-2 transform transition-transform group-hover:-translate-x-1" />
          Back to Home
        </NavLink>
      </nav>
      <div className="space-y-8">
        <header className="border-b border-gray-200 pb-8 dark:border-gray-700">
          <h1 className="mb-4 text-5xl font-bold tracking-tight">Hello</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            My name is Caleb and I am a Full-stack Engineer in Austin, TX.
          </p>
        </header>

        <div className="prose prose-lg dark:prose-invert">
          <p className="lead">
            Experienced and versatile Senior Full Stack Engineer with a proven track record of delivering high-quality
            software solutions. Armed with a comprehensive skill set that spans both front-end and back-end
            technologies, I am adept at designing, developing, and deploying robust applications that meet the needs of
            diverse projects. With a keen eye for detail and a commitment to staying abreast of industry trends, I bring
            innovation and efficiency to every stage of the development lifecycle.
          </p>

          <h2 className="mt-12 mb-6 text-3xl font-semibold">Technology Experience</h2>
          <p>
            With over a decade of experience in web development, I've worked extensively with various modern
            technologies:
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
              <h3 className="mb-4 text-xl font-semibold">Frontend</h3>
              <ul className="space-y-2">
                <li>React & TypeScript</li>
                <li>Next.js & Remix</li>
                <li>TailwindCSS</li>
                <li>Shopify Hydrogen</li>
                <li>React Native</li>
              </ul>
            </div>

            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
              <h3 className="mb-4 text-xl font-semibold">Backend</h3>
              <ul className="space-y-2">
                <li>Node.js</li>
                <li>Python & Django</li>
                <li>PostgreSQL</li>
                <li>Redis</li>
                <li>Celery</li>
                <li>Gunicorn</li>
                <li>Shopify Liquid</li>
              </ul>
            </div>

            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
              <h3 className="mb-4 text-xl font-semibold">DevOps</h3>
              <ul className="space-y-2">
                <li>GCP & AWS</li>
                <li>Docker</li>
                <li>Kubernetes</li>
                <li>Nginx</li>
                <li>CI/CD pipelines</li>
              </ul>
            </div>

            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
              <h3 className="mb-4 text-xl font-semibold">Testing</h3>
              <ul className="space-y-2">
                <li>Jest</li>
                <li>React Testing Library</li>
                <li>pytest</li>
              </ul>
            </div>
          </div>

          <p className="mt-12">
            I'm passionate about creating performant, accessible, and maintainable web applications while staying
            current with the latest industry trends and best practices.
          </p>
        </div>
      </div>
    </div>
  );
}
