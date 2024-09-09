import mysql2 from "mysql2/promise";

const pool = mysql2.createPool({
    host: process.env.MYSQL_HOST || '127.0.0.1',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'akshay',
    database: process.env.MYSQL_DATABASE || 'maidmatch',
    port: process.env.MYSQL_PORT || 3306,
});

export async function createUsersTable() {
    try {
        const [result] = await pool.query(`
            CREATE TABLE IF NOT EXISTS USERS (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255),
                fname VARCHAR(255),
                lname VARCHAR(255),
                location VARCHAR(255),
                email VARCHAR(255),
                password VARCHAR(255),
                time_signed_up DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("Users table created successfully:", result);
    } catch (error) {
        console.error("Error creating users table:", error);
    }
}

export async function createMaidsTable() {
    try {
        const [result] = await pool.query(`
            CREATE TABLE IF NOT EXISTS maids (
                id INT AUTO_INCREMENT PRIMARY KEY,
                fname VARCHAR(255),
                lname VARCHAR(255),
                location VARCHAR(255),
                phone_number VARCHAR(20),
                email VARCHAR(255)
            )
        `);
        console.log("Maids table created successfully:", result);
    } catch (error) {
        console.error("Error creating maids table:", error);
    }
}

export async function createPricesTable() {
    try {
        const [result] = await pool.query(`
            CREATE TABLE IF NOT EXISTS prices (
                id INT AUTO_INCREMENT PRIMARY KEY,
                maid_id INT,
                price_fullhouse DECIMAL(10, 2),
                price_partial DECIMAL(10, 2),
                price_specific DECIMAL(10, 2),
                FOREIGN KEY (maid_id) REFERENCES maids(id)
            )
        `);
        console.log("Prices table created successfully:", result);
    } catch (error) {
        console.error("Error creating prices table:", error);
    }
}

// Function to create all tables
export async function createAllTables() {
    await createUsersTable();
    await createMaidsTable();
    await createPricesTable();
    console.log("All tables created successfully");
}

//createAllTables();

export async function testT() {
    const [result] = await pool.query('select * from users')
    console.log(result);
    
}
testT();