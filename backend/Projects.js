Backend server is running on http://localhost:5000
'use client';

import { useState, useEffect } from 'react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Fetch data from your backend API
        const response = await fetch('/api/projects'); // Use relative path
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []); // The empty array ensures this effect runs only once

  if (loading) return <p className="text-center">Loading projects...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <section id="projects" className="py-20">
      <h2 className="text-3xl font-bold text-center mb-12">My Work</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="text-gray-400 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.stack.map((tech) => (
                <span key={tech} className="bg-gray-700 text-sm font-semibold px-2 py-1 rounded">{tech}</span>
              ))}
            </div>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">View Project</a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;