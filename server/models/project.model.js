import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    title: ({
        type: String,
        trim: true,
        required: 'Title is required'
    }),
    completion: ({
        type: Date,      
    }),
    description :({
        type: String,
        trim: true,
        required: 'Description is required'
    }),
    image: ({
        type: String,
        trim: true,
    }),
})
export default mongoose.model("Project", ProjectSchema);