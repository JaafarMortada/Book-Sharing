import { useState, useEffect, useCallback } from "react"
import "./styles.css"
import MyButton from "../button";
import SearchIcon from './search.svg'
import LoginLogo from "../../assets/animated/loginLogo";
import RecipeModal from "../modal";
const NavBar = () => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalChoice, setModalChoice] = useState("")

    const openModalToAddRecipe = () => {
        setModalChoice("addPost")
        setIsModalOpen(true)
    }

    const toggleModal = useCallback(() => {
        setIsModalOpen(prevValue => !prevValue);
      }, []);

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
                <MyButton label={'button to button'} className={"navbar-btn"} onClick={openModalToAddRecipe}></MyButton>
                <MyButton label={'button to button'} className={"navbar-btn"}></MyButton>
                <MyButton label={'button to button'} className={"navbar-btn"}></MyButton>
            </div>
            <RecipeModal toggleModal={toggleModal} isOpen={isModalOpen} from={modalChoice} />
        </div>
    );
}

export default NavBar;