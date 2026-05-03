export const CHIPS = [
  { label: '🚀 Show projects', key: 'projects' },
  { label: '🛠️ My skills', key: 'skills' },
  { label: '💼 Experience', key: 'experience' },
  { label: '🎓 Education', key: 'education' },
  { label: '📬 Contact me', key: 'contact' },
];

export function getBotResponse(input) {
  const text = input.toLowerCase().trim();

  if (match(text, ['project', 'build', 'work', 'portfolio', 'made', 'create', 'hack', 'atlas', 'atc', 'adaptlearn', 'safe sky'])) {
    return {
      type: 'projects',
      text: `Here's what I've been building 🛠️`,
      content: [
        { emoji: '🤖', title: 'AI-Driven API Test Conversion', desc: 'LLM-based Postman script conversion system with Jenkins CI integration.', tags: ['Postman', 'OpenAI API', 'JavaScript', 'Newman', 'Jenkins'] },
        { emoji: '🚑', title: 'Ambulance ETA Prediction', desc: 'Real-time ETA prediction + traffic authority alerts via Twilio.', tags: ['Flask', 'Leaflet.js', 'Geopy', 'Twilio API'] },
        { emoji: '🫁', title: 'Pneumonia Detection (Deep Learning)', desc: 'MobileNetV2 X-ray classifier with Grad-CAM. 87% accuracy.', tags: ['TensorFlow', 'Keras', 'OpenCV', 'Python'] },
        { emoji: '🗺️', title: 'ATLAS — Road Segmentation', desc: 'UNet + ResNet34 achieving 85%+ IoU with 5 classical CV methods. Full-stack with Next.js + FastAPI.', tags: ['PyTorch', 'UNet', 'FastAPI', 'Next.js', 'OpenCV'] },
        { emoji: '✈️', title: 'S.A.F.E. Sky — ATC Assistant', desc: 'Real-time ATC decision support with conflict detection, ghost paths, and Whisper audio transcription.', tags: ['FastAPI', 'Random Forest', 'Whisper', 'Leaflet.js', 'NLP'] },
        { emoji: '🎓', title: 'AdaptLearn — Onboarding Engine', desc: 'AI-powered corporate upskilling with ATS scoring, DAG roadmaps, and LLaMA-3 via Groq.', tags: ['Next.js', 'FastAPI', 'LLaMA-3', 'Groq API', 'React Flow'] },
      ]
    };
  }

  if (match(text, ['skill', 'tech', 'language', 'tool', 'know', 'stack', 'expertise'])) {
    return {
      type: 'skills',
      text: `My technical toolkit spans AI/ML, backend, and QA automation 🧰`,
      content: [
        { group: 'Languages', tags: ['Python', 'Java', 'JavaScript', 'C', 'HTML/CSS'] },
        { group: 'AI & ML', tags: ['TensorFlow/Keras', 'scikit-learn', 'NLTK', 'Prompt Engineering'] },
        { group: 'QA & Automation', tags: ['Postman', 'Jenkins', 'API Testing', 'JS Test Scripting'] },
        { group: 'Data & Backend', tags: ['Flask', 'MySQL', 'MongoDB', 'Pandas', 'NumPy', 'Power BI'] },
      ]
    };
  }

  if (match(text, ['intern', 'experience', 'job', 'work', 'zoho', 'company'])) {
    return {
      type: 'experience',
      text: `I interned at Zoho as an AI & Automation Testing engineer 💼`,
      content: `At <b>Zoho</b> (Oct 2025 – Jan 2026), I worked on AI-based test script conversion systems — improving accuracy through failure analysis, validating machine-generated API automation, and integrating AI-assisted testing into CI pipelines.`
    };
  }

  if (match(text, ['education', 'college', 'study', 'degree', 'university', 'iit', 'rajalakshmi'])) {
    return {
      type: 'education',
      text: `Currently pursuing dual degrees 🎓`,
      content: [
        { school: 'Rajalakshmi Institute of Technology', degree: 'B.E in AI & Machine Learning', info: '2023–Present · CGPA: 8.88' },
        { school: 'IIT Madras', degree: 'B.S in Data Science', info: '2023–Present · Chennai' },
      ]
    };
  }

  if (match(text, ['contact', 'reach', 'hire', 'email', 'connect', 'talk', 'linkedin', 'github'])) {
    return {
      type: 'contact',
      text: `Let's connect! Here's how to reach me 📬`,
      content: {
        email: 'haripriyakannanofficial@gmail.com',
        linkedin: 'https://www.linkedin.com/in/haripriya--kannan',
        github: 'https://github.com/haripriyaa02',
      }
    };
  }

  if (match(text, ['research', 'paper', 'publish', 'iipa', 'conference'])) {
    return {
      type: 'research',
      text: `I presented research at a national conference 📄`,
      content: `Published at <b>IIPA Southern Regional Conference, Puducherry (June 2025)</b> — an AI-Powered Government Scheme Recommender with personalized eligibility matching, multilingual chatbot support, and DPDP/GDPR-compliant design.`
    };
  }

  if (match(text, ['hello', 'hi', 'hey', 'who', 'about', 'introduce', 'yourself', 'you'])) {
    return {
      type: 'text',
      text: `Hey there! 👋 I'm <b>Haripriya K</b> — an AI & ML engineering student from Chennai, dual-enrolled at RIT and IIT Madras. I'm passionate about building intelligent systems, from deep learning models to QA automation pipelines. Try asking me about my <span class="tag">projects</span>, <span class="tag">skills</span>, or <span class="tag">experience</span>!`
    };
  }

  if (match(text, ['summary', 'brief', 'overview', 'tldr', 'short'])) {
    return {
      type: 'text',
      text: `In a nutshell 🌟 — I'm a final-year AI & ML student with hands-on experience in <span class="tag">API Automation</span> at Zoho, deep learning projects, and a published research paper. I love building things that are both technically solid and genuinely useful.`
    };
  }

  return {
    type: 'text',
    text: `Hmm, I didn't quite catch that. Try asking about my <span class="tag">projects</span>, <span class="tag">skills</span>, <span class="tag">experience</span>, <span class="tag">education</span>, or <span class="tag">contact</span> info! 😊`
  };
}

function match(text, keywords) {
  return keywords.some(k => text.includes(k));
}
