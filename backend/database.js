import mysql2 from "mysql2"
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql2.createPool({
    host:process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
}).promise()


export async function getMaids(){
    const [result] = await pool.query('select * from maids')
    return result
}

export async function getMaid(name){
    const [result] = await pool.query('select * from maids where fname = ?',[name])
    return result
}

export async function addMaid(user_id,fname,lname,location,number,email,price_fullhouse,price_partial,price_specific){
    const [{insertId}] = await pool.query('insert into maids(user_id,fname,lname,location,phone_number,email) values (?,?,?,?,?,?)',[user_id,fname,lname,location,number,email])
    const [result] = await pool.query('insert into prices(maid_id,price_fullhouse,price_partial,price_specific) values (?,?,?,?)',[insertId,price_fullhouse,price_partial,price_specific])
    return "Inserted Maid"
}
//addMaid("a","b","test","test","test","test","test")

export async function getUser(id){
    const [result] = await pool.query('select * from users where id = ?',[id])
    console.log("User:",result)
    return result
}


export async function getUsers(){
    const [result] = await pool.query('select * from users')
    return result
}

export async function addUser(fname, lname, location, email, password) {
    try {
        // Check if a user with email already exists
        const [existingUsers] = await pool.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (existingUsers.length > 0) {
            const existingUser = existingUsers[0];
                return { success: false, message: "Email already exists" };

        }

        // If no existing user, proceed with user creation
        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await pool.query(
            'INSERT INTO users (fname, lname, location, email, password) VALUES (?, ?, ?, ?, ?)',
            [fname, lname, location, email, hashedPassword]
        );

        return { success: true, message: "User added successfully", userId: result.insertId };
    } catch (error) {
        console.error("Error adding user:", error);
        return { success: false, message: "An error occurred while adding the user" };
    }
}

// Function to check user credentials
export async function checkUserByEmail(email, passwordGiven) {
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        
        if (rows.length === 0) {
            return { success: false, message: "User not found" };
        }

        const user = rows[0];
        const passwordMatch = await bcrypt.compare(passwordGiven, user.password);
        
        if (passwordMatch) {
            return { success: true, message: "Login successful", userId: user.id };
        } else {
            return { success: false, message: "Incorrect password" };
        }
    } catch (error) {
        console.error("Error checking user credentials:", error);
        return { success: false, message: "An error occurred while checking credentials" };
    }
}

export async function getPrices(){
    const [result] = await pool.query('select * from prices')
    return result
}

export async function getPrice(maid){
    const [result] = await pool.query('select * from prices where maid_id = ?',[maid])
    return result
}

export async function getReviews(){
    const [result] = await pool.query('select * from reviews')
    return result
}
export async function getReview(id){
    const [result] = await pool.query('select * from reviews where id=?',[id])
    return result
}
export async function getMaidReviews(maid){
    const [result] = await pool.query('select * from reviews where maid_id = ?',[maid])
    return result
}
export async function addReview(maidId,userId,text,rating){
    
    const [result] = await pool.query('insert into reviews (maid_id,user_id,reviewno,reviewtxt) values (?,?,?,?)',[maidId,userId,text,rating])
    return result

}

console.log(getUsers())