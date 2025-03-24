"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  FaChevronLeft,
  FaBookOpen,
  FaCalendarAlt,
  FaUserGraduate,
  FaClipboardList,
  FaDownload,
  FaTimes,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

const ModuleDetailPage = ({ params }) => {
  const router = useRouter();
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const moduleData = {
    id: params.id,
    title: "Advanced Web Development",
    code: "CS401",
    instructor: "Dr. Sarah Smith",
    department: "Computer Science",
    credits: 4,
    description:
      "This course covers advanced concepts in modern web development including React, Next.js, and server-side rendering techniques. Students will build complex web applications with a focus on performance and accessibility.",
    syllabus: [
      {
        week: "Week 1: Advanced React Patterns",
        courseFile: "/files/course_week1.pdf",
        tdFile: "/files/td_week1.pdf",
        description:
          "Deep dive into React composition patterns including Higher-Order Components, Render Props, and Hooks.",
      },
      {
        week: "Week 2: State Management with Redux",
        courseFile: "/files/course_week2.pdf",
        tdFile: "/files/td_week2.pdf",
        description:
          "Understanding global state management using Redux toolkit and best practices.",
      },
      {
        week: "Week 3: Next.js Fundamentals",
        courseFile: "/files/course_week3.pdf",
        tdFile: "/files/td_week3.pdf",
        description: "Introduction to Next.js framework and its core features.",
      },
      {
        week: "Week 4: API Routes & Middleware",
        courseFile: "/files/course_week4.pdf",
        tdFile: "/files/td_week4.pdf",
        description: "Building and consuming APIs with Next.js API routes.",
      },
      {
        week: "Week 5: Authentication Strategies",
        courseFile: "/files/course_week5.pdf",
        tdFile: "/files/td_week5.pdf",
        description:
          "Implementing authentication using NextAuth.js and other strategies.",
      },
      {
        week: "Week 6: Performance Optimization",
        courseFile: "/files/course_week6.pdf",
        tdFile: "/files/td_week6.pdf",
        description:
          "Techniques for optimizing React and Next.js applications.",
      },
      {
        week: "Week 7: Testing Strategies",
        courseFile: "/files/course_week7.pdf",
        tdFile: "/files/td_week7.pdf",
        description:
          "Writing tests for React components and Next.js applications.",
      },
      {
        week: "Week 8: Deployment & CI/CD",
        courseFile: "/files/course_week8.pdf",
        tdFile: "/files/td_week8.pdf",
        description:
          "Deploying applications to Vercel and setting up CI/CD pipelines.",
      },
    ],
    schedule: "Mon/Wed 10:00-11:30 AM",
    location: "Computer Science Building, Room 203",

    assessment: [
      { type: "Assignment 1", weight: "15%", due: "Oct 15" },
      { type: "Assignment 2", weight: "20%", due: "Nov 5" },
      { type: "Midterm Exam", weight: "25%", due: "Nov 20" },
      { type: "Final Project", weight: "40%", due: "Dec 15" },
    ],
  };

  const handleWeekClick = (week) => {
    setSelectedWeek(week);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <FaChevronLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{moduleData.title}</h1>
          <p className="text-lg text-gray-600">
            {moduleData.code} • {moduleData.department}
          </p>
        </div>
      </div>

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
            <ul className="space-y-2 border rounded-lg divide-y">
              {moduleData.syllabus.map((item, index) => (
                <li
                  key={index}
                  className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleWeekClick(item)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{item.week}</span>
                    <span className="text-sm text-gray-500">
                      View materials
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center">
              <FaClipboardList className="mr-2 text-purple-500" /> Assessment
            </h2>
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
                  {moduleData.assessment.map((item, index) => (
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
          </section>
        </div>

        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
            <h2 className="text-xl font-semibold flex items-center">
              <FaUserGraduate className="mr-2 text-orange-500" /> Instructor
            </h2>
            <div className="space-y-2">
              <p className="font-medium">{moduleData.instructor}</p>
              <p className="text-sm text-gray-600">
                Professor of Computer Science
              </p>
              <p className="text-sm text-gray-600">Office: CS Building 305</p>
              <p className="text-sm text-gray-600">
                Email: s.smith@university.edu
              </p>
              <p className="text-sm text-gray-600">
                Office Hours: Tue/Thu 2-4 PM
              </p>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
            <h2 className="text-xl font-semibold">Course Details</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Schedule</p>
                <p>{moduleData.schedule}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Location</p>
                <p>{moduleData.location}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Credits</p>
                <p>{moduleData.credits}</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
    </div>
  );
};

export default ModuleDetailPage;
