import { useNavigate,Link } from "react-router-dom";
import { useState } from "react";
import TextInput from "../../textInput/Index";
import MyButton from "../../button";
// import Logo from "../../../assets/logo";
import "./styles.css"
import { sendRequest } from "../../config/request";
import LoginLogo from "../../../assets/animated/loginLogo";

const LoginForm = ( { toggleForms } ) => {
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const handleDataChange = (e)=>{
        setData({...data, [e.target.name]: e.target.value})
    }

    const navigate = useNavigate()
    const handleSubmit = async () => {
        const login_btn = document.getElementById("login-btn")
        login_btn.innerHTML = 'Logging in...'
        try {
            const response = await sendRequest({
                method: "POST",
                route: "/auth/login",
                includeHeaders: false,
                body: data,
            });
            if(response.token){
                login_btn.innerHTML = 'success'
                localStorage.setItem('token', response.token)
                localStorage.setItem('name', response.user.name)
                navigate('/home')
            } else {
                login_btn.innerHTML = 'Failed'
                login_btn.style.backgroundColor = 'rgb(255, 109, 109)'
                setTimeout(() => { 
                    login_btn.innerHTML = 'Login' 
                    login_btn.style.backgroundColor = 'rgb(247, 129, 91)'
                }, 3000)
            }
        } catch (error) {
            console.log(error)
            login_btn.innerHTML = 'Try Again' 
        }}
    
    return (
        <div className="login-form-container rotate-form">
            <div className="login-logo-container">
                <LoginLogo></LoginLogo>
            </div>

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
                placeholder={"Enter Your Password"}
                onChange={handleDataChange}
            />
            <div className="login-btn-div">
                <MyButton 
                id={"login-btn"}
                onClick={handleSubmit} 
                label={'Login'}
                styles={{width: "411.5px", fontSize:"1.1rem"}}
                ></MyButton>
            </div>
            <span>Don't have an account? <br/><span className="register-link" onClick={toggleForms}>Register here!</span>  </span>
        </div>
    );
};

export default LoginForm;
