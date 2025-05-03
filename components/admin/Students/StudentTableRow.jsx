const StudentTableRow = ({ student, projects }) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-medium">{student.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {student.email}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {student.department.toUpperCase()}
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-wrap gap-2">
          {student.wishlist.map((project, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {project}
            </span>
          ))}
        </div>
      </td>
    </tr>
  );
};

export default StudentTableRow;
