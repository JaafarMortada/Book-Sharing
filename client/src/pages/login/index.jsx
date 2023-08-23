import { useState, useCallback } from "react";
import LoginForm from "../../components/forms/login";
import RegistrationForm from "../../components/forms/register";
import "./styles.css"

const LoginPage = () => {
    localStorage.clear()
    const [showLoginForm, setShowLoginForm] = useState(true)

    const toggleForms = useCallback(() => {
        setShowLoginForm(prevValue => !prevValue);
    }, []);
    return ( 
        <>
        <div className="login-page-body">
            <div className="login-page-container transition">
                { showLoginForm ? <LoginForm toggleForms={toggleForms} toggle={showLoginForm}/> : <RegistrationForm toggleForms={toggleForms} toggle={showLoginForm}/>}
            </div>
        </div>
        </>
        
    );
}

export default LoginPage;