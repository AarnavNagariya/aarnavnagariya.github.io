const skills = [
  {
    title: 'Javascript',
    competency: 4,
    category: ['Web Development', 'Languages', 'Javascript'],
  },
  {
    title: 'Node.JS',
    competency: 5,
    category: ['Web Development', 'Javascript'],
  },
  {
    title: 'React',
    competency: 2,
    category: ['Web Development', 'Javascript'],
  },
  {
    title: 'Next.JS',
    competency: 2,
    category: ['Web Development', 'Javascript'],
  },
  {
    title: 'Bash',
    competency: 2,
    category: ['Tools', 'Languages'],
  },
  {
    title: 'Amazon Web Services',
    competency: 2,
    category: ['Web Development', 'Tools'],
  },
  {
    title: 'MongoDB',
    competency: 3,
    category: ['Web Development', 'Databases'],
  },
  {
    title: 'PostgreSQL',
    competency: 2,
    category: ['Web Development', 'Databases', 'Languages'],
  },
  {
    title: 'Express.JS',
    competency: 2,
    category: ['Web Development', 'Javascript'],
  },
  {
    title: 'Flask',
    competency: 2,
    category: ['Web Development', 'Python'],
  },
  {
    title: 'Github',
    competency: 5,
    category: ['Tools'],
  },
  {
    title: 'Unity',
    competency: 4,
    category: ['Tools'],
  },
  {
    title: 'Numpy',
    competency: 4,
    category: ['Data Science', 'Data Engineering', 'Python', 'ML Engineering'],
  },
  {
    title: 'Tensorflow',
    competency: 3,
    category: ['ML Engineering', 'Python'],
  },
  {
    title: 'PyTorch',
    competency: 4,
    category: ['ML Engineering', 'Python'],
  },
  {
    title: 'Jupyter',
    competency: 5,
    category: ['Data Science', 'Python'],
  },
  {
    title: 'Typescript',
    competency: 3,
    category: ['Web Development', 'Languages', 'Javascript'],
  },
  {
    title: 'HTML + CSS',
    competency: 4,
    category: ['Web Development', 'Languages'],
  },
  {
    title: 'Python',
    competency: 5,
    category: ['Languages', 'Python', 'ML Engineering'],
  },
  {
    title: 'C++',
    competency: 5,
    category: ['Languages'],
  },
  {
    title: 'MATLAB',
    competency: 5,
    category: ['Languages'],
  },
  {
    title: 'R',
    competency: 2,
    category: ['Languages'],
  },
  {
    title: 'Data Visualization',
    competency: 4,
    category: ['Data Science'],
  },
  {
    title: 'Pandas',
    competency: 5,
    category: ['Data Engineering', 'ML Engineering', 'Python'],
  },
  {
    title: 'Matplotlib',
    competency: 4,
    category: ['Data Engineering', 'ML Engineering', 'Python'],
  },
  {
    title: 'Scikit-Learn',
    competency: 3,
    category: ['Data Engineering', 'ML Engineering', 'Python'],
  },
  {
    title: 'Snowflake',
    competency: 2,
    category: ['Data Engineering', 'ML Engineering', 'Tools', 'Databases'],
  },
  {
    title: 'Data Engineering',
    competency: 4,
    category: ['Data Engineering', 'ML Engineering'],
  },
  {
    title: 'Machine Learning',
    competency: 4,
    category: ['ML Engineering'],
  },
  {
    title: 'Deep Learning',
    competency: 3,
    category: ['ML Engineering'],
  },
  {
    title: 'Computer Vision',
    competency: 3,
    category: ['ML Engineering'],
  },
  {
    title: 'Natural Language Processing',
    competency: 2,
    category: ['ML Engineering'],
  },
  {
    title: 'Data Analysis',
    competency: 4,
    category: ['Data Science', 'Python'],
  },
  {
    title: 'x86 Assembly',
    competency: 3,
    category: ['Systems'],
  },
  {
    title: 'C',
    competency: 5,
    category: ['Languages', 'Systems'],
  },
  {
    title: 'Computer Architecture',
    competency: 4,
    category: ['Systems'],
  },
  {
    title: 'Operating Systems',
    competency: 4,
    category: ['Systems'],
  },
  {
    title: 'Verilog',
    competency: 2,
    category: ['Systems'],
  },
  {
    title: 'Digital Design',
    competency: 3,
    category: ['Systems'],
  },
  {
    title: 'Linear Algebra',
    competency: 5,
    category: ['Mathematics'],
  },
  {
    title: 'Real Analysis',
    competency: 5,
    category: ['Mathematics'],
  },
  {
    title: 'Probability and Statistics',
    competency: 4,
    category: ['Mathematics'],
  },
  {
    title: 'Algebraic Methods in Reaction Networks',
    competency: 4,
    category: ['Mathematics'],
  },
  {
    title: 'Applied Optimization',
    competency: 5,
    category: ['Mathematics'],
  },
].map((skill) => ({ ...skill, category: skill.category.sort() }));

// this is a list of colors that I like. The length should be === to the
// number of categories. Re-arrange this list until you find a pattern you like.
const colors = [
  '#6968b3',
  '#37b1f5',
  '#40494e',
  '#515dd4',
  '#e47272',
  '#cc7b94',
  '#3896e2',
  '#c3423f',
  '#d75858',
  '#747fff',
  '#64cb7b',
];

const categories = [...new Set(skills.flatMap(({ category }) => category))]
  .sort()
  .map((category, index) => ({
    name: category,
    color: colors[index],
  }));

export { categories, skills };
