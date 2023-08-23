import "./styles.css"

const TextInput = ({ label, name, type, placeholder, value, onChange, multiple = false, className }) => {
    return (
        <div className="text-input-container">
            <label className="text-input-label">{label}</label>
            <input 
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                multiple={multiple}
                className= {`text-input transition ${className}`}
                >
            </input>
        </div>
    );
}

export default TextInput;