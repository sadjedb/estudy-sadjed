"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  FaChevronLeft,
  FaBookOpen,
  FaCalendarAlt,
  FaUserGraduate,
  FaClipboardList,
  FaDownload,
  FaTimes,
  FaSpinner,
} from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

const LoadingSkeleton = () => (
  <div className="container mx-auto p-6 space-y-8">
    <div className="flex items-center space-x-4">
      <div className="h-10 w-10 bg-gray-200 rounded-full" />
      <div className="space-y-2">
        <div className="h-8 w-64 bg-gray-200 rounded" />
        <div className="h-4 w-48 bg-gray-200 rounded" />
      </div>
    </div>
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="h-8 w-48 bg-gray-200 rounded" />
            <div className="h-32 bg-gray-200 rounded-lg" />
          </div>
        ))}
      </div>
      <div className="space-y-8">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="h-48 bg-gray-200 rounded-lg" />
        ))}
      </div>
    </div>
  </div>
);

const ModuleHeader = ({ title, code, department }) => (
  <div className="flex items-center space-x-4">
    <Button variant="outline" size="icon" onClick={() => window.history.back()}>
      <FaChevronLeft className="h-4 w-4" />
    </Button>
    <div>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-lg text-gray-600">
        {code} • {department}
      </p>
    </div>
  </div>
);

const SyllabusList = ({ syllabus, onItemClick }) => (
  <ul className="space-y-2 border rounded-lg divide-y">
    {syllabus.map((item, index) => (
      <li
        key={index}
        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
        onClick={() => onItemClick(item)}
      >
        <div className="flex justify-between items-center">
          <span className="font-medium">{item.week}</span>
          <span className="text-sm text-gray-500">View materials</span>
        </div>
      </li>
    ))}
  </ul>
);

const AssessmentTable = ({ assessments }) => (
  <div className="border rounded-lg overflow-hidden">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Type
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Weight
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Due Date
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {assessments.map((item, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {item.type}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {item.weight}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {item.due}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const InstructorPanel = ({
  instructor,
  instructorTitle,
  office,
  email,
  officeHours,
}) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
    <h2 className="text-xl font-semibold flex items-center">
      <FaUserGraduate className="mr-2 text-orange-500" /> Instructor
    </h2>
    <div className="space-y-2">
      <p className="font-medium">{instructor}</p>
      <p className="text-sm text-gray-600">{instructorTitle}</p>
      <p className="text-sm text-gray-600">Office: {office}</p>
      <p className="text-sm text-gray-600">Email: {email}</p>
      <p className="text-sm text-gray-600">Office Hours: {officeHours}</p>
    </div>
  </div>
);

const CourseDetailsCard = ({ schedule, location, credits }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
    <h2 className="text-xl font-semibold">Course Details</h2>
    <div className="space-y-3">
      <div>
        <p className="text-sm font-medium text-gray-500">Schedule</p>
        <p>{schedule}</p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">Location</p>
        <p>{location}</p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">Credits</p>
        <p>{credits}</p>
      </div>
    </div>
  </div>
);

const MaterialsDialog = ({ isOpen, onClose, selectedWeek }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle className="text-xl">{selectedWeek?.week}</DialogTitle>
        <p className="text-sm text-gray-600">{selectedWeek?.description}</p>
      </DialogHeader>

      {selectedWeek && (
        <div className="space-y-6 py-4">
          <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <h3 className="font-medium mb-3 flex items-center">
              <FaBookOpen className="mr-2 text-blue-500" /> Course Materials
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  Lecture slides and notes
                </p>
                <p className="text-xs text-gray-500 mt-1">PDF • ~2.4MB</p>
              </div>
              <a
                href={selectedWeek.courseFile}
                download
                className="text-blue-600 hover:text-blue-800 flex items-center px-4 py-2 rounded bg-blue-50 hover:bg-blue-100"
              >
                <FaDownload className="mr-2" /> Download
              </a>
            </div>
          </div>

          <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <h3 className="font-medium mb-3 flex items-center">
              <FaClipboardList className="mr-2 text-green-500" /> TD/TP
              Materials
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  Tutorial exercises and practical work
                </p>
                <p className="text-xs text-gray-500 mt-1">PDF • ~1.8MB</p>
              </div>
              <a
                href={selectedWeek.tdFile}
                download
                className="text-blue-600 hover:text-blue-800 flex items-center px-4 py-2 rounded bg-blue-50 hover:bg-blue-100"
              >
                <FaDownload className="mr-2" /> Download
              </a>
            </div>
          </div>

          <div className="pt-4 border-t">
            <DialogClose asChild>
              <Button variant="outline" className="w-full">
                <FaTimes className="mr-2" /> Close
              </Button>
            </DialogClose>
          </div>
        </div>
      )}
    </DialogContent>
  </Dialog>
);

const ModuleDetailPage = ({ params }) => {
  const router = useRouter();
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [moduleData, setModuleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModuleData = async () => {
      try {
        // Mock data - replace with actual API call
        const mockData = {
          id: params.id,
          title: "Advanced Web Development",
          code: "CS401",
          instructor: "Dr. Sarah Smith",
          department: "Computer Science",
          credits: 4,
          description:
            "This course covers advanced concepts in modern web development including React, Next.js, and server-side rendering techniques.",
          syllabus: [
            {
              week: "Week 1: Advanced React Patterns",
              courseFile: "/files/course_week1.pdf",
              tdFile: "/files/td_week1.pdf",
              description:
                "Deep dive into React composition patterns including Higher-Order Components, Render Props, and Hooks.",
            },
            // ... rest of the syllabus items
          ],
          schedule: "Mon/Wed 10:00-11:30 AM",
          location: "Computer Science Building, Room 203",
          assessment: [
            { type: "Assignment 1", weight: "15%", due: "Oct 15" },
            // ... rest of the assessment items
          ],
          instructorTitle: "Professor of Computer Science",
          office: "CS Building 305",
          email: "s.smith@university.edu",
          officeHours: "Tue/Thu 2-4 PM",
        };

        setModuleData(mockData);
        // In a real app:
        // const response = await fetch(`/api/modules/${params.id}`);
        // const data = await response.json();
        // setModuleData(data);
      } catch (err) {
        setError(err.message || "Failed to load module");
      } finally {
        setLoading(false);
      }
    };

    fetchModuleData();
  }, [params.id]);

  const handleWeekClick = (week) => {
    setSelectedWeek(week);
    setIsDialogOpen(true);
  };

  if (loading) return <LoadingSkeleton />;
  if (error) {
    return (
      <div className="container mx-auto p-6 text-center">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">
          <p className="font-medium">{error}</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => router.push("/")}
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  if (!moduleData) return null;

  return (
    <div className="container mx-auto p-6 space-y-8">
      <ModuleHeader
        title={moduleData.title}
        code={moduleData.code}
        department={moduleData.department}
      />

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center">
              <FaBookOpen className="mr-2 text-blue-500" /> Description
            </h2>
            <p className="text-gray-700">{moduleData.description}</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center">
              <FaCalendarAlt className="mr-2 text-green-500" /> Syllabus
            </h2>
            <SyllabusList
              syllabus={moduleData.syllabus}
              onItemClick={handleWeekClick}
            />
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center">
              <FaClipboardList className="mr-2 text-purple-500" /> Assessment
            </h2>
            <AssessmentTable assessments={moduleData.assessment} />
          </section>
        </div>

        <div className="space-y-8">
          <InstructorPanel
            instructor={moduleData.instructor}
            instructorTitle={moduleData.instructorTitle}
            office={moduleData.office}
            email={moduleData.email}
            officeHours={moduleData.officeHours}
          />
          <CourseDetailsCard
            schedule={moduleData.schedule}
            location={moduleData.location}
            credits={moduleData.credits}
          />
        </div>
      </div>

      <MaterialsDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        selectedWeek={selectedWeek}
      />
    </div>
  );
};

export default ModuleDetailPage;
