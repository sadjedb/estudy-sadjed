"use client";
import React, { useState } from "react";
import { FiLayers, FiBook, FiCalendar, FiAlertTriangle } from "react-icons/fi";
//y7atohom les admin mn admin dashboard
const DepartmentPage = () => {
  const [activeDept, setActiveDept] = useState("cs");

  const departments = {
    cs: {
      name: "Computer Science",
      icon: <FiLayers className="text-blue-500" />,
      announcements: [
        {
          id: 1,
          title: "Final Project Submission Deadline Extended",
          date: "June 5, 2024",
          urgent: true,
          content:
            "The deadline for final project submissions has been extended to June 15th due to technical issues with the submission portal.",
        },
        {
          id: 2,
          title: "New Computer Lab Opening",
          date: "May 28, 2024",
          urgent: false,
          content:
            "The new AI research lab in Building C will open next Monday with state-of-the-art GPU workstations.",
        },
        {
          id: 3,
          title: "Summer Internship Opportunities",
          date: "May 20, 2024",
          urgent: false,
          content:
            "Local tech companies are offering summer internships for CS students. Applications due by June 1st.",
        },
      ],
    },
    math: {
      name: "Mathematics",
      icon: <FiBook className="text-purple-500" />,
      announcements: [
        {
          id: 1,
          title: "Advanced Calculus Exam Schedule",
          date: "June 10, 2024",
          urgent: true,
          content:
            "The final exam for Advanced Calculus will be held on June 15th from 9AM-12PM in the Main Auditorium.",
        },
        {
          id: 2,
          title: "Mathematics Symposium",
          date: "June 5, 2024",
          urgent: false,
          content:
            "Annual department symposium featuring guest speakers from MIT and Cambridge University.",
        },
      ],
    },
    physics: {
      name: "Physics",
      icon: <FiLayers className="text-green-500" />,
      announcements: [
        {
          id: 1,
          title: "Quantum Physics Lab Maintenance",
          date: "June 1, 2024",
          urgent: true,
          content:
            "The quantum lab will be closed June 3-7 for annual equipment maintenance and upgrades.",
        },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Department Announcements
          </h1>
          <p className="text-gray-600">
            Stay updated with the latest news from your department
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {Object.entries(departments).map(([key, dept]) => (
            <button
              key={key}
              onClick={() => setActiveDept(key)}
              className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                activeDept === key
                  ? "bg-white shadow-md text-blue-600 border border-blue-200"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              <span className="mr-2">{dept.icon}</span>
              {dept.name}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          <div className="flex items-center mb-4">
            <FiCalendar className="text-blue-500 text-xl mr-2" />
            <h2 className="text-2xl font-semibold">
              {departments[activeDept].name} Announcements
            </h2>
          </div>

          {departments[activeDept].announcements.map((announcement) => (
            <div
              key={announcement.id}
              className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${
                announcement.urgent ? "border-red-500" : "border-blue-500"
              }`}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-medium mb-2">
                  {announcement.title}
                </h3>
                {announcement.urgent && (
                  <span className="flex items-center text-red-500 text-sm">
                    <FiAlertTriangle className="mr-1" /> Urgent
                  </span>
                )}
              </div>
              <p className="text-gray-500 text-sm mb-3">{announcement.date}</p>
              <p className="text-gray-700">{announcement.content}</p>
            </div>
          ))}

          {departments[activeDept].announcements.length === 0 && (
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <p className="text-gray-500">
                No announcements available for this department
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentPage;
