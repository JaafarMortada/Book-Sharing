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
            <div className="navbar-right">
                <div className="navbar-logo">
                <LoginLogo />
            </div>
            <div className="navbar-search">
                <input 
                    placeholder="Search Books"
                />
                <img 
                    src={SearchIcon} 
                    alt="search" 
                />
            </div>
            </div>
            
            <div className='navbar-btns-div'>
            
                <MyButton label={'Create a Post'} className={"navbar-btn"} onClick={openModalToAddRecipe}></MyButton>
                {/* <MyButton label={'button to button'} className={"navbar-btn"}></MyButton> */}
                <MyButton label={'Logout'} className={"navbar-btn"}></MyButton>
            </div>
            <RecipeModal toggleModal={toggleModal} isOpen={isModalOpen} from={modalChoice} />
        </div>
    );
}

export default NavBar;