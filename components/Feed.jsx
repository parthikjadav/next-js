"use client"

import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({data,hendleTagClick}) => {
  return <div className='mt-16 prompt_layout'>
    {
      data?.map((item, index) => <PromptCard key={index} post={item} hendleTagClick={hendleTagClick}/>)
    }
  </div>
}
const Feed = () => {

  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };
  
  const fetchData = async () => {
    const res = await fetch(`/api/prompt`)
    const data = await res.json()
    setAllPosts(data)
  }

  useEffect(()=>{
    fetchData()
  },[])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input type="text" name="search" placeholder='Search for a tag or a username' value={searchText} onChange={handleSearchChange} required className='search_input peer' />
      </form>

      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  )
}

export default Feed