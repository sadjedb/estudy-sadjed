"use client";
import React, { useEffect, useState } from "react";
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
import useModule from "@/hooks/useModule";
const AllModulesPage = () => {
  const [layout, setLayout] = useState("grid");
  const [allModules, setModules] = useState([]);

  const { data: modulesData, loading: modulesLoading } = useModule();

  useEffect(() => {
    if (modulesData) {
      setModules(modulesData.modules);
    }
  }, [modulesData]);

  const getIcon = (code) => {
    switch (code) {
      case "CS":
        return <FaLaptopCode className="text-blue-500" />;
      case "MATH":
        return <FaCalculator className="text-red-500" />;
      case "PHY":
        return <FaAtom className="text-yellow-500" />;
      case "CHEM":
        return <FaFlask className="text-teal-500" />;
      default:
        return <FaBookOpen className="text-gray-500" />;
    }
  };
  console.log(allModules);
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
                  {getIcon(module.code)}
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
                  <Link
                    className="pt-4"
                    href={"/dashboard/courses/" + module.code}
                  >
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
                    <Link href={"/dashboard/courses/" + module.code}>
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
