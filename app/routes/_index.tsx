import type { MetaFunction } from 'react-router'

export const meta: MetaFunction = () => {
  return [
    { title: 'Caleb Brown Software Engineer Austin, TX - kayluhb.com' },
    {
      name: 'description',
      content:
        'Caleb is an experienced full-stack engineer based in Austin, TX, specializing in web development, systems administration, and technology consulting. With a strong background in leading engineering teams and collaborating with UX designers, designers, and project managers, Caleb ensures seamless website and application development. He offers contracting services for full-stack development and consulting for new business pitches, team growth, and technical assessments. Always eager to explore new technologies and programming languages, Caleb brings expertise and innovation to every project.',
    },
  ]
}

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <h1>kayluhb</h1>
    </div>
  )
}
