// GET TO READ 

import Prompt from "@models/prompt.model";
import { connect } from "@utils/db";

export const GET = async (req, { params }) => {
    try {
        await connect()

        let id = params.id;

        let prompt = await Prompt.findById(id);
        if (!prompt) return new Response("Prompt not found", { status: 404 })

        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 })
    }
}

// PATCH TO UPDATE

export const PATCH = async (req, { params }) => {
    const {prompt,tag} = await req.json()
    try {
        await connect()

        console.log(prompt,tag,"prompt");
        let newprompt = await Prompt.findByIdAndUpdate(params.id)
        if(!newprompt){
            return new Response("Prompt not found", { status: 404 })
        }

        newprompt.prompt = prompt
        newprompt.tag = tag
        await newprompt.save()

        return new Response(JSON.stringify(newprompt), { status: 200 })
    } catch (error) {
       return new Response(JSON.stringify(error), { status: 500 })
    }
}

// DELETE TO DELETE POST

export const DELETE = async (req, { params }) => {
    try {
        await connect()

        let prompt = await Prompt.findByIdAndDelete(params.id)

        if(!prompt){
            return new Response("Prompt not found", { status: 404 })
        }
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 })
    }
}