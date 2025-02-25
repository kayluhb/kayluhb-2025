import { motion } from 'framer-motion';
import { MetaFunction } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Chevron } from '~/components/icons/Chevron';

export const meta: MetaFunction = () => {
  return [
    { title: 'Projects - kayluhb' },
    {
      name: 'description',
      content:
        'Explore a diverse portfolio of projects including work with National Geographic, World Trade Center, Tecovas, and other notable brands and institutions across technology, culture, and commerce.',
    },
  ];
};

interface Project {
  name: string;
  description?: string;
}

const projects = [
  {
    name: 'Tecovas',
    description: 'Direct-to-consumer western boots and leather goods company.',
  },
  {
    name: 'World Trade Center',
    description: "Direct collaboration on one of New York's most iconic landmarks.",
  },
  {
    name: 'National Geographic',
    description: 'Iconic media brand dedicated to exploration, science, and storytelling.',
  },
  {
    name: 'Homer',
    description: 'Luxury jewelry and accessories brand by Frank Ocean.',
  },
  {
    name: 'Blonded',
    description: "Frank Ocean's creative studio and merchandise platform.",
  },
  {
    name: 'Croissant',
    description: 'Buyback platform for online purchases.',
  },
  {
    name: 'Smithsonian Institution',
    description: 'Prestigious museum and research complex.',
  },
  {
    name: 'Lincoln Center Theater',
    description: 'Leading performing arts institution in New York City.',
  },
  {
    name: 'The Rockefeller Foundation',
    description: 'Globally recognized philanthropic organization.',
  },
  {
    name: 'Yale Law School',
    description: 'Top-tier law school digital presence.',
  },
  {
    name: 'Outdoor Voices',
    description: 'Popular activewear brand known for their #DoingThings movement.',
  },
  {
    name: 'Brooklyn Navy Yard',
    description: 'Large and historically significant development project.',
  },
  {
    name: 'Clinton Presidential Center',
    description: 'Presidential library of historical significance.',
  },
  {
    name: 'Silverstein Properties',
    description: 'Major real estate developer, particularly associated with the World Trade Center.',
  },
  {
    name: 'ESSX NYC',
    description: 'Contemporary fashion and lifestyle brand based in New York.',
  },
  {
    name: 'Carnegie Foundation',
    description: 'Influential philanthropic organisation.',
  },
  {
    name: 'Two Trees Management',
    description: 'Leading real estate development company.',
  },
  {
    name: 'New York City Economic Development Corporation',
    description: 'Key governmental organization overseeing NYC development projects.',
  },
];
const fullProjects: Project[] = [
  { name: '50 North 5th' },
  { name: '7 World Trade Center Events' },
  { name: 'AAAS / ScienceNetlinks' },
  { name: 'Apartments and Lofts' },
  { name: 'Aspire Public Schools' },
  { name: 'Backbone NYC' },
  { name: 'Beer Table' },
  { name: 'Billburg' },
  { name: 'BLDG 92 at Brooklyn Navy Yard' },
  { name: 'Blue Sky Studios' },
  { name: 'BRIC Arts | Media | Bklyn' },
  { name: 'Brooklyn Brewery' },
  { name: 'Brooklyn Brewery Mash' },
  { name: 'Brooklyn Brewery Mash 2014' },
  { name: 'Brooklyn Bridge Park' },
  { name: 'Cleveland Street District' },
  { name: 'Comics Kingdom' },
  { name: 'Coolgas' },
  { name: 'COOST - Homework Edutainment' },
  { name: "Downtown Brooklyn - It's The Moment" },
  { name: 'Downtown Brooklyn Partnership' },
  { name: 'Five Thirty Brew' },
  { name: 'Harvard Global Health Institute' },
  { name: 'Hospitality Quotient' },
  { name: 'How Good' },
  { name: 'Israel Film Center' },
  { name: 'Just Security' },
  { name: 'King Features' },
  { name: 'Mellon Foundation' },
  { name: 'Mosaic' },
  { name: 'Namely' },
  { name: 'Nat Geo Education' },
  { name: 'Nat Geo - Women of Vision' },
  { name: 'New Haven Modern' },
  { name: 'New York Blood Center' },
  { name: 'North End Grill NYC' },
  { name: 'NYAS : Blavatnik Awards for Young Scientists' },
  { name: 'NYC College Line' },
  { name: 'Opus 3 Artists' },
  { name: 'Peter Dick Architect' },
  { name: 'Pictela' },
  { name: 'Pixel Pong' },
  { name: 'Playwrights Horizons' },
  { name: 'Renée Rouleau' },
  { name: 'Rockrose' },
  { name: 'The Browns Make America Great Again' },
  { name: 'The Center for Constitutional Transitions at NYU School of Law' },
  { name: 'The National 9/11 Pentagon Memorial' },
  { name: 'The Opportunity Equation' },
  { name: 'The Rockefeller Foundation Annual Report' },
  { name: 'The Smithsonian Institution: Infinity of Nations' },
  { name: 'ThotWave' },
  { name: 'Union Square Cafe' },
  { name: 'US Open CourtConnect' },
  { name: 'Village Alliance' },
  { name: 'Vive' },
  { name: 'Wave Hill' },
];
export default function Projects() {
  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <nav className="absolute top-4 right-5 z-10 flex flex-col items-end gap-2 md:top-8 md:right-10">
          <NavLink
            className="group mb-12 inline-flex items-center text-sm font-bold text-gray-600 transition-colors hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-400"
            to="/"
          >
            <Chevron className="mr-2 transform transition-transform group-hover:-translate-x-1" />
            Back to Home
          </NavLink>
        </nav>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="mb-8 text-4xl font-bold text-gray-900 dark:text-white">My Work</h1>
          <p className="mb-12 text-xl text-gray-600 dark:text-gray-400">
            Here's a look at some of the cool projects I've worked on over the years.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              animate={{ opacity: 1 }}
              className="group relative overflow-hidden rounded-xl bg-white p-1 shadow-xs transition-all duration-300 hover:bg-linear-to-r hover:from-indigo-500 hover:to-purple-500 hover:shadow-lg dark:bg-gray-800 dark:shadow-gray-700/30"
              initial={{ opacity: 0 }}
              key={project.name}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative h-full rounded-lg bg-white p-6 transition-transform duration-300 group-hover:translate-y-[-2px] dark:bg-gray-950">
                <div className="mb-4 h-1.5 w-12 rounded-full bg-linear-to-r from-indigo-500 to-purple-500 opacity-75" />
                <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">{project.name}</h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-2xl">
        <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">All Projects</h2>
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
          {[...projects, ...fullProjects]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((project) => (
              <li
                key={project.name}
                className="rounded-lg p-3 text-sm text-gray-600 transition-colors duration-200 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/50"
              >
                {project.name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
