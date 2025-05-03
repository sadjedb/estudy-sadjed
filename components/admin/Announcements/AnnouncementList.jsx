import AnnouncementItem from "./AnnouncementItem";

const AnnouncementList = ({
  announcements,
  editMode,
  enterEditMode,
  deleteAnnouncement,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Current Announcements</h2>
      <div className="space-y-4">
        {announcements.length > 0 ? (
          announcements.map((announcement) => (
            <AnnouncementItem
              key={announcement.id}
              announcement={announcement}
              editMode={editMode}
              enterEditMode={enterEditMode}
              deleteAnnouncement={deleteAnnouncement}
            />
          ))
        ) : (
          <p className="text-gray-500">No announcements yet</p>
        )}
      </div>
    </div>
  );
};

export default AnnouncementList;
