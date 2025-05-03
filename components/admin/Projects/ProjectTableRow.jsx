import { FiEdit2, FiTrash2 } from "react-icons/fi";

const ProjectTableRow = ({
  project,
  editMode,
  enterEditMode,
  deleteProject,
}) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-medium">{project.title}</div>
        <div className="text-sm text-gray-500">
          {project.description.substring(0, 50)}...
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {project.department.toUpperCase()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {project.spots}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {project.supervisor}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        {editMode.type === "project" && editMode.id === project.id ? (
          <span className="text-gray-500">Editing...</span>
        ) : (
          <>
            <button
              className="text-blue-600 hover:text-blue-900 mr-3"
              onClick={() => enterEditMode("project", project)}
            >
              <FiEdit2 />
            </button>
            <button
              className="text-red-600 hover:text-red-900"
              onClick={() => deleteProject(project.id)}
            >
              <FiTrash2 />
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default ProjectTableRow;
