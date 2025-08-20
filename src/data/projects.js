// TODO Add a couple lines about each project
const data = [
  {
    title: 'VR-Phore',
    subtitle: 'VR based alternative for Synoptophore',
    image: '/images/projects/vrphore_.png',
    date: '2024-12-04',
    link: '/blog/VR%20Phore',
    desc:
      'Innovated a simulation of the synoptophore device using the Unity engine'
      + 'to diagnose binocular vision problems such as strabismus and amblyopia'
      + 'in a virtual reality headset. Granted a patent for this innovation',
  },
  {
    title: 'Ray Optics Simulation',
    subtitle: 'Research Project',
    image: '/images/projects/rayoptics.jpg',
    date: '2024-09-01',
    link: '/blog/Ray%20Optics%20Simulation',
    desc:
      'Created an interactive ray optics simulation in Unity engine for children,'
      + ' featuring distance and degree annotations, VIBGYOR diffraction simulation,'
      + ' ray manipulation for image formation, and a game-like structure for easier learning.',
  },
  {
    title: 'G-Reddit',
    subtitle: 'Reddit Clone',
    image: '/images/projects/grediiit.png',
    date: '2023-05-01',
    link: 'https://github.com/AarnavNagariya/G-Reddiiit',
    desc:
      'A social media website, similar to that of Reddit with all the necessary functionalities'
      + ' implemented in MERN stack along with dockerized code.',
  },
  {
    title: '64-bit Y86 Processor Architecture',
    subtitle: 'Custom 64-bit Y86 Processor',
    image: '/images/projects/y86.png',
    date: '2023-09-01',
    link: 'https://github.com/AarnavNagariya/64-bit-Y86-Processor',
    desc:
      'Designed a 64-bit Y86 architecture processor in Verilog, and'
      + ' implemented a 5-stage pipeline for enhanced speed and efficiency.'
      + ' Verified correctness in GTKWave.',
  },
  {
    title: 'A-Shell',
    subtitle: 'Custom Shell',
    image: '/images/projects/shell.png',
    date: '2022-11-01',
    link: 'https://github.com/AarnavNagariya/A_Shell',
    desc:
      'A functional Linux shell using C programming language. '
      + 'Developed and tested various commands with input and output redirection,'
      + ' including both built-in and custom commands such as ls, cd, pwd, discover,'
      + ' and history.',
  },
  {
    title: 'E-Commerce Product Recommendation system',
    subtitle: 'Product Recommendation System',
    image: '/images/projects/product.jpg',
    date: '2024-08-01',
    desc:
      'Product recommendation system using NLP and Retrieval-Augmented Generation (RAG)'
      + ' techniques backed by llms, Enabling user query understanding and provided relevant'
      + ' suggestions based on preferences like department, category, brand, and price range '
      + 'by the semantic meaning.',
  },
  {
    title: 'Decoding Mental Processes from FMRI images',
    subtitle: 'Neural Network based prediction model for FMRI images',
    image: '/images/projects/brain.jpeg',
    date: '2024-05-01',
    desc:
      'Utilized an existing neural network model and made custom autoencoder embeddings model for decoding '
      + 'mental processes such as motor functions, speech, and emotions from fMRI images.'
      + ' Achieved 88% accuracy from the autoencoder model.',
  },
  {
    title: 'Contextual Text Clustering and labelling',
    subtitle: 'BERT based Text Clustering',
    image: '/images/projects/cluster.jpeg',
    date: '2024-10-01',
    desc:
      'Developed a text clustering system using BERT embedding and K-Means algorithm'
      + ' to analyze and categorize textual data, further from an annotated dataset of'
      + ' sentences and their specific labels, fine-tuned mistral-7B for the specific task'
      + ' of label classification and classified the labels for clusters.',
  },
  {
    title: 'Retrieval-augmented generation (RAG) based Document Formatter',
    subtitle: 'Formatting Documents using Gemini',
    image: '/images/projects/rag_.png',
    date: '2024-11-01',
    link: 'https://github.com/AarnavNagariya/RAG-Based-Document-Formatter',
    desc:
      'Developed a document formatting system using Retrieval-Augmented Generation (RAG)'
      + ' techniques to generate a formatted document from a given text input.'
      + ' The system is capable of generating formatted documents in various formats'
      + ' such as PDF, HTML, and DOCX.',
  },
  {
    title: 'Image Recoloring using Color Clustering and Harmonization',
    subtitle: 'GMM based Photo Recoloring and Harmonization',
    image: '/images/projects/dip.png',
    date: '2024-12-01',
    link: 'https://github.com/AarnavNagariya/Photo-Recoloring-Through-K-Means-Clustering',
    desc:
      'Developed a photo recoloring system using Gaussian Mixture Models (GMM)'
      + ' to cluster colors in an image to generate a color palette.'
      + ' Then recoloring the cluster centers to desired colors. '
      + ' These desired color can be extracted from another image as well. '
      + ' Also creatred a harmonization system from previous studies to harmonize the image'
      + 'and extended these functionalities to video recoloring and harmonization.',
  },
];

export default data;
