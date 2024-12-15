import mongoose from "mongoose"

const BlogSchema = new mongoose.Schema({
    title: {
        type: "string",
        required: "true",
        unique: "true"
    },
    description: {
        type: "string",
        required: "true"
    },
    postedBy: {
        type: String,
        required: "true"
    }

},
    {
        timestamps: "true",
    }
)


export default mongoose.model("Blogs", BlogSchema);