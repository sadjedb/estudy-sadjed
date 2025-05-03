"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FaBell,
  FaListAlt,
  FaCalendarAlt,
  FaLaptopCode,
  FaCalculator,
  FaAtom,
  FaFlask,
  FaPlusCircle,
  FaBook,
  FaUpload,
  FaChevronRight,
  FaTimes,
} from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import withAuth from "@/lib/utils/withAuth";

const Dashboard = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "AI Research Project",
      status: "In Progress",
      badge: "warning",
    },
    {
      id: 2,
      title: "Web Development",
      status: "Active",
      badge: "success",
    },
  ]);

  const [newProject, setNewProject] = useState({
    title: "",
    status: "Active",
  });

  const [selectedProject, setSelectedProject] = useState(null);
  const [file, setFile] = useState(null);
  const [submissionNote, setSubmissionNote] = useState("");

  const handleAddProject = () => {
    if (newProject.title.trim()) {
      setProjects([
        ...projects,
        {
          id: projects.length + 1,
          title: newProject.title,
          status: newProject.status,
          badge: "success",
        },
      ]);
      setNewProject({ title: "", status: "Active" });
    }
  };

  const handleSubmitWork = (projectId) => {
    const project = projects.find((p) => p.id === projectId);
    setSelectedProject(project);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    console.log("Submitting:", {
      projectId: selectedProject.id,
      projectTitle: selectedProject.title,
      fileName: file.name,
      fileSize: (file.size / 1024).toFixed(2) + " KB",
      note: submissionNote,
    });

    alert(`Project "${selectedProject.title}" submitted successfully!`);
    setSelectedProject(null);
    setFile(null);
    setSubmissionNote("");
  };

  const announcements = [
    {
      title: "Final Year Project Submissions",
      type: "New",
      badge: "success",
    },
    {
      title: "Department Meeting",
      type: "Meeting",
      badge: "secondary",
    },
  ];

  const departments = [
    {
      name: "Computer Science",
      icon: <FaLaptopCode />,
      projects: 15,
    },
    {
      name: "Mathematics",
      icon: <FaCalculator />,
      projects: 8,
    },
    {
      name: "Physics",
      icon: <FaAtom />,
      projects: 12,
    },
    {
      name: "Chemistry",
      icon: <FaFlask />,
      projects: 10,
    },
  ];

  const courses = [
    {
      id: 1,
      title: "Advanced Web Development",
      url: "dashboard/courses/web-development",
      code: "CS401",
      progress: 75,
      instructor: "Dr. KHEBABA",
    },
    {
      id: 2,
      title: "Machine Learning Fundamentals",
      url: "dashboard/courses/machine-learning",
      code: "CS402",
      progress: 30,
      instructor: "Prof. Drif",
    },
    {
      id: 3,
      title: "Database Systems",
      url: "dashboard/courses/database-systems",
      code: "CS403",
      progress: 90,
      instructor: "Dr. Toumi",
    },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Welcome back, John!</h1>
      </div>

      <div className="space-y-4">
        <Link
          href={"dashboard/courses"}
          className="flex justify-between items-center"
        >
          <h2 className="text-2xl font-semibold">My Courses</h2>
          <Button variant="outline">
            View All Modules <FaChevronRight className="ml-2" />
          </Button>
        </Link>
        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <p className="text-sm text-gray-500">
                  {course.code} • {course.instructor}
                </p>
              </CardHeader>
              <CardContent>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <Link href={course.url}>
                  <Button variant="outline" className="w-full mt-4">
                    Continue Learning
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Announcements Card */}
        <Card>
          <CardHeader className="flex flex-row items-center space-x-2">
            <FaBell className="w-5 h-5 text-gray-600" />
            <CardTitle>New Announcements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {announcements.map((announcement, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b pb-2 last:border-b-0"
                >
                  <span>{announcement.title}</span>
                  <Badge variant={announcement.badge}>
                    {announcement.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Projects Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-2">
              <FaListAlt className="w-5 h-5 text-gray-600" />
              <CardTitle>Active Projects</CardTitle>
            </div>
            <Dialog>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Project</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="projectName" className="text-right">
                      Project Name
                    </Label>
                    <Input
                      id="projectName"
                      value={newProject.title}
                      onChange={(e) =>
                        setNewProject({ ...newProject, title: e.target.value })
                      }
                      className="col-span-3"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleAddProject}>Add</Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex justify-between items-center border-b pb-2 last:border-b-0"
                >
                  <span>{project.title}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant={project.badge}>{project.status}</Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSubmitWork(project.id)}
                    >
                      <FaUpload className="mr-2" /> Submit Work
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events Card */}
        <Card>
          <CardHeader className="flex flex-row items-center space-x-2">
            <FaCalendarAlt className="w-5 h-5 text-gray-600" />
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">3 events this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Departments Section */}
      <div className="grid md:grid-cols-4 gap-4">
        {departments.map((dept, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="mb-4 text-4xl text-gray-600">{dept.icon}</div>
              <h3 className="font-semibold mb-2">{dept.name}</h3>
              <p className="text-gray-500">{dept.projects} active projects</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Project Submission Modal */}
      {selectedProject && (
        <Dialog
          open={!!selectedProject}
          onOpenChange={() => setSelectedProject(null)}
        >
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                Submit Work for:{" "}
                <span className="text-blue-600">{selectedProject.title}</span>
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="projectFile" className="text-right">
                  Project File
                </Label>
                <Input
                  id="projectFile"
                  type="file"
                  className="col-span-3"
                  onChange={handleFileChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="submissionNote" className="text-right">
                  Notes
                </Label>
                <Input
                  id="submissionNote"
                  placeholder="Any additional notes..."
                  className="col-span-3"
                  value={submissionNote}
                  onChange={(e) => setSubmissionNote(e.target.value)}
                />
              </div>
              {file && (
                <div className="col-span-4 bg-gray-50 p-3 rounded-md">
                  <p className="font-medium">Selected file:</p>
                  <p>
                    {file.name} ({(file.size / 1024).toFixed(2)} KB)
                  </p>
                </div>
              )}
            </div>
            <div className="flex justify-end space-x-2">
              <DialogClose asChild>
                <Button variant="outline">
                  <FaTimes className="mr-2" /> Cancel
                </Button>
              </DialogClose>
              <Button onClick={handleSubmit}>
                <FaUpload className="mr-2" /> Submit
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default withAuth(Dashboard, ["student"]);
