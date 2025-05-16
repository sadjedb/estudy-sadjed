import { getDatabaseConnection } from "../utils/database.js";

class StudentService {
  async getAllStudents() {
    const connection = await getDatabaseConnection();
    const query = "SELECT * FROM students";
    const [rows] = await connection.execute(query);
    // For each student, get their wishlisted projects
    for (const student of rows) {
      const [wishlist] = await connection.execute(
        `SELECT p.* FROM student_project_wishlist w JOIN projects p ON w.project_id = p.id WHERE w.student_id = ?`,
        [student.id]
      );
      student.wishlist_projects = wishlist;
    }
    return rows;
  }

  async getStudentById(studentId) {
    const connection = await getDatabaseConnection();
    const query = "SELECT * FROM students WHERE id = ?";
    const [rows] = await connection.execute(query, [studentId]);
    const student = rows[0] || null;
    if (!student) return null;
    // Get wishlisted projects for this student
    const [wishlist] = await connection.execute(
      `SELECT p.* FROM student_project_wishlist w JOIN projects p ON w.project_id = p.id WHERE w.student_id = ?`,
      [studentId]
    );
    student.wishlist_projects = wishlist;
    return student;
  }

  async updateStudent(studentId, updatedFields) {
    const connection = await getDatabaseConnection();
    const setClause = Object.keys(updatedFields)
      .map((field) => `${field} = ?`)
      .join(", ");
    const values = [...Object.values(updatedFields), studentId];
    const query = `UPDATE students SET ${setClause} WHERE id = ?`;
    const [result] = await connection.execute(query, values);
    return result.affectedRows > 0;
  }

  async addOrUpdateStudent(student) {
    const connection = await getDatabaseConnection();
    const { id, first_name, last_name, password, email, department, wishlist } = student;

    if (id) {
      const query = `UPDATE students SET first_name = ?, last_name = ?, password = ?, email = ?, department = ?,  wishlist = ? WHERE id = ?`;
      const result = await connection.execute(query, [first_name, last_name, password, email, department, JSON.stringify(wishlist), id]);

      return result.affectedRows > 0 ? id : null;
    } else {
      // Insert a new student if no ID is provided
      const query = `INSERT INTO students (first_name, last_name, password, email, department,  wishlist) VALUES (?, ?, ?, ?, ?, ?)`;
      const result = await connection.execute(query, [first_name, last_name, password, email, department, JSON.stringify(wishlist)]);

      return result.insertId;
    }
  }

  async removeStudent(studentId) {
    const connection = await getDatabaseConnection();
    const query = "DELETE FROM students WHERE id = ?";
    const [result] = await connection.execute(query, [studentId]);
    return result.affectedRows > 0;
  }
}

export default StudentService;
