import express from "express";
import * as db from "./database.js"
const app = express()


const port = 8080

app.use(express.json())

app.get('/maids',async(req,res)=>{
    const maids = await db.getMaids()
    res.send(maids)
})
app.get('/maids/:maid',async(req,res)=>{
    const {maid} = req.params
    const maid_ = await db.getMaid(maid)
    res.send(maid_)
})
app.get('/users',async(req,res)=>{
    const users = await db.getUsers()
    res.send(users)
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

app.post('/maids',async(req,res)=>{
    const {fname,lname,location,number,email,pf,pp,ps} = req.body
    const success = await db.addMaid(fname,lname,location,number,email,pf,pp,ps)
    res.send(success)
})

app.post('/users',async(req,res)=>{
    const {fname,lname,location,email,password} = req.body
    const {insertId} = await db.addUser(fname,lname,location,email,password)
    res.send(`${insertId}`)
})

app.post('/reviews',async(req,res)=>{
    const {maid,user,text,rating} = req.body
    const {insertId} = await db.addReview(maid,user,text,rating)
    const [review] = await db.getReview(insertId)
    res.send(review)
})



app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})