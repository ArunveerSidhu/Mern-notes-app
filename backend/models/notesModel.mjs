import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user:{
    ref: "user",
    required: true,
  },
  isPinned:{
    type: boolean,
    default: false
  },
  isArchived:{
    type: boolean,
    default: false
  }
})

const note = mongoose.model("note", notesSchema);
export default note;
