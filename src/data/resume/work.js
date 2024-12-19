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
    name: 'Makers Labs',
    position: 'Software Engineering Intern',
    url: 'https://www.iiit.ac.in/makerslab/',
    startDate: '2022-01-01',
    endDate: '2024-07-01',
    summary: 'Makers Lab is a dedicated prototyping (mechanical and digital) facility set up with support from the Department of Science & Technology under the NIDHI-PRAYAS Program. GoI through this program aims to support young entrepreneurs with grants to address the gap in the early stage idea/ proof of concept funding',
    highlights: [
      'Developed a web application using React.js and Node.js',
      'Made backend API calls to a Flask server',
      'Database management using PostgreSQL',
    ],
  },
];

export default work;
