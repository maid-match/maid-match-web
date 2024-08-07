import mysql2 from "mysql2"

const pool = mysql2.createPool({
    host:process.env.MYSQL_HOST||'127.0.0.1',
    user: process.env.MYSQL_USER||'root',
    password: process.env.MYSQL_PASSWORD||'akshay',
    database: process.env.MYSQL_DATABASE||'maidmatch'
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
    console.log("USer:",result)
    return result
}

export async function getUsers(){
    const [result] = await pool.query('select * from users')
    return result
}

export async function addUser(fname,lname,location,email,password){
    const [result] = await pool.query('insert into maids(fname,lname,location,,email,password) values (?,?,?,?,?)',[fname,lname,location,email,password])
    return result
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