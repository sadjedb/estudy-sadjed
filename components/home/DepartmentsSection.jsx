import React from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaLaptopCode, FaSquareRootAlt } from "react-icons/fa";
import { MdScience } from "react-icons/md";
import { GiChemicalDrop } from "react-icons/gi";
import { ArrowRight } from "lucide-react";

const DepartmentsSection = () => {
  const departments = [
    {
      icon: <FaLaptopCode className="w-10 h-10 text-primary" />,
      title: "Computer Science",
      description:
        "Exploring the frontiers of computing, AI, and software engineering",
      url: "cs",
      bgColor: "bg-primary/10",
    },
    {
      icon: <FaSquareRootAlt className="w-10 h-10 text-amber-600" />,
      title: "Mathematics",
      description:
        "Advanced mathematical theories and their real-world applications",
      url: "math",
      bgColor: "bg-amber-100",
    },
    {
      icon: <MdScience className="w-10 h-10 text-purple-600" />,
      title: "Physics",
      description:
        "Understanding the fundamental laws that govern our universe",
      url: "phys",
      bgColor: "bg-purple-100",
    },
    {
      icon: <GiChemicalDrop className="w-10 h-10 text-green-600" />,
      title: "Chemistry",
      description:
        "Innovative research in molecular science and chemical engineering",
      url: "chem",
      bgColor: "bg-green-100",
    },
  ];

  return (
    <section id="departments" className="w-full pb-8 md:py-20 lg:py-28 ">
      <div className=" px-4 md:px-10">
        <div className="flex flex-col items-center justify-center text-center space-y-6 mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Academic Departments
          </h2>
          <p className="max-w-[700px] text-muted-foreground text-lg">
            Explore our diverse range of academic departments offering
            cutting-edge programs and research opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow group"
            >
              <CardHeader className="pb-4">
                <div
                  className={`${dept.bgColor} w-16 h-16 rounded-lg flex items-center justify-center mb-4`}
                >
                  {dept.icon}
                </div>
                <CardTitle className="text-xl">{dept.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-6">
                  {dept.description}
                </CardDescription>
                <Button
                  asChild
                  variant="link"
                  className="px-0 group-hover:underline"
                >
                  <Link
                    href={`/departments/${dept.url}`}
                    className="flex items-center"
                  >
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DepartmentsSection;
