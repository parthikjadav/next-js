import Prompt from "@models/prompt.model";
import User from "@models/user.model";
import { connect } from "@utils/db";

export const GET = async (request, { params }) => {
    const { id } = params;
    console.log(id, "id");

    try {
        await connect()
       
        const user = await User.findOne({_id:id})
        const prompts = await Prompt.find({creator: id}).populate("creator")

        if (!user) return new Response("User not found", { status: 404 })

        console.log(user,"prompt");

        return new Response(JSON.stringify({user,prompts}), { status: 200 })
    } catch (error) {
        console.log(error);
    }
}
