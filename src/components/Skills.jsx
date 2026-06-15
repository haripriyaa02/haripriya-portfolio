import { useEffect, useRef } from 'react';

const skillGroups = [
  {
    title: 'Programming Languages',
    tags: ['Python', 'Java', 'JavaScript', 'C', 'HTML', 'CSS'],
  },
  {
    title: 'AI / ML & Data Science',
    tags: ['TensorFlow', 'Keras', 'scikit-learn', 'NLTK', 'Prompt Engineering', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
  },
  {
    title: 'Backend & Databases',
    tags: ['Flask', 'MySQL', 'MongoDB', 'REST APIs'],
  },
  {
    title: 'QA & Automation',
    tags: ['Postman', 'Newman', 'Jenkins (CI/CD)', 'API Testing', 'JS Test Scripting', 'Log Analysis & Debugging'],
  },
  {
    title: 'Data Viz & BI',
    tags: ['Power BI', 'Excel', 'Matplotlib', 'Seaborn'],
  },
  {
    title: 'Dev Tools & Cloud',
    tags: ['Git', 'GitHub', 'GCP', 'VS Code'],
  },
  {
    title: 'AI Tools for Productivity',
    tags: ['ChatGPT', 'Claude', 'GitHub Copilot', 'Lovable', 'Perplexity'],
  },
  {
    title: 'Soft Skills',
    tags: ['Critical Thinking', 'Creative Problem Solving', 'Adaptability', 'Teamwork', 'Communication'],
  },
];

export default function Skills() {
  const groupRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-tag').forEach((tag, i) => {
              setTimeout(() => tag.classList.add('visible'), i * 55);
            });
            entry.target.querySelector('.skill-group-title')?.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );
    groupRefs.current.forEach(r => r && observer.observe(r));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="skills" id="skills">
      <div className="skills-container">
        <div className="section-tag reveal">Skills</div>
        <h2 className="section-title reveal" style={{ transitionDelay: '0.1s' }}>
          My <span className="gradient-text">toolkit.</span>
        </h2>

        <div className="skills-grid">
          {skillGroups.map((group, gi) => (
            <div
              key={gi}
              ref={el => groupRefs.current[gi] = el}
            >
              <div
                className="skill-group-title reveal"
                style={{ transitionDelay: `${gi * 0.05}s` }}
              >
                {group.title}
              </div>
              <div className="skill-tags">
                {group.tags.map((tag, ti) => (
                  <span key={ti} className="skill-tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
