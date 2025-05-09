"use client";
import { useState } from "react";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { FaUser, FaTasks, FaRegBookmark } from "react-icons/fa";

const Page = () => {
  const [student, setStudent] = useState({
    name: "Gamar Benchkiberdo",
    major: "Software Engineering",
    year: "3rd Year",
    bio: "Passionate about full-stack development and AI integration. Looking for collaborative projects in web development.",
    contactInfo: {
      email: "gamar@example.com",
      phone: "+1234567890",
    },
    projects: [
      {
        id: 1,
        title: "Blockchain Voting System",
        department: "Computer Science",
        status: "In Progress",
        student: " Ahmed Hassan",
        supervisor: "Prof. Michael Chen",
        description:
          "Developing an intelligent task manager with NLP-based natural language input",
        date: "15 May 2025",
      },
      {
        id: 2,
        title: "AI-Powered Learning Platform",
        department: "Computer Science",
        status: "In Progress",
        student: " Ahmed Mohamed Ali",
        supervisor: "Dr. Sarah Johnson",
        description:
          "Developed an AI system to personalize learning experiences for students using machine learning",
        date: "01 May 2025",
      },
    ],
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editBio, setEditBio] = useState("");
  const [editContactInfo, setEditContactInfo] = useState({
    email: "",
    phone: "",
  });

  const handleEditClick = () => {
    setEditBio(student.bio);
    setEditContactInfo(student.contactInfo);
    setIsEditModalOpen(true);
  };

  const handleSave = () => {
    setStudent((prev) => ({
      ...prev,
      bio: editBio,
      contactInfo: editContactInfo,
    }));
    setIsEditModalOpen(false);
  };

  const removeProject = (projectId) => {
    setStudent((prev) => ({
      ...prev,
      projects: prev.projects.filter((proj) => proj.id !== projectId),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div
        className={` ${
          isEditModalOpen ? "max-w-6xl mx-auto opacity-10" : "max-w-6xl mx-auto"
        } `}
      >
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
              <FaUser className="text-4xl text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    {student.name}
                  </h1>
                  <div className="flex items-center gap-2 text-gray-600 mt-1">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                      {student.major}
                    </span>
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                      {student.year}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleEditClick}
                  className="text-blue-600 hover:text-blue-700 px-4 py-2 rounded-lg border border-blue-600 hover:border-blue-700"
                >
                  Edit Profile
                </button>
              </div>
              <p className="text-gray-600 mt-3">{student.bio}</p>
              <div className="mt-3 space-y-1">
                <p className="text-sm text-gray-600">
                  📧 {student.contactInfo.email}
                </p>
                <p className="text-sm text-gray-600">
                  📱 {student.contactInfo.phone}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FaRegBookmark className="text-blue-600" />
              Project Wishlist
            </h2>
            <Link
              href={"/projects"}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add New Project
            </Link>
          </div>

          <div className="grid gap-4">
            {student.projects.map((project) => (
              <div
                key={project.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors relative"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{project.title}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-600 flex items-center gap-1">
                          <FaTasks className="text-blue-600" />
                          {project.department}
                          <span
                            className={`px-2 py-1 rounded-full text-sm ${
                              project.status === "Idea Stage"
                                ? "bg-yellow-100 text-yellow-600"
                                : project.status === "Planning"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-green-100 text-green-600"
                            }`}
                          >
                            {project.status}
                          </span>
                        </span>
                        <span className="text-sm text-gray-600 flex items-center gap-1">
                          <span className="font-medium">Student:</span>{" "}
                          {project.student}
                        </span>
                        <span className="text-sm text-gray-600 flex items-center gap-1">
                          <span className="font-medium">Supervisor:</span>{" "}
                          {project.supervisor}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="text-green-600" />
                      <span className="font-bold"> {project.date} </span>
                    </div>
                    <button
                      onClick={() => removeProject(project.id)}
                      className="ml-3 text-red-500 hover:text-red-700"
                      title="Remove project"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 mt-2">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  rows="4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={editContactInfo.email}
                  onChange={(e) =>
                    setEditContactInfo({
                      ...editContactInfo,
                      email: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  value={editContactInfo.phone}
                  onChange={(e) =>
                    setEditContactInfo({
                      ...editContactInfo,
                      phone: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
