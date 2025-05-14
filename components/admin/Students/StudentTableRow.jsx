const StudentTableRow = ({ student, projects }) => {
  console.log(student.wishlist);
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-medium">
          {student.first_name} {student.last_name}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {student.email}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {student.department}
      </td>
      <td className="px-6 py-4">
        {/* <div className="flex flex-wrap gap-2">
          {student.wishlist && student.wishlist.length > 0 ? (
            student.wishlist.map((project, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {project}
              </span>
            ))
          ) : (
            <span className="text-sm text-gray-500">
              No projects in wishlist
            </span>
          )}
        </div> */}
      </td>
    </tr>
  );
};

export default StudentTableRow;
