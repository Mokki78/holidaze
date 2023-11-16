import React from 'react'
import { SearchData} from "../data/SearchData";

export const SearchBar = ({ placeholder, data}) => {
  return (
    <div className="search">
      <div className='searchInputs'>
        <input type="text" placeholder="Where is your next destination?"/>
        <div className='searchIcon'></div>
      </div>
      <div className='dataResults'></div>
    
    </div>
  )
}

export default SearchBar;