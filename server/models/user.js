import bcrypt from 'bcryptjs'
import mongoose,{Schema, Types} from 'mongoose'

const userSchema= new Schema({
    name:{type:String,required:true},
    title:{type:String,required:true},
    role:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:ture},
    isAdmin:{type:Boolean,required:ture,default:false},
    tasks:[{types:Schema.Types,ObjectId,ref:"Task"}],
    isActive:{type:Boolean,required:true,default:ture},
},
{timestamps:true}
)
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt);
})
userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}
const User=mongoose.model("User",userSchema);
module.exports=User;