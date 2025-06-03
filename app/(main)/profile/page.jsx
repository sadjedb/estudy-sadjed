"use client";
import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { FaUser, FaTasks, FaRegBookmark } from "react-icons/fa";
import useWhishlist from "@/hooks/useWhishlist";
import { useSession } from "next-auth/react";
import useStudent from "@/hooks/useStudent";

const Page = () => {
  const session = useSession();
  const { data: studentData, loading: studentLoading, editInfo } = useStudent(session?.data?.user?.id)
  const [projects, setProjects] = useState([]);
  const { data: projectsData, loading: projectsLoading, removeFromWhishlist } = useWhishlist(session?.data?.user?.id);
  useEffect(() => {
    if (projectsData) {
      setProjects(projectsData.wishlist);
    }
  }, [projectsData]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editBio, setEditBio] = useState("");
  const [editContactInfo, setEditContactInfo] = useState("");

  const handleEditClick = () => {
    setEditBio(studentData?.student?.bio || "");
    setEditContactInfo(studentData?.student?.phone || "");
    setIsEditModalOpen(true);
  };

  const handleSave = async () => {
    await editInfo({
      bio: editBio,
      phone: editContactInfo,
    });
    setIsEditModalOpen(false);
  };

  const removeProject = async (projectId) => {
    await removeFromWhishlist(projectId);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div
        className={` ${isEditModalOpen ? "max-w-6xl mx-auto opacity-10" : "max-w-6xl mx-auto"
          } `}
      >
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
              <FaUser className="text-4xl text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    {studentData?.student?.first_name} {studentData?.student?.last_name}
                  </h1>
                  <div className="flex items-center gap-2 text-gray-600 mt-1">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                      {studentData?.student?.department?.toUpperCase()}
                    </span>
                    {/* <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                      {studentData?.student?.year} Year
                    </span> */}
                  </div>
                </div>
                <button
                  onClick={handleEditClick}
                  className="text-blue-600 hover:text-blue-700 px-4 py-2 rounded-lg border border-blue-600 hover:border-blue-700"
                >
                  Edit Profile
                </button>
              </div>
              <p className="text-gray-600 mt-3">{studentData?.student?.bio}</p>
              <div className="mt-3 space-y-1">
                {/* <p className="text-sm text-gray-600">
                  📧 {student.contactInfo.email}
                </p> */}
                <p className="text-sm text-gray-600">
                  📱 {studentData?.student?.phone}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FaRegBookmark className="text-blue-600" />
              Project Wishlist
            </h2>
            <Link
              href={"/projects"}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add New Project
            </Link>
          </div>

          <div className="grid gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors relative"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{project.title}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-600 flex items-center gap-1">
                          <FaTasks className="text-blue-600" />
                          {project.department}
                          {/* <span
                            className={`px-2 py-1 rounded-full text-sm ${project.status === "Idea Stage"
                              ? "bg-yellow-100 text-yellow-600"
                              : project.status === "Planning"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-green-100 text-green-600"
                              }`}
                          >
                            {project.status}
                          </span> */}
                        </span>

                        <span className="text-sm text-gray-600 flex items-center gap-1">
                          <span className="font-medium">Supervisor:</span>{" "}
                          {project.supervisor}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    {/* <div className="flex items-center gap-1">
                      <Calendar className="text-green-600" />
                      <span className="font-bold"> {project.date} </span>
                    </div> */}
                    <button
                      onClick={() => removeProject(project.project_id)}
                      className="ml-3 text-red-500 hover:text-red-700"
                      title="Remove project"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 mt-2">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  rows="4"
                />
              </div>
              {/* <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={editContactInfo.email}
                  onChange={(e) =>
                    setEditContactInfo({
                      ...editContactInfo,
                      email: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div> */}
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  value={editContactInfo}
                  onChange={(e) =>
                    setEditContactInfo(e.target.value)
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
