import { FiEdit2, FiTrash2 } from "react-icons/fi";

const AnnouncementItem = ({
  announcement,
  editMode,
  enterEditMode,
  deleteAnnouncement,
}) => {
  return (
    <div
      className={`p-4 border rounded-lg ${
        announcement.urgent ? "border-red-300 bg-red-50" : "border-gray-200"
      }`}
    >
      {editMode.type === "announcement" && editMode.id === announcement.id ? (
        <div className="text-sm text-gray-500 mb-2">Editing...</div>
      ) : (
        <>
          <div className="flex justify-between">
            <h3 className="font-medium">{announcement.title}</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => enterEditMode("announcement", announcement)}
                className="text-blue-500 hover:text-blue-700"
              >
                <FiEdit2 />
              </button>
              <button
                onClick={() => deleteAnnouncement(announcement.id)}
                className="text-red-500 hover:text-red-700"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {announcement.department === "all"
              ? "All Departments"
              : announcement.department.toUpperCase()}
            • {announcement.date}
          </p>
          <p className="mt-2">{announcement.content}</p>
        </>
      )}
    </div>
  );
};

export default AnnouncementItem;
