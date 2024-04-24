"use client"

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'

const PromptCard = ({post, hendleTagClick,hendleEdit,hendleDelete}) => {

  const [copied,setCopied] = React.useState("")
  const {data:session}=useSession()
  const pathName = usePathname()
  const router = useRouter()

  const hendleCopy = () => {
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(() => setCopied(""), 3000)
  }

  const navigateToProfile = () => {
    // /update-prompt?id=${post._id
    router.push(`/profile/view?id=${post.creator._id}`)
  }

  return (
    <div className='prompt_card my-5'>
      <div className='flex justify-between items-start gap-5 '>
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
          <Image onClick={navigateToProfile}  src={post.creator.image} alt="user image" width={40} height={40} className='rounded-full object-contain'/>

          <div className='flex flex-col' onClick={navigateToProfile}>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {post.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post.creator.email}
            </p>
          </div>
        </div>
       
        <div className='copy_btn' onClick={hendleCopy}>
          <Image src={copied===post.prompt?"/assets/icons/tick.svg" :"/assets/icons/copy.svg"} alt='copy-icon' width={12} height={12}/>
        </div>
      </div>
        <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
        <p className='font-inter text-sm blue_gradient cursor-pointer' onClick={()=> hendleTagClick&&hendleTagClick(post.tag)}>
          #{post.tag}
        </p>
        {session?.user.id === post.creator._id && pathName === "/profile" && (
          <div className='mt-5 flex-center gap-4 border-t  border-gray-100 pt-3'>
            <p onClick={hendleEdit} className='font-inter green_gradient text-sm cursor-pointer'>
              Edit
            </p>
          <p onClick={hendleDelete} className='font-inter orange_gradient text-sm cursor-pointer'>
           Delete
          </p>
          </div>
        )}
    </div>
  )
}

export default PromptCard