<<<<<<< HEAD
import AdminDashboard from "@/components/admin/AdminDashboard";
import React from "react";
=======
"use client";
import withAuth from "@/lib/utils/withAuth";
import React, { useState } from "react";
import {
  FiPlus,
  FiTrash2,
  FiEdit2,
  FiUser,
  FiBook,
  FiBell,
  FiSearch,
  FiSave,
  FiX,
} from "react-icons/fi";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("announcements");
  const [editMode, setEditMode] = useState({ type: null, id: null });
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Final Project Submission Deadline",
      content: "All final projects must be submitted by June 15th.",
      department: "all",
      date: "2024-05-20",
      urgent: false,
    },
    {
      id: 2,
      title: "Computer Science Lab Maintenance",
      content: "The CS lab will be closed on May 25th for upgrades.",
      department: "cs",
      date: "2024-05-15",
      urgent: true,
    },
  ]);

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "AI-Powered Learning System",
      description: "Develop an AI system to personalize learning experiences.",
      department: "cs",
      spots: 5,
      supervisor: "Dr. Smith",
    },
    {
      id: 2,
      title: "Blockchain Voting System",
      description: "Create a secure voting system using blockchain.",
      department: "cs",
      spots: 3,
      supervisor: "Prof. Johnson",
    },
  ]);

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Mohamed Ali",
      email: "m.ali@univ.edu",
      department: "cs",
      wishlist: ["AI-Powered Learning System", "Blockchain Voting System"],
    },
    {
      id: 2,
      name: "Fatima Mahmoud",
      email: "f.mahmoud@univ.edu",
      department: "math",
      wishlist: ["Statistical Modeling"],
    },
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    department: "all",
    urgent: false,
  });

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    department: "cs",
    spots: 1,
    supervisor: "",
  });

  const [editForm, setEditForm] = useState({
    title: "",
    content: "",
    department: "all",
    urgent: false,
    description: "",
    spots: 1,
    supervisor: "",
  });

  const enterEditMode = (type, item) => {
    setEditMode({ type, id: item.id });
    if (type === "announcement") {
      setEditForm({
        title: item.title,
        content: item.content,
        department: item.department,
        urgent: item.urgent,
      });
    } else {
      setEditForm({
        title: item.title,
        description: item.description,
        department: item.department,
        spots: item.spots,
        supervisor: item.supervisor,
      });
    }
  };

  const exitEditMode = () => {
    setEditMode({ type: null, id: null });
  };

  const saveEdit = () => {
    if (editMode.type === "announcement") {
      setAnnouncements(
        announcements.map((a) =>
          a.id === editMode.id
            ? {
              ...a,
              title: editForm.title,
              content: editForm.content,
              department: editForm.department,
              urgent: editForm.urgent,
            }
            : a
        )
      );
    } else {
      setProjects(
        projects.map((p) =>
          p.id === editMode.id
            ? {
              ...p,
              title: editForm.title,
              description: editForm.description,
              department: editForm.department,
              spots: editForm.spots,
              supervisor: editForm.supervisor,
            }
            : p
        )
      );
    }
    exitEditMode();
  };

  const handleAddAnnouncement = (e) => {
    e.preventDefault();
    const announcement = {
      ...newAnnouncement,
      id: announcements.length + 1,
      date: new Date().toISOString().split("T")[0],
    };
    setAnnouncements([...announcements, announcement]);
    setNewAnnouncement({
      title: "",
      content: "",
      department: "all",
      urgent: false,
    });
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    const project = {
      ...newProject,
      id: projects.length + 1,
    };
    setProjects([...projects, project]);
    setNewProject({
      title: "",
      description: "",
      department: "cs",
      spots: 1,
      supervisor: "",
    });
  };

  const deleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
  };

  const deleteProject = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
  };
>>>>>>> 681355cbc1a712d6f57ac61af7a881b93b873a66

const page = () => {
  return (
<<<<<<< HEAD
    <div>
      <AdminDashboard />
=======
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600">
            Manage announcements, projects, and student information
          </p>
        </div>

        <div className="flex border-b mb-6">
          <button
            className={`px-4 py-2 ${activeTab === "announcements"
              ? "border-b-2 border-blue-500 font-medium"
              : ""
              }`}
            onClick={() => setActiveTab("announcements")}
          >
            <FiBell className="inline mr-2" />
            Announcements
          </button>
          <button
            className={`px-4 py-2 ${activeTab === "projects"
              ? "border-b-2 border-blue-500 font-medium"
              : ""
              }`}
            onClick={() => setActiveTab("projects")}
          >
            <FiBook className="inline mr-2" />
            Projects
          </button>
          <button
            className={`px-4 py-2 ${activeTab === "students"
              ? "border-b-2 border-blue-500 font-medium"
              : ""
              }`}
            onClick={() => setActiveTab("students")}
          >
            <FiUser className="inline mr-2" />
            Students
          </button>
        </div>
        {activeTab === "announcements" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">
                {editMode.type === "announcement"
                  ? "Edit Announcement"
                  : "Create New Announcement"}
              </h2>
              <form
                onSubmit={
                  editMode.type === "announcement"
                    ? saveEdit
                    : handleAddAnnouncement
                }
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={
                      editMode.type === "announcement"
                        ? editForm.title
                        : newAnnouncement.title
                    }
                    onChange={(e) =>
                      editMode.type === "announcement"
                        ? setEditForm({ ...editForm, title: e.target.value })
                        : setNewAnnouncement({
                          ...newAnnouncement,
                          title: e.target.value,
                        })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                  </label>
                  <textarea
                    className="w-full p-2 border rounded"
                    rows={3}
                    value={
                      editMode.type === "announcement"
                        ? editForm.content
                        : newAnnouncement.content
                    }
                    onChange={(e) =>
                      editMode.type === "announcement"
                        ? setEditForm({ ...editForm, content: e.target.value })
                        : setNewAnnouncement({
                          ...newAnnouncement,
                          content: e.target.value,
                        })
                    }
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Department
                    </label>
                    <select
                      className="w-full p-2 border rounded"
                      value={
                        editMode.type === "announcement"
                          ? editForm.department
                          : newAnnouncement.department
                      }
                      onChange={(e) =>
                        editMode.type === "announcement"
                          ? setEditForm({
                            ...editForm,
                            department: e.target.value,
                          })
                          : setNewAnnouncement({
                            ...newAnnouncement,
                            department: e.target.value,
                          })
                      }
                    >
                      <option value="all">All Departments</option>
                      <option value="cs">Computer Science</option>
                      <option value="math">Mathematics</option>
                      <option value="physics">Physics</option>
                      <option value="chemistry">Chemistry</option>
                    </select>
                  </div>
                  <div className="flex items-center mt-6">
                    <input
                      type="checkbox"
                      id="urgent"
                      className="mr-2"
                      checked={
                        editMode.type === "announcement"
                          ? editForm.urgent
                          : newAnnouncement.urgent
                      }
                      onChange={(e) =>
                        editMode.type === "announcement"
                          ? setEditForm({
                            ...editForm,
                            urgent: e.target.checked,
                          })
                          : setNewAnnouncement({
                            ...newAnnouncement,
                            urgent: e.target.checked,
                          })
                      }
                    />
                    <label
                      htmlFor="urgent"
                      className="text-sm font-medium text-gray-700"
                    >
                      Mark as urgent
                    </label>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
                  >
                    <FiSave className="inline mr-2" />
                    {editMode.type === "announcement"
                      ? "Save Changes"
                      : "Add Announcement"}
                  </button>
                  {editMode.type === "announcement" && (
                    <button
                      type="button"
                      onClick={exitEditMode}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 flex items-center"
                    >
                      <FiX className="inline mr-2" />
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">
                Current Announcements
              </h2>
              <div className="space-y-4">
                {announcements.length > 0 ? (
                  announcements.map((announcement) => (
                    <div
                      key={announcement.id}
                      className={`p-4 border rounded-lg ${announcement.urgent
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200"
                        }`}
                    >
                      {editMode.type === "announcement" &&
                        editMode.id === announcement.id ? (
                        <div className="text-sm text-gray-500 mb-2">
                          Editing...
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-between">
                            <h3 className="font-medium">
                              {announcement.title}
                            </h3>
                            <div className="flex space-x-2">
                              <button
                                onClick={() =>
                                  enterEditMode("announcement", announcement)
                                }
                                className="text-blue-500 hover:text-blue-700"
                              >
                                <FiEdit2 />
                              </button>
                              <button
                                onClick={() =>
                                  deleteAnnouncement(announcement.id)
                                }
                                className="text-red-500 hover:text-red-700"
                              >
                                <FiTrash2 />
                              </button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {announcement.department === "all"
                              ? "All Departments"
                              : announcement.department.toUpperCase()}
                            • {announcement.date}
                          </p>
                          <p className="mt-2">{announcement.content}</p>
                        </>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No announcements yet</p>
                )}
              </div>
            </div>
          </div>
        )}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">
                {editMode.type === "project"
                  ? "Edit Project"
                  : "Add New Project"}
              </h2>
              <form
                onSubmit={
                  editMode.type === "project" ? saveEdit : handleAddProject
                }
                className="space-y-4"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={
                        editMode.type === "project"
                          ? editForm.title
                          : newProject.title
                      }
                      onChange={(e) =>
                        editMode.type === "project"
                          ? setEditForm({ ...editForm, title: e.target.value })
                          : setNewProject({
                            ...newProject,
                            title: e.target.value,
                          })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Department
                    </label>
                    <select
                      className="w-full p-2 border rounded"
                      value={
                        editMode.type === "project"
                          ? editForm.department
                          : newProject.department
                      }
                      onChange={(e) =>
                        editMode.type === "project"
                          ? setEditForm({
                            ...editForm,
                            department: e.target.value,
                          })
                          : setNewProject({
                            ...newProject,
                            department: e.target.value,
                          })
                      }
                    >
                      <option value="cs">Computer Science</option>
                      <option value="math">Mathematics</option>
                      <option value="physics">Physics</option>
                      <option value="chemistry">Chemistry</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    className="w-full p-2 border rounded"
                    rows={3}
                    value={
                      editMode.type === "project"
                        ? editForm.description
                        : newProject.description
                    }
                    onChange={(e) =>
                      editMode.type === "project"
                        ? setEditForm({
                          ...editForm,
                          description: e.target.value,
                        })
                        : setNewProject({
                          ...newProject,
                          description: e.target.value,
                        })
                    }
                    required
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Available Spots
                    </label>
                    <input
                      type="number"
                      min="1"
                      className="w-full p-2 border rounded"
                      value={
                        editMode.type === "project"
                          ? editForm.spots
                          : newProject.spots
                      }
                      onChange={(e) =>
                        editMode.type === "project"
                          ? setEditForm({
                            ...editForm,
                            spots: parseInt(e.target.value),
                          })
                          : setNewProject({
                            ...newProject,
                            spots: parseInt(e.target.value),
                          })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Supervisor
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={
                        editMode.type === "project"
                          ? editForm.supervisor
                          : newProject.supervisor
                      }
                      onChange={(e) =>
                        editMode.type === "project"
                          ? setEditForm({
                            ...editForm,
                            supervisor: e.target.value,
                          })
                          : setNewProject({
                            ...newProject,
                            supervisor: e.target.value,
                          })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
                  >
                    <FiSave className="inline mr-2" />
                    {editMode.type === "project"
                      ? "Save Changes"
                      : "Add Project"}
                  </button>
                  {editMode.type === "project" && (
                    <button
                      type="button"
                      onClick={exitEditMode}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 flex items-center"
                    >
                      <FiX className="inline mr-2" />
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Manage Projects</h2>
                <div className="relative w-64">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Spots
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Supervisor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {projects.map((project) => (
                      <tr key={project.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium">{project.title}</div>
                          <div className="text-sm text-gray-500">
                            {project.description.substring(0, 50)}...
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {project.department.toUpperCase()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {project.spots}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {project.supervisor}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {editMode.type === "project" &&
                            editMode.id === project.id ? (
                            <span className="text-gray-500">Editing...</span>
                          ) : (
                            <>
                              <button
                                className="text-blue-600 hover:text-blue-900 mr-3"
                                onClick={() =>
                                  enterEditMode("project", project)
                                }
                              >
                                <FiEdit2 />
                              </button>
                              <button
                                className="text-red-600 hover:text-red-900"
                                onClick={() => deleteProject(project.id)}
                              >
                                <FiTrash2 />
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {activeTab === "students" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Student Information</h2>
              <div className="relative w-64">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Wishlist
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium">{student.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.department.toUpperCase()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {student.wishlist.map((project, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                              {project}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
>>>>>>> 681355cbc1a712d6f57ac61af7a881b93b873a66
    </div>
  );
};

<<<<<<< HEAD
export default page;
=======
export default withAuth(AdminDashboard, ["admin"]);
>>>>>>> 681355cbc1a712d6f57ac61af7a881b93b873a66
