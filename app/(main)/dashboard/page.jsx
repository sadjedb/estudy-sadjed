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
  FaClipboardList,
  FaUserGraduate,
  FaCalendarAlt,
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
import useMarks from "@/hooks/useMarks";
import { useSession } from "next-auth/react";

const CourseCard = ({ course }) => (
  <Card className="group border border-gray-200 bg-white hover:border-primary/50 hover:shadow-md transition-all duration-300 overflow-hidden">
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent opacity-0  transition-opacity duration-300" />

      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">
            {course.title}
          </CardTitle>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
            {course.code}
          </span>
        </div>
        <CardDescription className="pt-1 text-gray-600">
          <div className="flex items-center gap-1.5">
            <FaUserGraduate className="h-3.5 w-3.5 opacity-70" />
            <span>{course.instructor}</span>
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent className="py-2">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge
            variant="outline"
            className="flex items-center gap-1.5 border-gray-200"
          >
            <FaCalendarAlt className="h-3 w-3 text-gray-500" />
            {course.schedule}
          </Badge>
          <Badge
            variant="outline"
            className="flex items-center gap-1.5 border-gray-200"
          >
            <FaBook className="h-3 w-3 text-gray-500" />
            {course.credits} Credits
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Link href={`/dashboard/courses/${course.code}`} className="w-full z-0">
          <Button className="w-full" variant="outline">
            <div className="flex items-center gap-2">
              <span>Continue Learning</span>
              <FaChevronRight className="h-3.5 w-3.5 opacity-70 group-hover:translate-x-1 transition-transform" />
            </div>
          </Button>
        </Link>
      </CardFooter>
    </div>
  </Card>
);

const Dashboard = () => {
  const session = useSession();
  const [marks, setMarks] = useState([]);
  const {
    data: marksData,
    loading: marksLoading,
    statusCode: marksStatusCode,
  } = useMarks(session?.data?.user?.id);
  console.log(session?.data?.user?.id + "marksData", marksData);
  useEffect(() => {
    if (marksData?.marks && Array.isArray(marksData?.marks)) {
      setMarks(
        marksData.marks.map((item) => ({
          id: item.mark_id,
          student_module_id: item.student_module_id,
          module_id: item.module_id,
          title: item.title,
          year: item.year,
          score: item.score,
          td_score: item.td_score,
          tp_score: item.tp_score,
        }))
      );
    }
  }, [marksData]);
  console.log("Marks:", marks);

  const [projects, setProjects] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [submissionData, setSubmissionData] = useState({
    file: null,
    note: "",
  });

  const formatGrade = (score) => {
    if (typeof score !== "number") return "N/A";
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
  const getProjectStatusColor = (status) => {
    switch (status) {
      case "in progress":
        return {
          bg: "bg-blue-100/80",
          text: "text-blue-600",
          badge: "bg-blue-100 text-blue-800",
        };
      case "pending review":
        return {
          bg: "bg-amber-100/80",
          text: "text-amber-600",
          badge: "bg-amber-100 text-amber-800",
        };
      case "completed":
        return {
          bg: "bg-green-100/80",
          text: "text-green-600",
          badge: "bg-green-100 text-green-800",
        };
      default:
        return {
          bg: "bg-gray-100/80",
          text: "text-gray-600",
          badge: "bg-gray-100 text-gray-800",
        };
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 50) return "bg-blue-500";
    if (progress >= 30) return "bg-amber-500";
    return "bg-red-500";
  };

  const getGradeColor = (percentage) => {
    if (percentage >= 85)
      return {
        bg: "bg-green-100",
        text: "text-green-700",
        progress: "bg-green-500",
      };
    if (percentage >= 70)
      return {
        bg: "bg-blue-100",
        text: "text-blue-700",
        progress: "bg-blue-500",
      };
    if (percentage >= 50)
      return {
        bg: "bg-amber-100",
        text: "text-amber-700",
        progress: "bg-amber-500",
      };
    return {
      bg: "bg-red-100",
      text: "text-red-700",
      progress: "bg-red-500",
    };
  };

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
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-blue-100/80">
              <FaBell className="w-5 h-5 text-gray-600" />
            </div>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Announcements
            </CardTitle>
          </div>
          <Badge
            variant="outline"
            className="border-blue-200 bg-gray-100/50 text-gray-600"
          >
            {announcements.length} New
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="group relative p-3 rounded-lg bg-white/90 backdrop-blur-sm border border-gray-100 hover:border-gray-200 transition-all duration-200 cursor-pointer hover:shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {announcement.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {announcement.content}
                  </p>
                </div>
                {announcement.urgent === 1 && (
                  <Badge
                    variant="destructive "
                    className="ml-2 flex-shrink-0 !bg-red-100 !text-red-800 !border-red-200"
                  >
                    Urgent
                  </Badge>
                )}
              </div>
              <div className="flex items-center mt-2 space-x-2">
                <span className="text-xs text-gray-400">
                  {new Date(announcement.datetime).toLocaleDateString()}
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </div>
          ))}
        </CardContent>
        <CardFooter className="pt-0">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-gray-800 w-full hover:bg-blue-50"
          >
            View All Announcements
            <FaChevronRight className="ml-1 h-3 w-3" />
          </Button>
        </CardFooter>
      </Card>
    ),
    projects: (
      <Card className="shadow-sm hover:shadow-md transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg ">
              <FaListAlt className="w-5 h-5 text-gray-600" />
            </div>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Active Projects
            </CardTitle>
          </div>
          <Badge
            variant="outline"
            className="border-gray-200 bg-gray-100/50 text-gray-600"
          >
            {projects.length} Ongoing
          </Badge>
        </CardHeader>

        <CardContent className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative p-4 rounded-xl bg-white/90 backdrop-blur-sm border border-gray-100 hover:border-gray-200 transition-all duration-200 cursor-pointer hover:shadow-xs"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div
                    className={`p-3 rounded-lg ${
                      getProjectStatusColor(project.status).bg
                    }`}
                  >
                    <FaBook
                      className={`w-5 h-5 ${
                        getProjectStatusColor(project.status).text
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  className="group-hover:bg-gray-50 group-hover:border-gray-200 group-hover:text-gray-600 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSubmitWork(project.id);
                  }}
                >
                  <FaUpload className="mr-2 h-3.5 w-3.5" />
                  Submit Work
                </Button>
              </div>

              {project.progress && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${getProgressColor(
                        project.progress
                      )}`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </div>
          ))}
        </CardContent>

        <CardFooter className="pt-0">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-gray-800 w-full hover:bg-gray-50"
          >
            View All Projects
            <FaChevronRight className="ml-1 h-3.5 w-3.5" />
          </Button>
        </CardFooter>
      </Card>
    ),
    grades: (
      <Card className="border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gray-100">
              <FaChartLine className="w-5 h-5 text-gray-600" />
            </div>
            <CardTitle className="text-lg font-semibold text-gray-800">
              My Exam Grades
            </CardTitle>
          </div>
          <Link href="/dashboard/grades">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700"
            >
              View Full Transcript
              <FaChevronRight className="ml-1.5 h-3 w-3" />
            </Button>
          </Link>
        </CardHeader>

        <CardContent className="space-y-4">
          {marks.slice(0, 2).map((exam) => {
            const gradePercentage = (exam.score / 20) * 100;
            return (
              <div
                key={exam.id}
                className="group relative p-4 rounded-xl border border-gray-100 hover:border-gray-200 bg-white transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        getGradeColor(gradePercentage).bg
                      }`}
                    >
                      <FaClipboardList
                        className={`w-5 h-5 ${
                          getGradeColor(gradePercentage).text
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {exam.title}
                      </h3>
                      <p className="text-sm text-gray-500">Final Exam</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div
                      className={`text-xl font-bold ${
                        getGradeColor(gradePercentage).text
                      }`}
                    >
                      {formatGrade(exam.score)}
                    </div>
                    <div className="text-gray-400">/ 20</div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
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
    <div className="container mx-auto p-4 sm:p-6 md:p-8 space-y-6 w-full min-h-screen">
      <header className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h1 className="text-2xl sm:text-3xl font-bold">Welcome back ! </h1>
      </header>
      <div className="space-y-8">
        <div>{dashboardSections.courses}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardSections.announcements}
          {dashboardSections.projects}
          {dashboardSections.grades}
        </div>
        {dashboardSections.departments}
        {dashboardSections.projectSubmissionModal}
      </div>
    </div>
  );
};

export default withAuth(Dashboard, ["student"]);
