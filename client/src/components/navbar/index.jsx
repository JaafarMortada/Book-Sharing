import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom";
import "./styles.css"
import MyButton from "../button";
import SearchIcon from './search.svg'
import LoginLogo from "../../assets/animated/loginLogo";
import RecipeModal from "../modal";
import { sendRequest } from "../config/request";

const NavBar = ( {search} ) => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalChoice, setModalChoice] = useState("")
    
    const [data, setData] = useState({
        query: "",
      })

    const handleDataChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const searchRequest = async () => {
        if (data.query.length == 0){
            search([])
        } else {
            try {
            const response = await sendRequest({
                method: "GET",
                route: `/users/search?query=${data.query.replace(/ /g, "-")}`,
            });
            if (response.posts) search(response.posts)
            } catch (error) {
                console.log(error)
            }
        }
        
    }

    const navigate = useNavigate()

    const openModalToAddPost = () => {
        setModalChoice("addPost")
        setIsModalOpen(true)
    }

    const toggleModal = useCallback(() => {
        setIsModalOpen(prevValue => !prevValue);
      }, []);

    const handleLogout = () => {
        localStorage.clear()
        navigate("/")
    }

    return ( 
        <div className='navbar'>
            <div className="navbar-right">
                <div className="navbar-logo">
                <LoginLogo />
            </div>
            <div className="navbar-search">
                <input 
                    placeholder="Search Books"
                    name="query"
                    value={data.query}
                    onChange={handleDataChange}
                />
                <img 
                    src={SearchIcon} 
                    alt="search" 
                    onClick={searchRequest}
                />
            </div>
            </div>
            
            <div className='navbar-btns-div'>
            
                <MyButton 
                    label={'Create a Post'} 
                    className={"navbar-btn"} 
                    onClick={openModalToAddPost}
                    >
                </MyButton>
                <MyButton 
                    label={'Logout'} 
                    className={"navbar-btn"} 
                    onClick={handleLogout}
                    >
                </MyButton>
            </div>
            <RecipeModal toggleModal={toggleModal} isOpen={isModalOpen} from={modalChoice} />
        </div>
    );
}

export default NavBar;