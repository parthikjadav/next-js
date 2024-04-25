"use client"

import Form from '@components/Form'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect } from 'react'

const EditTemp=()=>{
    const searchParams = useSearchParams();
    const promptId = searchParams.get("id");
    const router = useRouter()
    const [submitting, setSubmitting] = React.useState(false)
    const [post, setPost] = React.useState({
        prompt: "",
        tag: "",
    })

    useEffect(() => {
        const getPromptDetails = async () => {
            const res = await fetch(`/api/prompt/${promptId}`)
            const data = await res.json()
            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }

        if (promptId) getPromptDetails()
    }, [promptId])

    const UpdatePrompt = async (e) => {
        e.preventDefault()
        setSubmitting(true)

        if (!promptId) alert("No id found")

        try {
            console.log(post, 'post')
            const res = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })
            if (res.ok) {
                router.push("/")
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Form
            type={"Edit"}
            post={post}
            setPost={setPost}
            submitting={submitting}
            hendleSubmit={UpdatePrompt}
        />
    )
}

const EditPrompt = () => {
    <Suspense fallback={<div>Loading...</div>}>
        <EditTemp/>
    </Suspense>
}

export default EditPrompt