"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  FaBell,
  FaBook,
  FaUpload,
  FaChevronRight,
  FaTimes,
  FaListAlt,
  FaChartLine,
  FaLaptopCode,
  FaCalculator,
  FaAtom,
  FaFlask,
} from "react-icons/fa";
import Link from "next/link";
import withAuth from "@/lib/utils/withAuth";
import useProject from "@/hooks/useProject";
import useAnnouncements from "@/hooks/useAnnouncements";
import useModule from "@/hooks/useModule";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const DEPARTMENTS = [
  { name: "Computer Science", icon: <FaLaptopCode />, projects: 15 },
  { name: "Mathematics", icon: <FaCalculator />, projects: 8 },
  { name: "Physics", icon: <FaAtom />, projects: 12 },
  { name: "Chemistry", icon: <FaFlask />, projects: 10 },
];

const CourseCard = ({ course }) => (
  <Card className="group transition-all hover:shadow-lg hover:border-primary">
    <CardHeader>
      <CardTitle className="text-lg">{course.title}</CardTitle>
      <CardDescription className="flex justify-between">
        <span>{course.code}</span>
        <span className="font-medium">{course.instructor}</span>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="mt-4">
        <div className="flex justify-between mb-1 text-sm text-muted-foreground">
          <span>Progress</span>
          <span>{33}%</span>
        </div>
        <Progress value={33} className="h-2" />
      </div>
    </CardContent>
    <CardFooter>
      <Link href={`dashboard/courses/${course.code}`} className="w-full">
        <Button className="w-full" variant="outline">
          Continue Learning
        </Button>
      </Link>
    </CardFooter>
  </Card>
);

const DepartmentCard = ({ department }) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardContent className="pt-6 flex flex-col items-center text-center">
      <div className="mb-4 text-4xl text-gray-600">{department.icon}</div>
      <h3 className="font-semibold mb-2">{department.name}</h3>
      <p className="text-gray-500">{department.projects} active projects</p>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [submissionData, setSubmissionData] = useState({
    file: null,
    note: "",
  });

  const examGrades = [
    {
      id: 1,
      course: "Machine Learning",
      examType: "Final Exam",
      score: 14,
    },
    {
      id: 2,
      course: "Database Systems",
      examType: "Final Exam",
      score: 18,
    },
    {
      id: 3,
      course: "Algorithms",
      examType: "Midterm",
      score: 16,
    },
  ];

  const formatGrade = (score) => {
    return Number.isInteger(score) ? score : score.toFixed(1);
  };

  const {
    data: projectsData,
    loading: projectsLoading,
    error: projectsError,
  } = useProject();
  const {
    data: announcementsData,
    loading: announcementsLoading,
    error: announcementsError,
  } = useAnnouncements();
  const {
    data: modulesData,
    loading: modulesLoading,
    error: modulesError,
  } = useModule();

  console.log("Projects Data:", projectsData);
  console.log("Announcements Data:", announcementsData);
  console.log("Modules Data:", modulesData);
  useEffect(() => {
    if (projectsData?.projects) {
      setProjects(projectsData.projects.slice(0, 3));
    }
  }, [projectsData]);

  useEffect(() => {
    if (announcementsData?.announcments) {
      setAnnouncements(announcementsData.announcments.slice(0, 4));
    }
  }, [announcementsData]);

  useEffect(() => {
    if (modulesData?.modules) {
      setCourses(modulesData.modules.slice(0, 3));
    }
  }, [modulesData]);

  const handleSubmitWork = useCallback(
    (projectId) => {
      const project = projects.find((p) => p.id === projectId);
      setSelectedProject(project);
    },
    [projects]
  );

  const handleFileChange = useCallback((e) => {
    setSubmissionData((prev) => ({ ...prev, file: e.target.files[0] }));
  }, []);

  const handleNoteChange = useCallback((e) => {
    setSubmissionData((prev) => ({ ...prev, note: e.target.value }));
  }, []);

  const handleSubmit = useCallback(() => {
    if (!submissionData.file) {
      alert("Please select a file to upload");
      return;
    }

    console.log("Project submission:", {
      projectId: selectedProject.id,
      fileName: submissionData.file.name,
      fileSize: `${(submissionData.file.size / 1024).toFixed(2)} KB`,
      note: submissionData.note,
    });

    alert(`Project "${selectedProject.title}" submitted successfully!`);
    setSelectedProject(null);
    setSubmissionData({ file: null, note: "" });
  }, [selectedProject, submissionData]);

  const closeModal = useCallback(() => {
    setSelectedProject(null);
    setSubmissionData({ file: null, note: "" });
  }, []);

  if (projectsLoading || announcementsLoading || modulesLoading) {
    return (
      <div className="container mx-auto p-6 text-center">
        Loading dashboard...
      </div>
    );
  }
  if (projectsError || announcementsError || modulesError) {
    return (
      <div className="container mx-auto p-6 text-center text-destructive">
        Error loading dashboard data. Please try again later.
      </div>
    );
  }
  const dashboardSections = {
    courses: (
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-primary">My Courses</h2>
          <Link href="dashboard/courses">
            <Button
              variant="outline"
              className="text-primary hover:text-primary"
            >
              View All Modules <FaChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    ),
    announcements: (
      <Card>
        <CardHeader className="flex flex-row items-center space-x-2">
          <FaBell className="w-5 h-5 text-gray-600" />
          <CardTitle>New Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="flex justify-between items-center border-b pb-2 last:border-b-0"
              >
                <span>{announcement.title}</span>
                {announcement.urgent && (
                  <Badge variant="destructive">Urgent</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    ),
    projects: (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="flex items-center gap-2">
            <FaListAlt className="text-muted-foreground" />
            <span>Active Projects</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <FaBook className="text-primary h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{project.title}</p>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleSubmitWork(project.id)}
              >
                <FaUpload className="mr-2 h-4 w-4" /> Submit
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    ),
    grades: (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="flex items-center gap-2">
            <FaChartLine className="text-muted-foreground" />
            <span>My Exam Grades</span>
          </CardTitle>
          <Link href="/dashboard/grades">
            <Button variant="outline" size="sm">
              View Full Transcript <FaChevronRight className="ml-1" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="space-y-4">
          {examGrades.slice(0, 2).map((exam) => {
            return (
              <div
                key={exam.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div>
                    <h3 className="font-medium">{exam.course}</h3>
                    <p className="text-sm text-muted-foreground">
                      {exam.examType}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xl font-bold">
                    {formatGrade(exam.score)}
                  </div>
                  <div className="text-muted-foreground">/ 20</div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    ),

    projectSubmissionModal: (
      <Dialog open={!!selectedProject} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              Submit Work for:{" "}
              <span className="text-blue-600">{selectedProject?.title}</span>
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
              <Textarea
                id="submissionNote"
                placeholder="Any additional notes..."
                className="col-span-3"
                value={submissionData.note}
                onChange={handleNoteChange}
              />
            </div>
            {submissionData.file && (
              <div className="col-span-4 bg-gray-50 p-3 rounded-md">
                <p className="font-medium">Selected file:</p>
                <p>
                  {submissionData.file.name} (
                  {(submissionData.file.size / 1024).toFixed(2)} KB)
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
    ),
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Welcome back, John!</h1>
      </header>
      {[
        <React.Fragment key="courses">
          {dashboardSections.courses}
        </React.Fragment>,
        <div className="grid md:grid-cols-3 gap-6" key="cards">
          {dashboardSections.announcements}
          {dashboardSections.projects}
          {dashboardSections.grades}
        </div>,
        <React.Fragment key="departments">
          {dashboardSections.departments}
        </React.Fragment>,
        <React.Fragment key="modal">
          {dashboardSections.projectSubmissionModal}
        </React.Fragment>,
      ]}
    </div>
  );
};

export default withAuth(Dashboard, ["student"]);
