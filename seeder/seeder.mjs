import "dotenv/config"
import bcrypt from "bcryptjs"
import connectDb from "../config/db.config.mjs"
import User from "../models/user.model.mjs"

const seeder = async ()=>{
    try{
        await connectDb()

        console.log("seeder data .....")

        const admin = await User.findOne({ email:process.env.ADMIN_EMAIL })

        if (admin){
            console.log("admin already exists")
            return
        }
        const hashpassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12)
        await User.create({
            name:"admin",
            email:process.env.ADMIN_EMAIL,
            password:hashpassword,
            role:"admin",
            address:"admin adress",
            workphone_no:"1233231423",
            cellphone_no:"0987654321",
            dob:"2000-01-01"
        })
        console.log("admin credentials seeded successfully")
    }catch(error){
        console.log("seeder error:", error.message)
    }
}

seeder()