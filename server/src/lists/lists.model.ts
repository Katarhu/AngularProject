import mongoose, {Types} from "mongoose";


export const ListSchema = new mongoose.Schema({
        userId: {type: String, required: true},
        boardId: {type: String, required: true},
        name: {type: String, required: true},
        color: {type: String, default: null},
        tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}]
    },
    {timestamps: true}
)

export interface IList extends mongoose.Document {
    userId: Types.ObjectId;
    boardId: string;
    name: string;
    color: string;
    tasks: Types.ObjectId[];
}
