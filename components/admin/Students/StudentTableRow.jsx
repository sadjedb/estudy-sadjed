import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import useMarks from "@/hooks/useMarks";

const StudentTableRow = ({ student, projects }) => {
  const [isMarksModalOpen, setIsMarksModalOpen] = useState(false);

  const [marks, setMarks] = useState([]);
  const {
    data: marksData,
    loading: marksLoading,
    statusCode: marksStatusCode,
    addOrUpdateMark,
  } = useMarks(student?.id);
  console.log(student?.id + "marksData", marksData);
  // Use marksData from the hook if available
  useEffect(() => {
    if (marksData?.marks && Array.isArray(marksData?.marks)) {
      setMarks(
        marksData.marks.map((item) => ({
          id: item.mark_id,
          student_module_id: item.student_module_id,
          module_id: item.module_id,
          title: item.title,
          year: item.year,
          score: item.score,
          td_score: item.td_score,
          tp_score: item.tp_score,
        }))
      );
    }
  }, [marksData]);

  const handleMarkChange = (markId, field, value) => {
    setMarks((prev) =>
      prev.map((mark) =>
        mark.student_module_id === markId ? { ...mark, [field]: value } : mark
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Save all marks for this student
    for (const mark of marks) {
      await addOrUpdateMark({
        ...mark,
        student_id: student.id,
        student_module_id: mark.student_module_id,
      });
    }
    setIsMarksModalOpen(false);
  };
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
              {marks.map((mark) => (
                <div key={mark.title} className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">
                    Module: {mark.title || mark.module_id} ({mark.year})
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Exam Mark
                      </label>
                      <input
                        type="number"
                        className="w-full p-2 border rounded"
                        value={mark.score ?? ""}
                        onChange={(e) =>
                          handleMarkChange(
                            mark.student_module_id,
                            "score",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        TD Mark
                      </label>
                      <input
                        type="number"
                        className="w-full p-2 border rounded"
                        value={mark.td_score ?? ""}
                        onChange={(e) =>
                          handleMarkChange(
                            mark.student_module_id,
                            "td_score",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        TP Mark
                      </label>
                      <input
                        type="number"
                        className="w-full p-2 border rounded"
                        value={mark.tp_score ?? ""}
                        onChange={(e) =>
                          handleMarkChange(
                            mark.student_module_id,
                            "tp_score",
                            e.target.value
                          )
                        }
                      />
                    </div>
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
