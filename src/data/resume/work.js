/**
 * @typedef {Object} Position
 * Conforms to https://jsonresume.org/schema/
 *
 * @property {string} name - Name of the company
 * @property {string} position - Position title
 * @property {string} url - Company website
 * @property {string} startDate - Start date of the position in YYYY-MM-DD format
 * @property {string|undefined} endDate - End date of the position in YYYY-MM-DD format.
 * If undefined, the position is still active.
 * @property {string|undefined} summary - html/markdown summary of the position
 * @property {string[]} highlights - plain text highlights of the position (bulleted list)
 */
const work = [
  {
    name: 'Accelerize360',
    position: 'Product Manager Intern',
    url: 'https://www.accelerize360.com/',
    startDate: '2025-02-05',
    endDate: '2025-05-01',
    summary: 'Accelerize360 is a leading provider of data-driven marketing solutions, specializing in performance marketing and customer acquisition. The company leverages advanced analytics and machine learning to optimize marketing campaigns and drive business growth.',
    highlights: [
      'Developed a full-stack web platform with AWS and Snowflake integration to streamline internal data workflows',
      'Designed an interactive canvas for visualizing table-column relationships with scalable UI/UX',
      'Implemented a data analytics dashboard for real-time insights into data pipelines and performance metrics',
    ],
  },
  {
    name: 'Makers Labs',
    position: 'Software Engineering Intern',
    url: 'https://www.iiit.ac.in/makerslab/',
    startDate: '2023-12-01',
    endDate: '2024-01-01',
    summary: 'Makers Lab is a dedicated prototyping (mechanical and digital) facility set up with support from the Department of Science & Technology under the NIDHI-PRAYAS Program. GoI through this program aims to support young entrepreneurs with grants to address the gap in the early stage idea/ proof of concept funding',
    highlights: [
      'Developed a web application using React.js and Node.js',
      'Made backend API calls to a Flask server',
      'Database management using PostgreSQL',
    ],
  },
  {
    name: 'iHub-Data',
    position: 'Research Assistant',
    url: 'https://ihub-data.iiit.ac.in/',
    startDate: '2023-04-01',
    endDate: '2023-09-01',
    summary: 'IHub-Data has been created as a Section 8 company that manages the Data Foundation, Research & Technology Development, Applied Research & Translation, HRD & Skill Development, Innovation & Start-ups, and the International Collaborations directly. The Hub helps coordinate, integrate, and amplify basic and applied research in broad Data-Driven Technologies as well as its dissemination and translation across the country.',
    highlights: [
      'Employed machine learning models to analyze gaze behavior of Indian drivers, identifying key areas of visual focus',
      'Compared Performance of Salience Models on Indian Driver Gaze Data and Foreign Driver Gaze Data',
      'Published at Intelligent Transport Systems 2024',
    ],
  },
  {
    name: 'Cognitive Science Lab, IIIT Hyderabad',
    position: 'Undergrad Researcher',
    url: 'https://csl.iiit.ac.in/',
    startDate: '2023-04-01',
    endDate: '2023-09-01',
    summary: 'Cognitive Science is the study of how we perceive, act, and reason about and form beliefs about our environment. It is an interdisciplinary approach to study the brain, mind and behaviour by embracing neuroscience, psychology, philosophy, linguistics and anthropology to create cognitive models. It is playing an increasingly important role in many areas of engineering and technology like artificial intelligence, cyborg intelligence, human factors, usability engineering, creativity-support systems, movies, music cognition, assistive systems, brain-computer interfaces, serious games, and so on.',
    highlights: [
      'Developed a VR-based diagnostic tool in Unity (C#) to detect binocular vision disorders.',
      'Collected and analyzed real-world data with hospitals and schools; achieved 3.5°/9.5° deviation for normal/patient.',
      'Patent granted for VR-based medical diagnostic innovation from government of India.',
    ],
  },
];

export default work;
