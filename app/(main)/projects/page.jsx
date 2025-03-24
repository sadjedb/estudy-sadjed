"use client";
import React, { useState } from "react";
import { FiSearch, FiFilter, FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
// hedo les prj y7atohom les admin mn admin dashboard
const AdminProjectsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "AI-Powered Learning Platform",
      student: "Mohamed Ali",
      department: "Computer Science",
      supervisor: "Dr. Sarah Johnson",
      status: "In Progress",
      completion: 65,
      showcaseImage: "/images/ai-project.jpg",
      description:
        "Developed an AI system to personalize learning experiences for students using machine learning algorithms.",
    },
    {
      id: 2,
      title: "Blockchain Voting System",
      student: "Ahmed Hassan",
      department: "Computer Science",
      supervisor: "Prof. Michael Chen",
      status: "Completed",
      completion: 100,
      showcaseImage: "/images/blockchain-project.jpg",
      description:
        "Implemented a secure voting system using blockchain technology with smart contracts.",
    },
    {
      id: 3,
      title: "Quantum Computing Research",
      student: "Fatima Mahmoud",
      department: "Physics",
      supervisor: "Dr. Emily Wong",
      status: "In Progress",
      completion: 40,
      showcaseImage: "/images/quantum-project.jpg",
      description:
        "Researching quantum algorithms for optimization problems with practical applications.",
    },
  ]);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      activeFilter === "all" ||
      project.status.toLowerCase() === activeFilter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  const deleteProject = (projectId) => {
    setProjects(projects.filter((project) => project.id !== projectId));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Projects Showcase
            </h1>
            <p className="text-gray-600">Display and manage student projects</p>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <FiPlus className="mr-2" />
            Add New Project
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="relative">
            <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              className="appearance-none pl-10 pr-8 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
            >
              <option value="all">All Projects</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={project.showcaseImage}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-semibold">{project.title}</h2>
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-600 hover:text-blue-800">
                        <FiEdit2 />
                      </button>
                      <button
                        className="p-2 text-red-600 hover:text-red-800"
                        onClick={() => deleteProject(project.id)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium">Student:</span>{" "}
                      {project.student}
                    </div>
                    <div>
                      <span className="font-medium">Supervisor:</span>{" "}
                      {project.supervisor}
                    </div>
                    <div>
                      <span className="font-medium">Department:</span>{" "}
                      {project.department}
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{project.completion}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          project.status === "Completed"
                            ? "bg-green-500"
                            : "bg-blue-500"
                        }`}
                        style={{ width: `${project.completion}%` }}
                      ></div>
                    </div>
                    <div className="mt-1 text-right">
                      <span
                        className={`text-xs font-medium ${
                          project.status === "Completed"
                            ? "text-green-600"
                            : "text-blue-600"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <p className="text-gray-500">
              No projects found matching your criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("all");
              }}
              className="mt-4 px-4 py-2 text-blue-600 hover:text-blue-800"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProjectsPage;
