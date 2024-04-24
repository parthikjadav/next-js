import Feed from '@components/Feed'
import React from 'react'

const page = () => {
    return (
        <section className='w-full flex-center flex-col '>
            <h1 className='head_text text-center'>Discover & Share &nbsp;
                <br className='max-md:hidden' />
                <span className='orange_gradient text-center'>
                    AI-Powered Prompts
                </span>
            </h1>
            <p className='desc text-center'>
                Join our vibrant community, explore endless 
                possibilities, and unleash your imagination 
                with Promptopia today!
            </p>
            <Feed/>
        </section>
    )
}

export default page