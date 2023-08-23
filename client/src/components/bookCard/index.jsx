import { BiSolidLike } from 'react-icons/bi';
import "./styles.css"

const BookCard = () => {
    return (
        <>
            <div id="container">
                <div class="product-details">
                    <span><strong>Recommended by:</strong> jaafar mortada</span>
                    <h1>The Books Name Name Name</h1>
                    <div className="author-like-btn">
                        <span><strong>Author: </strong>Jaafar Mortada</span>
                        <span className="like-btn"><BiSolidLike/></span>
                    </div>
                </div>
                <div class="product-image">
                    <img src="https://sc01.alicdn.com/kf/HTB1Cic9HFXXXXbZXpXXq6xXFXXX3/200006212/HTB1Cic9HFXXXXbZXpXXq6xXFXXX3.jpg" alt="Omar Dsoky" />
                    <div class="info">
                        <h2>Review</h2>
                        <ul>
                            <li>short book review</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookCard;