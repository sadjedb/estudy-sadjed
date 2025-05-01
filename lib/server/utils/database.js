import mysql from 'mysql2/promise';

class DatabaseConnection {
    constructor() {
        this.connection = null;
    }

    async connect() {
        if (!this.connection) {
            this.connection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
            });
        }
        return this.connection;
    }
    async end() {
        if (this.connection) {
            await this.connection.end();
            this.connection = null;
        }
    }
}
export async function getDatabaseConnection() {
    const db = new DatabaseConnection();
    return await db.connect();
}