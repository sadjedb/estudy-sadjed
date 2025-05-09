import { getDatabaseConnection } from '../utils/database.js';

class StudentService {
    async getAllStudents() {
        const connection = await getDatabaseConnection();
        const query = 'SELECT * FROM students';
        const [rows] = await connection.execute(query);
        return rows;
    }

    async getStudentById(studentId) {
        const connection = await getDatabaseConnection();
        const query = 'SELECT * FROM students WHERE id = ?';
        const [rows] = await connection.execute(query, [studentId]);
        return rows[0] || null;
    }

    async updateStudent(studentId, updatedFields) {
        const connection = await getDatabaseConnection();
        const setClause = Object.keys(updatedFields)
            .map(field => `${field} = ?`)
            .join(', ');
        const values = [...Object.values(updatedFields), studentId];
        const query = `UPDATE students SET first_name, last_name, ${setClause} WHERE id = ?`;
        const [result] = await connection.execute(query, ["hello", "last", ...values]);
        return result.affectedRows > 0;
    }

    async addOrUpdateStudent(student) {
        const connection = await getDatabaseConnection();
        const { id, name, email, department, wishlist } = student;

        if (id) {
            const query = `UPDATE students SET first_name = ?, last_name = ?, password = ?,name = ?, email = ?, department = ?,  wishlist = ? WHERE id = ?`;
            const [result] = await connection.execute(query, ["hello", "last", "pass", name, email, department, year, JSON.stringify(wishlist), id]);
            return result.affectedRows > 0 ? id : null;
        } else {
            // Insert a new student if no ID is provided
            const query = `INSERT INTO students (first_name, last_name, password, name, email, department,  wishlist) VALUES (?, ?, ?, ?, ?, ?,  ?)`;
            const [result] = await connection.execute(query, ["hello", "last", "pass", name, email, department, JSON.stringify(wishlist)]);
            return result.insertId;
        }
    }

    async removeStudent(studentId) {
        const connection = await getDatabaseConnection();
        const query = 'DELETE FROM students WHERE id = ?';
        const [result] = await connection.execute(query, [studentId]);
        return result.affectedRows > 0;
    }
}

export default StudentService;
