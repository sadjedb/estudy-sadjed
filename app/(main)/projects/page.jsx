"use client";
import { getSession } from "next-auth/react";
import React, { useState } from "react";
import { FiSearch, FiPlus } from "react-icons/fi";
import withAuth from "@/lib/utils/withAuth";
import { checkPermissions } from "@/lib/utils";
import { Plus } from "lucide-react";
import useProject from "@/hooks/useProject";

const departmentImages = {
  cs: "https://fontawesome.com/social/code?f=&s=",
  physics: "https://fontawesome.com/social/microscope?f=&s=solid",
  chemistry: "https://fontawesome.com/social/atom-simple?f=&s=",
  math: "https://fontawesome.com/social/pi?f=&s=",
};

const Page = ({ session }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { loading, data: projectsData } = useProject();

  const filteredProjects =
    projectsData?.projects.filter((project) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.department.toLowerCase().includes(searchLower) ||
        project.supervisor.toLowerCase().includes(searchLower)
      );
    }) || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center">
        <p className="text-gray-600">Loading projects...</p>
      </div>
    );
  }
  const handleAddToWishlist = async (projectId) => {
    if (!session) {
      alert("Please log in to add projects to your wishlist.");
      return;
    }
    console.log("Adding project to wishlist:", projectId);
    // bdl true ni dirtha beh ntesti
    try {
      if (true) {
        alert("Project added to wishlist!");
      } else {
        throw new Error("Failed to add to wishlist");
      }
    } catch (error) {
      console.error("Wishlist error:", error);
      alert("Failed to add project to wishlist.");
    }
  };
  console.log("Filtered Projects:", filteredProjects);
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text ">
              Projects Showcase
            </h1>
            <p className="text-gray-600 mt-2">
              Explore innovative student projects across various departments
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects by title, description, or department..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={
                      departmentImages[project.department.toLowerCase()] ||
                      "/images/default-department.jpg"
                    }
                    alt={project.department}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
                  <span className="absolute bottom-4 left-4 text-white font-semibold text-lg">
                    {project.department.toUpperCase()} Department
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-1 h-[55%]">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-bold text-gray-800">
                      {project.title}
                    </h2>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {project.available_spots} spots left
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="space-y-2.5 text-sm text-gray-700">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span className="font-medium">Supervisor:</span>{" "}
                      {project.supervisor}
                    </div>
                  </div>

                  {session?.user &&
                    checkPermissions(session?.user?.roles, ["student"]) && (
                      <div className="flex space-x-2 justify-end mt-auto">
                        <button
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                          onClick={() => handleAddToWishlist(project.id)}
                        >
                          <Plus className="w-5 h-5" />
                          Add to Wishlist
                        </button>
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className="max-w-md mx-auto">
              <svg
                className="mx-auto h-16 w-16 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No projects found
              </h3>
              <p className="mt-2 text-gray-500">
                Try adjusting your search or filters
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Clear search
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default withAuth(Page, ["public"]);
