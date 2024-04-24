import React from 'react'
import PromptCard from './PromptCard'

const Profile = ({ name, desc, data, hendleEdit, hendleDelete}) => {
  return (
    <section className='w-full'><h1 className='head_text text-left blue_gradient'>{name} Profile</h1>
      <p className='desc text-left'>{desc}</p>
      <div className='prompt_layout'>

      {
        data?.map((item, index) => <PromptCard key={index} post={item} hendleDelete={() => hendleDelete && hendleDelete(item)} hendleEdit={() => hendleEdit && hendleEdit(item)}  />)
      }
      </div>
    </section>
  )
}

export default Profile