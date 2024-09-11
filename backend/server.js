import express from "express";
import * as db from "./database.js"
import cors from "cors"
const app = express()


const port = 8080

app.use(express.json())
app.use(cors({origin:'http://localhost:3000'}))
app.post('/maids',async(req,res)=>{
    const {fname,lname,location,number,email,pf,pp,ps} = req.body
    const success = await db.addMaid(fname,lname,location,number,email,pf,pp,ps)
    res.send(success)
})

app.get('/maids',async(req,res)=>{
    const maids = await db.getMaids()
    res.send(maids)
})
app.get('/maids/:searchT',async(req,res)=>{
    const {searchT} = req.params
    console.log("searchT:",searchT)
    const maids = await db.getMaids()
    let toRet = []
    for (const maid of maids){
        for (const key of Object.keys(maid)){
            if(key=="phone_number"){
                continue
            }
            if (maid[key].toString().toLowerCase().includes(searchT)){
                toRet.push(maid)
                break
            }
        }
    }
    res.send(toRet)
})
app.get('/maids/one/:maid',async(req,res)=>{
    const {maid} = req.params
    const maid_ = await db.getMaid(maid)
    res.send(maid_)
})
app.get('/users',async(req,res)=>{
    const users = await db.getUsers()
    res.send(users)
})
app.post('/checkusersemail',async(req,res)=>{
    const {email,password} = req.body
    const resp = await db.checkUserByEmail(email,password)
    res.send(resp)
})
app.get('/users/:user',async(req,res)=>{
    const{user} = req.params
    const users = await db.getUsers()
    res.send(users)
})
app.get('/prices',async(req,res)=>{
    const prices = await db.getPrices()
    res.send(prices)
})
app.get('/price/maid',async(req,res)=>{
    const {maid} = req.params
    const price = await db.getPrice(maid)
    res.send(price)
})

app.get('/reviews',async(req,res)=>{
    const reviews = await db.getReviews()
    res.send(reviews)
})

app.get('/review/maid',async(req,res)=>{
    const {maid} = req.params
    const reviews = await db.getMaidReviews(maid)
    res.send(reviews)
})



app.post('/users', async (req, res) => {
    try {
        const { username, fname, lname, location, email, password } = req.body;
        
        if (!username || !fname || !lname || !location || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const result = await db.addUser(username, fname, lname, location, email, password);
        
        if (result.success) {
            res.status(201).json({ message: result.message, userId: result.userId });
        } else {
            res.status(400).json({ error: result.message });
        }
    } catch (error) {
        console.error('Error in user registration:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/reviews',async(req,res)=>{
    const {maid,user,text,rating} = req.body
    const {insertId} = await db.addReview(maid,user,text,rating)
    const [review] = await db.getReview(insertId)
    res.send(review)
})



app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})