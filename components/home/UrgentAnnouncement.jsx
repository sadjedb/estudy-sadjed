"use client";
import useAnnouncements from "@/hooks/useAnnouncements";
import React, { useEffect, useState } from "react";
import { FiLayers, FiBook, FiCalendar, FiAlertTriangle } from "react-icons/fi";
const UrgentAnnouncement = () => {
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
  const {
    loading: loadingAnnouncements,
    data: announcementsData,
    addAnnouncement,
    removeAnnouncement,
  } = useAnnouncements();

  const [urgentAnnouncements, setUrgentAnnouncements] = useState([]);
  useEffect(() => {
    if (announcementsData) {
      const urgent = announcementsData.announcments.filter(
        (announcement) => announcement.urgent == 1
      );
      setUrgentAnnouncements(urgent);
    }
  }, [announcementsData]);
  console.log(urgentAnnouncements);

  //   if (loadingAnnouncements) {
  //     return <div>loading</div>;
  //   }
  return (
    <div className=" bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <div className="text-3xl font-bold text-gray-800  justify-center items-center flex gap-2">
            <FiCalendar className="text-blue-500 text-3xl mr-2" />
            <span>Announcements</span>
          </div>
        </div>

        <div className="space-y-6">
          {urgentAnnouncements.map((announcement) => (
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
                {announcement.urgent == 1 && (
                  <span className="flex items-center text-red-500 text-sm">
                    <FiAlertTriangle className="mr-1" /> Urgent
                  </span>
                )}
              </div>
              <p>
                <span className="text-black opacity-75 font-semibold uppercase text-md tracking-wide">
                  {announcement.department}
                </span>
              </p>
              <p className="text-gray-500 text-sm mb-3">
                {announcement.datetime
                  ? (() => {
                      const date = new Date(announcement.datetime);
                      const day = String(date.getDate()).padStart(2, "0");
                      const month = date.toLocaleString("en-GB", {
                        month: "long",
                      });
                      const year = date.getFullYear();
                      return `${day} ${month} ${year}`;
                    })()
                  : ""}
              </p>
              <p className="text-gray-700">{announcement.content}</p>
            </div>
          ))}

          {urgentAnnouncements.length === 0 && (
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

export default UrgentAnnouncement;
