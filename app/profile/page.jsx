"use client"

import Profile from '@components/Profile'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const MyProfile = () => {
    const { data: session } = useSession()
    const [posts, setPosts] = React.useState([])
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/users/${session?.user.id}/posts`)
            const data = await res.json()
            setPosts(data)
        }
        if (session?.user.id) fetchData()
    }, [session])

    const hendleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const hendleDelete = async (post) => {
        const hasconfirmed = confirm("Are you sure you want to delete this post?")
        if (hasconfirmed) {
           try {
               await fetch(`/api/prompt/${post._id.toString()}`, {
                   method: "DELETE"
               })

               const filterData = posts.filter((item)=> item._id!==post._id)
               setPosts(filterData)
           } catch (error) {
            console.log(error,"err");
           }
            
        }
    }

    return (
        <Profile name={"my"}
            desc="welcome to my profile"
            data={posts}
            hendleEdit={hendleEdit}
            hendleDelete={hendleDelete}
        />
    )
}

export default MyProfile