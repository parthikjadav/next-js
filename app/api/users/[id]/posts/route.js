import Prompt from "@models/prompt.model"
import { connect } from "@utils/db";

export const GET = async (req, { params }) => {
    try {
        await connect()

        let id = params.id
        console.log(id,"id");
        const userPosts = await Prompt.find({ creator: id }).populate("creator")

        return new Response(JSON.stringify(userPosts), { status: 200 })
    } catch (error) {
         return new Response(JSON.stringify(error), { status: 500 })
    }
}