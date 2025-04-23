import React from 'react'
import Search from './Search'
import { Link, useSearchParams } from 'react-router-dom'


const SideMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (e) => {
    if (searchParams.get("sort") !== e.target.value) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        sort: e.target.value,
      });
    }
  };
  const handleCategoryChange = (category) => {
    if (searchParams.get("cat") !== category) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        cat:category,
      });
    }
  };

  return (
    <div className='px-4 h-max sticky top-8'>
      <h1 className='mb-4 text-sm font-medium'>Search</h1>
      <Search />
      <h1 className='mt-8 mb-4 text-sm font-medium'>Filter</h1>
      <div className='flex flex-col gap-2 text-sm'>
        <label htmlFor='' className='flex items-center gap-2 cursor-pointer'>
            <input  onChange={handleFilterChange} type='radio' name='sort' value="newest" className='appearance-none w-4 h-4 border-[1.5px] bg-white border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800' />
            Newest
        </label>
        <label htmlFor='' className='flex items-center gap-2 cursor-pointer'>
            <input  onChange={handleFilterChange} type='radio' name='sort' value="popular" className='appearance-none w-4 h-4 border-[1.5px] bg-white border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800' />
            Most Popular
        </label>
        <label htmlFor='' className='flex items-center gap-2 cursor-pointer'>
            <input  onChange={handleFilterChange} type='radio' name='sort' value="trending" className='appearance-none w-4 h-4 border-[1.5px] bg-white border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800' />
            Trending
        </label>
        <label htmlFor='' className='flex items-center gap-2 cursor-pointer'>
            <input  onChange={handleFilterChange} type='radio' name='sort' value="oldest" className='appearance-none w-4 h-4 border-[1.5px] bg-white border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800' />
            Oldest
        </label>
      </div>
      {/* <h1 className='mt-8 mb-4 text-sm font-medium'>Categories</h1>
      <div className=' flex flex-col gap-2 text-sm'>
      <Link to="/posts" className="underline">All Posts</Link>
        <Link to="/posts?cat=web-design" className="underline">Web Design</Link>
        <Link to="/posts?cat=development" className="underline">Development</Link>
        <Link to="/posts?cat=database" className="underline">Database</Link>
        <Link to="/posts?cat=seo" className="underline">Search Engines</Link>
        <Link to="/posts?cat=marketing" className="underline">Marketing</Link>
      </div> */}

<h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
      <div className="flex flex-col gap-2 text-sm">
        <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("general")}>All</span>
        <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("web-design")}>Web Design</span>
        <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("development")}>Development</span>
        <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("database")}>Databases</span>
        <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("seo")}>Search Engines</span>
        <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("marketing")}>Marketing</span>
      </div>
    </div>
  )
}

export default SideMenu
