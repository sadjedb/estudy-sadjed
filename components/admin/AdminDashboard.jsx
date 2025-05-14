"use client";
import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import StudentList from "./Students/StudentList";
import StudentForm from "./Students/StudentForm";
import useStudent from "@/hooks/useStudent";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("students");
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const {
    loading: loadingStudents,
    data: studentsData,
    addStudent,
  } = useStudent();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (studentsData?.students) {
      setStudents(studentsData.students);
    }
  }, [studentsData]);

  useEffect(() => {
    setIsLoading(loadingStudents);
  }, [loadingStudents]);

  const handleAddStudent = async (studentData) => {
    try {
      await addStudent(studentData);
      setShowAddForm(false);
    } catch (error) {
      console.error("Failed to add student:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                Admin Dashboard
              </h1>
            </div>

            {showAddForm ? (
              <StudentForm
                projects={[]}
                setShowAddForm={setShowAddForm}
                handleAddStudent={handleAddStudent}
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
                <StudentList
                  students={students}
                  projects={[]}
                  loading={loadingStudents}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
