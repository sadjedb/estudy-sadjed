import { getDatabaseConnection } from "../utils/database.js";

class StudentService {
  async getAllStudents() {
    const connection = await getDatabaseConnection();
    const query = "SELECT * FROM students";
    const [rows] = await connection.execute(query);
    return rows;
  }

  async getStudentById(studentId) {
    const connection = await getDatabaseConnection();
    const query = "SELECT * FROM students WHERE id = ?";
    const [rows] = await connection.execute(query, [studentId]);
    return rows[0] || null;
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
    const {
      id,
      first_name,
      last_name,
      email,
      password,
      department,
      wishlist = [],
    } = student;

    if (id) {
      const query = `UPDATE students SET 
                first_name = ?,
                last_name = ?,
                email = ?,
                password = COALESCE(?, password),
                department = ?,
                wishlist = ?
                WHERE id = ?`;

      const [result] = await connection.execute(query, [
        first_name,
        last_name,
        email,
        password,
        department,
        JSON.stringify(wishlist),
        id,
      ]);
      return result.affectedRows > 0 ? id : null;
    } else {
      const query = `INSERT INTO students 
                (first_name, last_name, email, password, department, wishlist) 
                VALUES (?, ?, ?, ?, ?, ?)`;

      const [result] = await connection.execute(query, [
        first_name,
        last_name,
        email,
        password,
        department,
        JSON.stringify(wishlist),
      ]);
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
