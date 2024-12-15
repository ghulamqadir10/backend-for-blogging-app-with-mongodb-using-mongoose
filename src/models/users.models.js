import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email: {
        type: "string",
        required: "true",
        unique: "true"
    },
    password: {
        type: "string",
        required: "true",
    },
    userProfileImg: {
        type: "string",
        required: "true"
    }
});

userSchema.pre("save", async function (next) {
    // check if the password is modified or it,s new document
    if (!this.isModified("password")) return next();
    try {
        // Hash the password before saving the user
        this.password = await bcrypt.hash(this.password, 10)
        next()//continue with the save operation
    } catch (err) {
        // if error occurs during password hashing
        next(err)//pass the error to the next middleware/error handler
    }
},{})

export default mongoose.model("Users",userSchema)