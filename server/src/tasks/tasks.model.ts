import mongoose, {Types} from "mongoose";


export const TaskSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    listId: { type: String, required: true },
    boardId: { type: String, required: true},
    name: { type: String, required: true},
},
    { timestamps: true }
)

export interface ITask {
    userId: Types.ObjectId
    listId: Types.ObjectId
    boardId: Types.ObjectId
    name: string;
    createdAt: string;
}
