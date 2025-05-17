"use client";
import useAnnouncements from "@/hooks/useAnnouncements";
import React, { useState } from "react";
import {
  FiLayers,
  FiBook,
  FiCalendar,
  FiAlertTriangle,
  FiGrid,
} from "react-icons/fi";

const DepartmentPage = () => {
  const [activeDept, setActiveDept] = useState("all");
  const {
    loading: loadingAnnouncements,
    data: announcementsData,
    addAnnouncement,
    removeAnnouncement,
  } = useAnnouncements();

  const filteredAnnouncements =
    announcementsData?.announcments
      ?.filter((ann) =>
        activeDept === "all"
          ? ann.department === "all"
          : ann.department === "all" || ann.department === activeDept
      )
      .map((ann) => ({
        id: ann.id,
        title: ann.title,
        date: new Date(ann.datetime).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        urgent: ann.urgent === 1,
        content: ann.content,
      })) || [];

  const departments = {
    all: {
      name: "All Departments",
      icon: <FiGrid className="text-gray-500" />,
    },
    cs: {
      name: "Computer Science",
      icon: <FiLayers className="text-blue-500" />,
    },
    math: {
      name: "Mathematics",
      icon: <FiBook className="text-purple-500" />,
    },
    physics: {
      name: "Physics",
      icon: <FiLayers className="text-green-500" />,
    },
  };

  if (loadingAnnouncements) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-gray-500">Loading announcements...</div>
      </div>
    );
  }

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

          {filteredAnnouncements.map((announcement) => (
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

          {filteredAnnouncements.length === 0 && (
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
