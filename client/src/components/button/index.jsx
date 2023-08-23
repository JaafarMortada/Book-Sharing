import "./styles.css"

const MyButton = ({ label, onClick, styles, id, className }) => {
    return (
        <div className="myButton-container">
            <button 
                id={id}
                onClick={onClick}
                className= {`myButton transition ${className}`}
                style={styles}>
                {label}
            </button>
        </div>
    );
}

export default MyButton;