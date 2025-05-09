"use client";
import React, { useEffect, useState } from "react";
import { FiPlus, FiTrash2, FiBook, FiCalendar, FiUser } from "react-icons/fi";
import TabNavigation from "./Shared/TabNavigation";
import AnnouncementList from "./Announcements/AnnouncementList";
import ProjectForm from "./Projects/ProjectForm";
import ProjectList from "./Projects/ProjectList";
import StudentList from "./Students/StudentList";
import StudentForm from "./Students/StudentForm";
import AnnouncementForm from "./Announcements/AnnouncementForm";
import ModuleManagement from "./Courses/ModuleManagement";
import useApi from "@/hooks/useApi";
import useProject from "@/hooks/useProject";
import useStudent from "@/hooks/useStudent";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("announcements");
  const [editMode, setEditMode] = useState({ type: null, id: null });
  const [showAddForm, setShowAddForm] = useState(false);

  // Announcements State
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

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    department: "all",
    urgent: false,
  });

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

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    department: "cs",
    spots: 1,
    supervisor: "",
  });

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

  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    department: "cs",
    wishlist: [],
  });

  const [newWishlistItem, setNewWishlistItem] = useState("");
  const [editForm, setEditForm] = useState({
    title: "",
    content: "",
    department: "all",
    urgent: false,
    description: "",
    spots: 1,
    supervisor: "",
  });

  // Common Handlers
  const exitEditMode = () => setEditMode({ type: null, id: null });

  const enterEditMode = (type, item) => {
    setEditMode({ type, id: item.id });
    setEditForm(item);
  };

  const saveEdit = () => {
    if (editMode.type === "announcement") {
      setAnnouncements(
        announcements.map((a) => (a.id === editMode.id ? editForm : a))
      );
    } else if (editMode.type === "project") {
      setProjects(projects.map((p) => (p.id === editMode.id ? editForm : p)));
    }
    exitEditMode();
  };

  // Announcement Handlers
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

  const deleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
  };
  const { loading, data: projectsData, addProject } = useProject();
  const { loading: loadingStudents, data: studentsData, addStudent } = useStudent()
  console.log("Students Data:", studentsData);

  console.log("Projects Data:", projectsData);
  useEffect(() => {

    if (projectsData) {
      setProjects(projectsData.projects)
    }
  }, [projectsData])

  // Project Handlers
  const handleAddProject = async (e) => {
    e.preventDefault();
    const project = { ...newProject };
    await addProject(project);
    setProjects([...projects, project]);
    setNewProject({
      title: "",
      description: "",
      department: "cs",
      spots: 1,
      supervisor: "",
    });
  };

  const deleteProject = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  // Student Handlers
  const handleAddStudent = async (e) => {
    e.preventDefault();
    await addStudent(newStudent);
    const student = { ...newStudent, id: students.length + 1 };
    setStudents([...students, student]);
    setNewStudent({ name: "", email: "", department: "cs", wishlist: [] });
    setShowAddForm(false);
  };

  const addProjectToWishlist = () => {
    if (newWishlistItem && !newStudent.wishlist.includes(newWishlistItem)) {
      setNewStudent({
        ...newStudent,
        wishlist: [...newStudent.wishlist, newWishlistItem],
      });
      setNewWishlistItem("");
    }
  };

  const removeProjectFromWishlist = (index) => {
    const updatedWishlist = [...newStudent.wishlist];
    updatedWishlist.splice(index, 1);
    setNewStudent({ ...newStudent, wishlist: updatedWishlist });
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "announcements":
        return (
          <>
            <AnnouncementForm
              editMode={editMode}
              editForm={editForm}
              newAnnouncement={newAnnouncement}
              setEditForm={setEditForm}
              setNewAnnouncement={setNewAnnouncement}
              saveEdit={saveEdit}
              exitEditMode={exitEditMode}
              handleAddAnnouncement={handleAddAnnouncement}
            />
            <AnnouncementList
              announcements={announcements}
              editMode={editMode}
              enterEditMode={enterEditMode}
              deleteAnnouncement={deleteAnnouncement}
            />
          </>
        );

      case "projects":
        return (
          <>
            <ProjectForm
              editMode={editMode}
              editForm={editForm}
              newProject={newProject}
              setEditForm={setEditForm}
              setNewProject={setNewProject}
              saveEdit={saveEdit}
              exitEditMode={exitEditMode}
              handleAddProject={handleAddProject}
            />
            <ProjectList
              projects={projects}
              editMode={editMode}
              enterEditMode={enterEditMode}
              deleteProject={deleteProject}
            />
          </>
        );

      case "students":
        return showAddForm ? (
          <StudentForm
            newStudent={newStudent}
            setNewStudent={setNewStudent}
            newWishlistItem={newWishlistItem}
            setNewWishlistItem={setNewWishlistItem}
            addProjectToWishlist={addProjectToWishlist}
            removeProjectFromWishlist={removeProjectFromWishlist}
            handleAddStudent={handleAddStudent}
            setShowAddForm={setShowAddForm}
            projects={projects}
          />
        ) : (
          <>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center mb-4"
            >
              <FiPlus className="inline mr-2" />
              Add Student
            </button>
            <StudentList students={students} projects={projects} />
          </>
        );

      case "courses":
        return <ModuleManagement />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600">
            Manage announcements, projects, students, and modules
          </p>
        </div>

        <TabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={["announcements", "projects", "students", "modules"]}
        />

        <div className="space-y-6">{renderActiveTab()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
