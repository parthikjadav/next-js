import Prompt from "@models/prompt.model";
import { connect } from "@utils/db";

export const POST = async (req,res)=>{
    const {userId,prompt,tag} = await req.json();
    try {
        await connect()

        const newPrompt = new Prompt({
            creator:userId, 
            prompt,
            tag
        })
        console.log("new prompt");
        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt),{
            status:201
        })
    } catch (error) {
        return new Response(error,{
            status:500
        })
    }
}