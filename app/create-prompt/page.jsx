"use client"

import Form from '@components/Form'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React from 'react'


const page = () => {
  const router = useRouter()
  const {data:session} = useSession()
  const [submitting, setSubmitting] = React.useState(false)
  const [post, setPost] = React.useState({
    prompt: "",
    tag: "",
  })

  const createPrompt = async(e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res =await fetch("http://localhost:3000/api/prompt/new", {
        method:"POST",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId:session?.user.id
        })
      })
      if(res.ok){
        router.push("/")
      }
    } catch (error) {
      console.log(error);
    }finally{
      setSubmitting(false)
    }
  }

  return (
    <Form
      type={"Create"}
      post={post}
      setPost={setPost}
      submitting={submitting}
      hendleSubmit={createPrompt}
    />
  )
}

export default page