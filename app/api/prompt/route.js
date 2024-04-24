import Prompt from "@models/prompt.model";
import { connect } from "@utils/db"

export const GET = async(req,res)=>{
 try {
    await connect();

    const prompts = await Prompt.find({}).populate("creator")
    prompts.reverse()
    return new Response(JSON.stringify(prompts),{
        status:200
    })

 } catch (error) {
     return new Response(JSON.stringify(error), {
         status: 500
     })
 }
}