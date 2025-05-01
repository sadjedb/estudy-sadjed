import { getDatabaseConnection } from "../utils/database";

export async function authUser(email, password, userType) {
    const connection = await getDatabaseConnection();
    await connection.connect();

    const table = userType === "student" ? "students" : "admins";
    const data = userType === "student" ? "first_name, last_name" : "full_name";

    try {
        const [rows] = await connection.execute(
            `SELECT id, ${data}, email FROM ${table} WHERE email = ? AND password = ?`,
            [email, password]
        );

        if (rows.length > 0) {
            return {
                ...rows[0],
                roles: [userType, "public"],
                permissions: ["view", "edit", "delete"],
            };
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error authenticating user:", error);

        throw error;
    } finally {
        await connection.end();
    }
}
