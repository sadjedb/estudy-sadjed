"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FaLaptopCode,
  FaCalculator,
  FaAtom,
  FaFlask,
  FaBookOpen,
  FaChevronLeft,
  FaTh,
  FaList,
} from "react-icons/fa";
import Link from "next/link";
import withAuth from "@/lib/utils/withAuth";
const AllModulesPage = () => {
  const [layout, setLayout] = useState("grid");

  const allModules = [
    {
      id: 1,
      url: "courses/web-development",
      title: "Advanced Web Development",
      code: "CS401",
      instructor: "Dr. Smith",
      department: "Computer Science",
      credits: 4,
      icon: <FaLaptopCode className="text-blue-500" />,
      description:
        "Advanced concepts in modern web development frameworks and architectures.",
    },
    {
      id: 2,
      url: "courses/machine-learning",
      title: "Machine Learning Fundamentals",
      code: "CS402",
      instructor: "Prof. Johnson",
      department: "Computer Science",
      credits: 4,
      icon: <FaLaptopCode className="text-blue-500" />,
      description:
        "Introduction to machine learning algorithms and their applications.",
    },
    {
      id: 3,
      url: "courses/database-systems",
      title: "Database Systems",
      code: "CS403",
      instructor: "Dr. Williams",
      department: "Computer Science",
      credits: 3,
      icon: <FaLaptopCode className="text-blue-500" />,
      description: "Design and implementation of database management systems.",
    },
    {
      id: 4,
      url: "courses/advanced-calculus",
      title: "Advanced Calculus",
      code: "MATH401",
      instructor: "Dr. Brown",
      department: "Mathematics",
      credits: 4,
      icon: <FaCalculator className="text-red-500" />,
      description: "Advanced topics in differential and integral calculus.",
    },
    {
      id: 5,
      url: "courses/quantum-mechanics",
      title: "Quantum Mechanics",
      code: "PHY401",
      instructor: "Dr. Davis",
      department: "Physics",
      credits: 4,
      icon: <FaAtom className="text-yellow-500" />,
      description: "Fundamental principles of quantum theory and applications.",
    },
    {
      id: 6,
      url: "courses/organic-chemistry",
      title: "Organic Chemistry",
      code: "CHEM401",
      instructor: "Dr. Wilson",
      department: "Chemistry",
      credits: 4,
      icon: <FaFlask className="text-teal-500" />,
      description: "Structure, properties, and reactions of organic compounds.",
    },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href={"/dashboard"}>
            <Button variant="outline" size="icon">
              <FaChevronLeft className="h-4 w-4" />
            </Button>
          </Link>

          <h1 className="text-3xl font-bold">All Modules</h1>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={layout === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setLayout("grid")}
          >
            <FaTh className="h-4 w-4" />
          </Button>
          <Button
            variant={layout === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setLayout("list")}
          >
            <FaList className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {layout === "grid" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allModules.map((module) => (
            <Card
              key={module.id}
              className="hover:shadow-lg transition-shadow h-full"
            >
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                  <p className="text-sm text-gray-500">{module.code}</p>
                </div>
                <div className="rounded-full p-3 bg-gray-100">
                  {module.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">{module.description}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Instructor:</span>
                    <span>{module.instructor}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Department:</span>
                    <span>{module.department}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Credits:</span>
                    <span>{module.credits}</span>
                  </div>
                  De
                  <Link className="pt-4" href={module.url}>
                    <Button variant="outline" className="w-full">
                      <FaBookOpen className="mr-2" /> View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {layout === "list" && (
        <div className="space-y-4">
          {allModules.map((module) => (
            <Card key={module.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="rounded-full p-3 bg-gray-100">
                      {module.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{module.title}</h3>
                      <p className="text-sm text-gray-500">{module.code}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {module.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
                    <div className="text-sm">
                      <p className="text-gray-500">Instructor</p>
                      <p>{module.instructor}</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-gray-500">Department</p>
                      <p>{module.department}</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-gray-500">Credits</p>
                      <p>{module.credits}</p>
                    </div>
                    <Link href={module.url}>
                      <Button variant="outline" className="md:ml-4">
                        <FaBookOpen className="mr-2" /> Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default withAuth(AllModulesPage, ["admin", "student"]);
