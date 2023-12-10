import connectDB from "../../db/connection.js";

const initApp = (app, express) => {
  app.use(express.json());
  connectDB();

  app.get("*",(req,res)=>{
    return res.json({message:"page not found"});
  })
};

export default initApp;
