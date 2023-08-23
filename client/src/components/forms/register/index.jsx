import { useNavigate,Link } from "react-router-dom";
import { useState } from "react";
import TextInput from "../../textInput/Index";
import MyButton from "../../button";
// import Logo from "../../../assets/logo";
import "./styles.css"
import { sendRequest } from "../../config/request";
import LoginLogo from "../../../assets/animated/loginLogo";
const RegistrationForm = ( { toggleForms } ) => {

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        ver_password: ""
    })

    const handleDataChange = (e)=>{
        setData({...data, [e.target.name]: e.target.value})
    }

    const navigate = useNavigate()
    const handleSubmit = async () => {
        const register_btn = document.getElementById("register-btn")
        register_btn.innerHTML = 'Registering...'
        try {
            const response = await sendRequest({
                method: "POST",
                route: "/users/register",
                includeHeaders: false,
                body: data,
            });
            if(response.token){
                register_btn.innerHTML = 'success'
                localStorage.setItem('token', response.token)
                localStorage.setItem('name', response.user.name)
                // navigate('/home')
            } else {
                register_btn.innerHTML = 'Failed'
                register_btn.style.backgroundColor = 'rgb(255, 109, 109)'
                setTimeout(() => { 
                    register_btn.innerHTML = 'Register' 
                    register_btn.style.backgroundColor = 'rgb(247, 129, 91)'
                }, 3000)
            }
        } catch (error) {
            console.log(error)
            register_btn.innerHTML = 'Try Again'
        }}
    
    return (
        <div className="register-form-container rotate-form ">
            <div className="register-logo-container">
                <LoginLogo></LoginLogo>
            </div>
            <TextInput
                name = {"name"}
                label={"Enter Your Name:"}
                type={"text"}
                value={data.name}
                placeholder={"Enter Your name"}
                onChange={handleDataChange}
            />
            <TextInput
                name = {"email"}
                label={"Enter Your E-mail:"}
                type={"email"}
                value={data.email}
                placeholder={"Enter Your E-mail"}
                onChange={handleDataChange}
            />
            <TextInput
                name = {"password"}
                label={"Enter Your Password:"}
                type={"password"}
                value={data.password}
                placeholder={"Enter Your password"}
                onChange={handleDataChange}
            />
            <TextInput
                name = {"ver_password"}
                label={"Verify Your Password:"}
                type={"password"}
                value={data.ver_password}
                placeholder={"Verify your password"}
                onChange={handleDataChange}
            />
            <div className="register-btn-div">
                <MyButton 
                id={"register-btn"}
                onClick={handleSubmit} 
                label={'Register'}
                styles={{width: "411.5px", fontSize:"1.1rem"}}
                ></MyButton>
            </div>
            
            <span>Already have an account? <br/><span className="login-link" onClick={toggleForms}>Login here!</span>  </span>
        </div>
    );
};

export default RegistrationForm;
