import mysql2 from "mysql2"
import bcrypt from 'bcrypt'

const pool = mysql2.createPool({
    host:process.env.MYSQL_HOST||'127.0.0.1',
    user: process.env.MYSQL_USER||'root',
    password: process.env.MYSQL_PASSWORD||'akshay',
    database: process.env.MYSQL_DATABASE||'maidmatch',
    port: process.env.MYSQL_PORT||3306,
}).promise()


export async function getMaids(){
    const [result] = await pool.query('select * from maids')
    return result
}

export async function getMaid(name){
    const [result] = await pool.query('select * from maids where fname = ?',[name])
    return result
}

export async function addMaid(fname,lname,location,number,email,price_fullhouse,price_partial,price_specific){
    const [{insertId}] = await pool.query('insert into maids(fname,lname,location,phone_number,email) values (?,?,?,?,?)',[fname,lname,location,number,email])
    const [result] = await pool.query('insert into prices(maid_id,price_fullhouse,price_partial,price_specific) values (?,?,?,?)',[insertId,price_fullhouse,price_partial,price_specific])
    return "Inserted Maid"
}
//addMaid("a","b","test","test","test","test","test")

export async function getUser(name){
    const [result] = await pool.query('select * from users where fname = ?',[name])
    console.log("User:",result)
    return result
}


export async function getUsers(){
    const [result] = await pool.query('select * from users')
    return result
}

export async function addUser(username, fname, lname, location, email, password) {
    try {
        // Check if a user with the same username or email already exists
        const [existingUsers] = await pool.query(
            'SELECT * FROM users WHERE username = ? OR email = ?',
            [username, email]
        );

        if (existingUsers.length > 0) {
            const existingUser = existingUsers[0];
            if (existingUser.username === username) {
                return { success: false, message: "Username already exists" };
            } else {
                return { success: false, message: "Email already exists" };
            }
        }

        // If no existing user, proceed with user creation
        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await pool.query(
            'INSERT INTO users (username, fname, lname, location, email, password) VALUES (?, ?, ?, ?, ?, ?)',
            [username, fname, lname, location, email, hashedPassword]
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
    const [result] = await pool.query('select * from prices inner join maids on prices.maid_id = maids.id where maids.fname = ?',[maid])
    return result
}

export async function getReviews(){
    const [result] = await pool.query('select * from reviews')
    return result
}
export async function getReview(id){
    const [result] = await pool.query('select * from reviews where review_id=?',[id])
    return result
}
export async function getMaidReviews(maid){
    const [result] = await pool.query('select * from reviews inner join maids on reviews.maid_id = maids.id inner join users on reviews.user_id = users.id where maids.fname = ?',[maid])
    return result
}
export async function addReview(maid,user,text,rating){
    const [md] = await getMaid(maid)
    const maidId = md.id
    const [usr] = await getUser(user)
    const userId = usr.id
    const [result] = await pool.query('insert into reviews (maid_id,rating,text,user_id) values (?,?,?,?)',[maidId,rating,text,userId])
    return result

}