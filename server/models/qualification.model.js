import mongoose from 'mongoose';

const QualificationSchema = new mongoose.Schema({
    title: ({
        type: String,
        trim: true,
        required: 'Title is required'
    }),
    firstname: ({
        type: String,
        trim: true,
        required: 'First Name is required'
    }),
    lastname: ({
        type: String,
        trim: true,
        required: 'Last Name is required'
    }),
    email : ({
        type: String,
        trim: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        // Email is optional for qualifications/education entries; do not enforce uniqueness here
    }),
    completion: ({
        type: Date,      
    }),
    description :({
        type: String,
        trim: true,
        required: 'Description is required'
    })
})
export default mongoose.model("Qualification", QualificationSchema);