"use client";
import { FiSave, FiX } from "react-icons/fi";
import { useEffect } from "react";

const ProjectForm = ({
  editMode,
  editForm,
  newProject,
  setEditForm,
  setNewProject,
  saveEdit,
  exitEditMode,
  handleAddProject,
}) => {
  useEffect(() => {
    if (!editMode.type && editMode.id === null) {
      setNewProject({
        title: "",
        description: "",
        department: "cs",
        spots: 1,
        supervisor: "",
      });
    }
  }, [editMode, setNewProject]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === "number" ? parseInt(value) || 0 : value;

    if (editMode.type === "project") {
      setEditForm({ ...editForm, [name]: val });
    } else {
      setNewProject({ ...newProject, [name]: val });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">
        {editMode.type === "project" ? "Edit Project" : "Add New Project"}
      </h2>
      <form
        onSubmit={editMode.type === "project" ? saveEdit : handleAddProject}
        className="space-y-4"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              name="title"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={
                editMode.type === "project" ? editForm.title : newProject.title
              }
              onChange={handleChange}
              required
              minLength={5}
              maxLength={100}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department *
            </label>
            <select
              name="department"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={
                editMode.type === "project"
                  ? editForm.department
                  : newProject.department
              }
              onChange={handleChange}
              required
            >
              <option value="cs">Computer Science</option>
              <option value="math">Mathematics</option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            name="description"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            value={
              editMode.type === "project"
                ? editForm.description
                : newProject.description
            }
            onChange={handleChange}
            required
            minLength={20}
            maxLength={500}
          />
          <p className="text-xs text-gray-500 mt-1">Minimum 20 characters</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Available Spots *
            </label>
            <input
              type="number"
              name="spots"
              min="1"
              max="20"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={
                editMode.type === "project" ? editForm.spots : newProject.spots
              }
              onChange={handleChange}
              required
            />
            <p className="text-xs text-gray-500 mt-1">Between 1-20</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Supervisor *
            </label>
            <input
              type="text"
              name="supervisor"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={
                editMode.type === "project"
                  ? editForm.supervisor
                  : newProject.supervisor
              }
              onChange={handleChange}
              required
              minLength={3}
              maxLength={50}
            />
            <p className="text-xs text-gray-500 mt-1">Full name or title</p>
          </div>
        </div>

        <div className="flex space-x-3 pt-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center transition-colors duration-200"
          >
            <FiSave className="inline mr-2" />
            {editMode.type === "project" ? "Save Changes" : "Add Project"}
          </button>
          {editMode.type === "project" && (
            <button
              type="button"
              onClick={exitEditMode}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 flex items-center transition-colors duration-200"
            >
              <FiX className="inline mr-2" />
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
