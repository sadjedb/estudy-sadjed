const StudentTableRow = ({ student, projects }) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-medium">{student.first_name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-medium">{student.last_name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {student.email}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {student.department?.toUpperCase()}
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
    </tr>
  );
};

export default StudentTableRow;
