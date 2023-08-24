import { BiSolidLike } from 'react-icons/bi';
import "./styles.css"

const BookCard = ({data}) => {
    return (
        <>
            <div id="container">
                <div className="product-details">
                    <span><strong>Recommended by:</strong>{data.user_name}</span>
                    <h1>{data.post.title}</h1>
                    <div className="author-like-btn">
                        <span><strong>Author: </strong>{data.post.author}</span>
                        <span className="like-btn"><BiSolidLike/></span>
                    </div>
                </div>
                <div class="product-image">
                    <img src={data.post.pic_url} alt="Omar Dsoky" />
                    <div class="info">
                        <h2>Review</h2>
                        <ul>
                            <li>{data.post.review}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookCard;