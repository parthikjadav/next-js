"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { signOut, signIn, useSession, getProviders } from "next-auth/react"

const Nav = () => {

    const { data: session } = useSession();

    const [providers, setProviders] = useState(null)
    const [toggleDropdown, setToggleDropdown] = useState(false)

    useEffect(() => {
        const setProvider = async () => {
            const response = await getProviders();
            setProviders(response)
        }

        setProvider()
    }, [])

    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            <Link href={'/'} className='flex gap-2 flex-center'>
                <Image alt='promptopia-logo' width={30} height={30} src="/assets/images/logo.svg" />
                <p className='logo_text'>Promptopia</p>
            </Link>
            <div className='sm:flex hidden'>
                {
                    session?.user ? <div className='flex gap-3 md:gap-5'>
                        <Link href="/create-prompt" className='black_btn'>
                            Create Post
                        </Link>
                        <button type='button' onClick={()=>signOut()} className='outline_btn'>
                            Sign Out
                        </button>

                        <Link href={'/profile'}>
                            <Image alt='profile-pic' width={37} height={37} className='rounded-full' src={session?.user.image} />
                        </Link>
                    </div> : <>
                        {
                            providers && Object.values(providers).map((provider) => {
                                return <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
                                    Sign In
                                </button>
                            })
                        }
                    </>
                }
            </div>

            {/* mobile view nav */}
            <div className='sm:hidden flex relative'>
                {
                    session?.user ? <div className='flex'>
                        <Image src={session?.user.image} onClick={() => setToggleDropdown(!toggleDropdown)} alt='profile-pic' width={37} height={37} className='rounded-full' />
                        {
                            toggleDropdown && <div className='dropdown'>
                                <Link href={"/profile"} className='dropdown_link' onClick={() => setToggleDropdown(false)}>
                                    My Profile
                                </Link>
                                <Link href={"/create-prompt"} className='dropdown_link' onClick={() => setToggleDropdown(false)}>
                                    Create Prompt
                                </Link>
                                <button type='button' className='mt-5 w-full black_btn' onClick={() => {
                                    setToggleDropdown(false)
                                    signOut();
                                }}>
                                    Sing Out
                                </button>
                            </div>
                        }
                    </div> : <>
                        {
                            providers && Object.values(providers).map((provider) => {
                                return <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
                                    Sign In
                                </button>
                            })
                        }
                    </>
                }
            </div>
        </nav>
    )
}

export default Nav