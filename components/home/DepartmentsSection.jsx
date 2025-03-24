import React from "react";
import { FaLaptopCode } from "react-icons/fa";
import { FaSquareRootAlt } from "react-icons/fa";
import { MdScience } from "react-icons/md";
import { GiChemicalDrop } from "react-icons/gi";

const DepartmentsSection = () => {
  const departments = [
    {
      icon: <FaLaptopCode className="w-8 h-8" />,
      title: "Computer Science",
      description:
        "Exploring the frontiers of computing, AI, and software engineering",
    },
    {
      icon: <FaSquareRootAlt className="w-8 h-8" />,
      title: "Mathematics",
      description:
        "Advanced mathematical theories and their real-world applications",
    },
    {
      icon: <MdScience className="w-8 h-8" />,
      title: "Physics",
      description:
        "Understanding the fundamental laws that govern our universe",
    },
    {
      icon: <GiChemicalDrop className="w-8 h-8" />,
      title: "Chemistry",
      description:
        "Innovative research in molecular science and chemical engineering",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 bg-white">
      <h2 className="text-3xl font-bold text-center mb-10">
        Academic Departments
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {departments.map((dept, index) => (
          <div
            key={index}
            className="bg-white  border-[1px] border-[#E5E7EB]  p-6  text-center hover:shadow-md transition-shadow  flex  flex-col  items-center "
          >
            <div className="mb-4 text-gray-700">{dept.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{dept.title}</h3>
            <p className="text-gray-600 text-sm">{dept.description}</p>
            <a
              href="#"
              className="
                mt-4 text-[#374151] hover:text-[#4a5870] font-medium inline-flex  items-center bg:[#F3F4F6] px-4 py-2  transition-colors
              "
            >
              Learn more →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentsSection;
