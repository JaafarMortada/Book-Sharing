import { useState, useEffect } from "react"
import "./styles.css"
import MyButton from "../button";
import SearchIcon from './search.svg'
import LoginLogo from "../../assets/animated/loginLogo";
const NavBar = () => {


    return ( 
        <div className='navbar'>
            <div className="navbar-logo">
                <LoginLogo />
            </div>
            
            <div className='navbar-btns-div'>
            <div className="search">
                <input 
                    placeholder="Search for Books"
                />
                <img 
                    src={SearchIcon} 
                    alt="search" 
                />
            </div>
                <MyButton label={'button to button'} className={"navbar-btn"}></MyButton>
                <MyButton label={'button to button'} className={"navbar-btn"}></MyButton>
                <MyButton label={'button to button'} className={"navbar-btn"}></MyButton>
            </div>
        </div>
    );
}

export default NavBar;