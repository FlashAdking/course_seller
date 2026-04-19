const express = require('express')
const app = express()

const adminRoute = require("./routes/adminRoutes");
const userRoute = require("./routes/userRoutes");

app.use( express.json())


app.use("/admin" , adminRoute);
app.use("/user" , userRoute);



app.listen(3000 , ()=>{
    console.log(`server started on ${3000}`)
});
