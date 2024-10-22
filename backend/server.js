import express from "express";
import * as db from "./database.js"
import cors from "cors"
const app = express()
import jwt from "jsonwebtoken"

const port = 8080

app.use(express.json())
app.use(cors({origin:'http://localhost:3000'}))

//maids

app.post('/maids',async(req,res)=>{
    const {user_id,fname,lname,location,number,email,pf,pp,ps} = req.body
    const success = await db.addMaid(user_id,fname,lname,location,number,email,pf,pp,ps)
    res.send(success)
})

app.get('/maids',async(req,res)=>{
    const maids = await db.getMaids()
    res.send(maids)
})
app.get('/maids/:searchT', async (req, res) => {
    const { searchT } = req.params;
    console.log("searchT:", searchT);
    const maids = await db.getMaids();
    let toRet = [];
    for (const maid of maids) {
        for (const key of Object.keys(maid)) {
            if (key === "phone_number") {
                continue;
            }
            if (maid[key] && maid[key].toString().toLowerCase().includes(searchT.toLowerCase())) {
                toRet.push(maid);
                break;
            }
        }
    }
    res.send(toRet);
});

app.get('/maids/one/:maid',async(req,res)=>{
    const {maid} = req.params
    const maid_ = await db.getMaid(maid)
    res.send(maid_)
})



//users

app.get('/users',async(req,res)=>{
    const users = await db.getUsers()
    res.send(users)
})
// app.post('/checkusersemail',async(req,res)=>{
//     const {email,password} = req.body
//     const resp = await db.checkUserByEmail(email,password)
//     res.send(resp)
// })
app.get('/users/:user',async(req,res)=>{
    const{user} = req.params
    const users = await db.getUser(user)
    res.send(users)
})
// app.post('/users', async (req, res) => {
//     try {
//         const { fname, lname, location, email, password } = req.body;
        
//         if (!fname || !lname || !location || !email || !password) {
//             return res.status(400).json({ error: 'All fields are required' });
//         }

//         const result = await db.addUser(fname, lname, location, email, password);
        
//         if (result.success) {
//             res.status(201).json({ message: result.message, user_id: result.userId });
//         } else {
//             res.status(400).json({ error: result.message });
//         }
//     } catch (error) {
//         console.error('Error in user registration:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// Modify your existing signin endpoint
app.post('/checkuseremail', async (req, res) => {
    const { email, password } = req.body;
    const result = await db.checkUserByEmail(email, password);
    
    if (result.success) {
      // Generate JWT token
      const token = jwt.sign(
        { userId: result.userId },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      // Get user details
      const [user] = await db.getUser(result.userId);
      
      res.json({
        success: true,
        message: result.message,
        user: {
          id: user.id,
          fname: user.fname,
          lname: user.lname,
          email: user.email,
          location: user.location
        },
        token
      });
    } else {
      res.json({
        success: false,
        message: result.message
      });
    }
  });
  
  // Modify your existing signup endpoint
  app.post('/users', async (req, res) => {
    try {
      const { fname, lname, location, email, password } = req.body;
      
      if (!fname || !lname || !location || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      const result = await db.addUser(fname, lname, location, email, password);
      
      if (result.success) {
        // Generate JWT token
        const token = jwt.sign(
          { userId: result.userId },
          process.env.JWT_SECRET,
          { expiresIn: '24h' }
        );
  
        res.status(201).json({
          success: true,
          message: result.message,
          user: {
            id: result.userId,
            fname,
            lname,
            email,
            location
          },
          token
        });
      } else {
        res.status(400).json({ success: false, message: result.message });
      }
    } catch (error) {
      console.error('Error in user registration:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });




//prices
app.get('/prices',async(req,res)=>{
    const prices = await db.getPrices()
    res.send(prices)
})
app.get('/price/:id',async(req,res)=>{
    const {id} = req.params
    const price = await db.getPrice(id)
    res.send(price)
})




//reviews
app.post('/reviews',async(req,res)=>{
    const {maid_id,user_id,rating,text} = req.body
    const {insertId} = await db.addReview(maid_id,user_id,rating,text)
    const [review] = await db.getReview(insertId)
    res.send(review)
})

app.get('/reviews',async(req,res)=>{
    const reviews = await db.getReviews()
    res.send(reviews)
})

app.get('/review/:maid',async(req,res)=>{
    const {maid} = req.params
    const reviews = await db.getMaidReviews(maid)
    res.send(reviews)
})



app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})