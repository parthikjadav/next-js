"use client"

import Profile from '@components/Profile'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'

const tempPro=()=>{
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const [user, setUser] = useState()
    const [posts, setPost] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(id, "id");
                const res = await fetch(`/api/profile/${id.toString()}`)
                const data = await res.json()
                console.log(data.user, "data")
                setUser(data.user)
                setPost(data.prompts)
            } catch (error) {
                console.log(error);
            }
        }

        fetchData()
    }, [])

    return (
        <div>
            <Image src={user?.image} className='rounded-full mx-auto' width={60} height={60} alt='profileimage' />
            <Profile name={user?.username}
                desc={`welcome to ${user?.username} profile`}
                data={posts}
                hendleEdit={() => { }}
                hendleDelete={() => { }}
            />
        </div>
    )
}

const viewProfile = () => {
    <Suspense fallback={<div>Loading...</div>}>
      <tempPro />
    </Suspense>
}

export default viewProfile