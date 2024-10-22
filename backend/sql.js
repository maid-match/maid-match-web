import mysql2 from "mysql2/promise";
import dotenv from "dotenv"
dotenv.config()
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
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
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
export async function addUser(){
    try {
        const [result] = await pool.query(`
            insert into users
             (username,fname,lname,location,email,password) values (?,?,?,?,?,?)
        `,["akshaym08","akshay","murthy","Plano, TX","akshaymurthy08@gmail.com","passsecret"]);
        console.log("Users table created successfully:", result);
    } catch (error) {
        console.error("Error creating users table:", error);
    }
}
//addUser()




export async function task(){
    const [result] = await pool.query('DROP TABLE users')
    console.log(result)
}
//task()




export async function createMaidsTable() {
    try {
        const [result] = await pool.query(`
            CREATE TABLE IF NOT EXISTS maids (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                fname VARCHAR(255),
                lname VARCHAR(255),
                location VARCHAR(255),
                phone_number VARCHAR(20),
                email VARCHAR(255),

                FOREIGN KEY (user_id) REFERENCES users(id)
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

export async function createReviewsTable() {
    try {
        const [result] = await pool.query(`
            CREATE TABLE IF NOT EXISTS reviews (
                id INT AUTO_INCREMENT PRIMARY KEY,
                maid_id INT,
                user_id INT,
                reviewno INT,
                reviewtxt VARCHAR(1000),
                FOREIGN KEY (maid_id) REFERENCES maids(id),
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        `);
        console.log("Reviews table created successfully:", result);
    } catch (error) {
        console.error("Error creating prices table:", error);
    }
}

// Function to create all tables
export async function createAllTables() {
    await createUsersTable();
    await createMaidsTable();
    await createPricesTable();

    await createReviewsTable();
    console.log("All tables created successfully");
}

//createAllTables();

export async function dropTable(table){
    try {
        const [result] = await pool.query(`DROP TABLE ${table}`);
        console.log("Table dropped successfully", result);
    } catch (error) {
        console.error("Error dropping table:", error);
    }
}
//dropTable("users");

export async function truncTable(table){
    try {
        const[result] = await pool.query(`DELETE FROM ${table}`);
        console.log(`Table ${table} emptied successfully`,result);
    } catch (error) {
        console.log("Error deleting rows from table:", error);
    }
}
//truncTable("users")
export async function testT() {
    const [result] = await pool.query('select * from prices')
    console.log(result);
    
}
testT();
