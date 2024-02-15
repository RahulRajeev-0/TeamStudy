import React from 'react'
import "./Navbar.scss"
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='wrapper'>
        <div className='search'>
          <input type='text' placeholder='search'/>
          <SearchIcon/>
        </div>
        <div className='items'>
          <div className='item'>
            <MenuIcon className='icon'/>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Navbar
