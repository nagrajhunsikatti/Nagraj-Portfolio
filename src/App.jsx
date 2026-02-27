import React, { useState, useEffect } from 'react';

// --- Inline SVG Icons for maximum reliability and zero external dependencies ---
const Icons = {
  Terminal: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>,
  Cpu: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="15" x2="23" y2="15"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="15" x2="4" y2="15"></line></svg>,
  Cloud: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19c2.5 0 4.5-2 4.5-4.5 0-2.3-1.7-4.2-3.9-4.5-1.1-4.7-5.3-8.1-10.1-8.1-5.1 0-9.4 3.8-10.2 8.7-2.1.6-3.7 2.5-3.7 4.8 0 2.8 2.2 5.1 5 5.1h12.5z"></path></svg>,
  Code: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>,
  Linkedin: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>,
  Github: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>,
  Mail: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>,
  ChevronRight: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>,
  Award: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>,
  Database: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>,
  MapPin: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
  Workflow: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>,
  Brain: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04z"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z"></path></svg>,
  Smartphone: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>,
  Stethoscope: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"></path><path d="M8 15v1a6 6 0 0 0 6 6h2a6 6 0 0 0 6-6v-4"></path><circle cx="20" cy="10" r="2"></circle></svg>
};

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const profile = {
    name: "Nagraj Hunsikatti",
    title: "Software Developer",
    email: "nagrajhunsikatti2007@gmail.com",
    phone: "919373050540",
    location: "Pune, India",
    github: "https://github.com/nagrajhunsikatti",
    linkedin: "https://www.linkedin.com/in/nagraj-hunsikatti-826bba253/"
  };

  const skills = [
    { name: "Python / FastAPI", category: "Backend", icon: <Icons.Code /> },
    { name: "React / Native", category: "Frontend", icon: <Icons.Cpu /> },
    { name: "AI / ML", category: "Intelligence", icon: <Icons.Brain /> },
    { name: "AWS Cloud", category: "Cloud", icon: <Icons.Cloud /> },
    { name: "Docker", category: "DevOps", icon: <Icons.Terminal /> },
    { name: "CI-CD / Git", category: "Automation", icon: <Icons.Workflow /> },
    { name: "PostgreSQL", category: "Database", icon: <Icons.Database /> },
    { name: "Azure DevOps", category: "Tools", icon: <Icons.Terminal /> }
  ];

  const projects = [
    {
      title: "Wound Analysis System",
      type: "Web Application",
      description: "FastAPI backend for healthcare image processing. Scalable structures for large medical datasets.",
      stack: ["Python", "FastAPI", "AWS", "Docker"],
      icon: <Icons.Stethoscope />
    },
    {
      title: "HBCheck – Hemoglobin",
      type: "Mobile Application",
      description: "AI mobile app with live camera capture. High-availability APIs and secure cloud storage.",
      stack: ["React Native", "FastAPI", "AWS", "Azure"],
      icon: <Icons.Smartphone />
    },
    {
      title: "AI Email Generator",
      type: "LLM Web App",
      description: "Generative AI tool with RAG using LangChain and LLaMA. Low-latency inference via Groq Cloud.",
      stack: ["LangChain", "LLaMA", "VectorDB", "Groq"],
      icon: <Icons.Brain />
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-zinc-900 border-zinc-800 py-4' : 'bg-transparent border-transparent py-8'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <span className="text-xl font-bold tracking-tighter text-indigo-500">
            NAGRAJ.DEV
          </span>
          <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-zinc-500">
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#skills" className="hover:text-white transition-colors">Stack</a>
            <a href={`https://wa.me/${profile.phone}`} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-48 pb-32 px-6">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500 bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest">
              Available for Innovations
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-700 bg-zinc-800 text-zinc-300 text-xs font-black uppercase tracking-widest">
              SOFTWARE DEVELOPER
            </div>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-10 leading-none text-white">
            Engineering <br />
            <span className="text-indigo-500 italic">Intelligence.</span>
          </h1>
          
          <p className="max-w-2xl text-xl text-zinc-400 leading-relaxed mb-12">
            I'm <span className="text-white font-bold">{profile.name}</span>, a professional <span className="text-white border-b border-indigo-500">Software Developer</span> building robust 
            <span className="text-indigo-400"> AI-powered systems</span> and automating scalable cloud microservices.
          </p>

          <div className="flex flex-wrap gap-6">
            <a 
              href={`https://wa.me/${profile.phone}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-10 py-5 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all shadow-lg active:scale-95"
            >
              Let's Talk
            </a>
            <div className="flex items-center gap-3">
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="p-5 bg-zinc-900 hover:bg-zinc-800 rounded-2xl border border-zinc-800 flex items-center justify-center transition-all"><Icons.Linkedin /></a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="p-5 bg-zinc-900 hover:bg-zinc-800 rounded-2xl border border-zinc-800 flex items-center justify-center transition-all"><Icons.Github /></a>
              <a href={`mailto:${profile.email}`} className="p-5 bg-zinc-900 hover:bg-zinc-800 rounded-2xl border border-zinc-800 flex items-center justify-center transition-all">
                <Icons.Mail />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Experience Section */}
      <section className="pb-32 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 p-10 rounded-3xl bg-zinc-900 border border-zinc-800" id="experience">
            <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-4">
              <div>
                <p className="text-indigo-400 font-bold text-xs uppercase tracking-widest mb-2 italic">Professional Journey</p>
                <h2 className="text-3xl font-black text-white">Viniti AI</h2>
                <p className="text-indigo-400 text-xs font-bold uppercase mt-1">Software Developer</p>
              </div>
              <div className="px-4 py-2 bg-zinc-950 rounded-full border border-zinc-800 text-xs font-mono text-zinc-500">
                Apr 2025 — Present
              </div>
            </div>
            <p className="text-lg text-zinc-300 mb-8 leading-relaxed">
              Architecting high-performance backends for <span className="text-white font-bold">medical intelligence</span>. 
              Driving efficiency with <span className="text-indigo-400">automated CI/CD pipelines</span> and scalable Python microservices.
            </p>
          </div>

          <div className="md:col-span-4 p-10 rounded-3xl bg-indigo-600 flex flex-col justify-between text-white overflow-hidden">
            <h2 className="text-4xl font-black italic">Software <br />Developer <br />Expertise.</h2>
            <div className="mt-12 space-y-6">
              <div className="flex items-center gap-4">
                <a href={`mailto:${profile.email}`} className="p-3 bg-white/10 rounded-xl hover:bg-white/20 flex items-center justify-center transition-transform hover:scale-110"><Icons.Mail /></a>
                <span className="text-xs font-bold uppercase tracking-wider truncate">{profile.email}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-xl flex items-center justify-center"><Icons.MapPin /></div>
                <span className="text-xs font-bold uppercase tracking-wider">{profile.location}</span>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="md:col-span-12 mt-12 mb-6" id="projects">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-500 mb-8 border-l-2 border-indigo-500 pl-4">Selected Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((p, idx) => (
                <div key={idx} className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-indigo-500 transition-all group">
                  <div className="mb-6 p-4 w-fit bg-indigo-500/10 rounded-2xl text-indigo-400 transition-transform group-hover:scale-110">{p.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-4">{p.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6 flex-grow">{p.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {p.stack.map(tag => (
                      <span key={tag} className="text-[10px] font-bold uppercase text-zinc-500 border border-zinc-800 px-2 py-1 rounded bg-zinc-950">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stack */}
          <div className="md:col-span-12 mt-12 grid grid-cols-2 md:grid-cols-4 gap-6" id="skills">
            {skills.map((s, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-indigo-500 transition-all text-center group">
                <div className="mb-4 text-indigo-400 flex items-center justify-center transition-transform group-hover:scale-125 duration-500">{s.icon}</div>
                <h3 className="text-xs font-black uppercase tracking-widest text-white">{s.name}</h3>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="md:col-span-12 p-10 rounded-3xl bg-zinc-900 border border-zinc-800" id="education">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400"><Icons.Award /></div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Academic Foundation</h2>
            </div>
            <h3 className="text-xl font-bold text-white">B.Tech in AI & Data Science</h3>
            <p className="text-zinc-400 font-medium italic mt-1">Sharad Institute of Technology College of Engineering</p>
            <p className="text-[10px] text-zinc-600 mt-6 font-mono uppercase tracking-[0.3em]">Graduated 2024 • Pune, India</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 px-6 bg-black border-t border-zinc-900 text-center">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-12 italic tracking-tighter text-balance">Software Developer Innovations.</h2>
        <div className="flex flex-col gap-6">
          <a href={`https://wa.me/${profile.phone}`} target="_blank" rel="noopener noreferrer" className="text-xl font-black text-indigo-400 border-b-2 border-indigo-500 pb-2 mx-auto hover:text-white transition-colors">WhatsApp Me</a>
          <a href={`mailto:${profile.email}`} className="text-zinc-500 font-mono text-sm hover:text-white transition-colors">{profile.email}</a>
        </div>
        <div className="mt-20 flex justify-center gap-12">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="opacity-40 hover:opacity-100 transition-opacity hover:scale-110 transform flex items-center justify-center"><Icons.Github /></a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="opacity-40 hover:opacity-100 transition-opacity hover:scale-110 transform flex items-center justify-center"><Icons.Linkedin /></a>
          <a href={`mailto:${profile.email}`} className="opacity-40 hover:opacity-100 transition-opacity hover:scale-110 transform flex items-center justify-center"><Icons.Mail /></a>
        </div>
        <p className="mt-20 text-[10px] font-black uppercase tracking-[0.5em] text-zinc-800">© 2025 NAGRAJ HUNSIKATTI</p>
      </footer>
    </div>
  );
};

export default App;