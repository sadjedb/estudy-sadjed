import { useState } from "react";
import { Button } from "@/components/ui/button";

const StudentTableRow = ({ student, projects }) => {
  const [isMarksModalOpen, setIsMarksModalOpen] = useState(false);

  const [marks, setMarks] = useState({
    MATH: { td: "", tp: "", project: "", exam: "" },
    PHYSICS: { td: "", tp: "", project: "", exam: "" },
    INFO: { tp: "", project: "", exam: "" },
  });

  const handleMarkChange = (module, field, value) => {
    setMarks((prev) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Marks submitted:", marks);
    alert("Marks submitted successfully!");
    setIsMarksModalOpen(false);
  };
  console.log("Student data:", student);
  return (
    <>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
          <div className="">{student.id}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="font-medium">{student.first_name}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="font-medium">{student.last_name}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {student.email}
        </td>
        <td className="py-4 whitespace-nowrap text-sm text-gray-500">
          {student.department?.toUpperCase()}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          Group1
        </td>
        <td className="px-6 py-4">
          <div className="flex flex-wrap gap-2">
            {student.wishlist_projects?.map((project, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {project.title}
              </span>
            ))}
            {!student.wishlist_projects?.length && (
              <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                No projects in wishlist
              </span>
            )}
          </div>
        </td>
        <td className="py-4 whitespace-nowrap text-sm flex text-gray-500 gap-2">
          <Button
            variant={"secondaryButton"}
            size={"SecondaryButtonSize"}
            onClick={() => setIsMarksModalOpen(true)}
          >
            Add Marks
          </Button>
        </td>
      </tr>

      {isMarksModalOpen && (
        <div className="fixed inset-0 bg-white border-[1px]  bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Student Marks</h2>
            <form onSubmit={handleSubmit}>
              {Object.entries(marks).map(([module, scores]) => (
                <div key={module} className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">{module}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {scores.td !== undefined && (
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          TD Mark
                        </label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={scores.td}
                          onChange={(e) =>
                            handleMarkChange(module, "td", e.target.value)
                          }
                        />
                      </div>
                    )}
                    {scores.tp !== undefined && (
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          TP Mark
                        </label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={scores.tp}
                          onChange={(e) =>
                            handleMarkChange(module, "tp", e.target.value)
                          }
                        />
                      </div>
                    )}
                    {scores.project !== undefined && (
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Project Mark
                        </label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={scores.project}
                          onChange={(e) =>
                            handleMarkChange(module, "project", e.target.value)
                          }
                        />
                      </div>
                    )}
                    {scores.exam !== undefined && (
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Exam Mark
                        </label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={scores.exam}
                          onChange={(e) =>
                            handleMarkChange(module, "exam", e.target.value)
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <div className="mt-6 flex justify-end gap-3">
                <Button
                  type="button"
                  variant="secondaryButton"
                  onClick={() => setIsMarksModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="mainButton">
                  Save Marks
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentTableRow;
