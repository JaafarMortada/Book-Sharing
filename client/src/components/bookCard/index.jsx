import { BiSolidLike } from 'react-icons/bi';
import { MdPersonAdd } from "react-icons/md"
import "./styles.css"

const BookCard = ({data}) => {
    return (
        <>
            <div id="container">
                <div className="product-details">
                    <div className='author-div'>
                        <span><strong>Recommended by:</strong>{data.user_name}</span>
                        <span className="follow-btn"><MdPersonAdd/></span>
                    </div>
                    <h1>{data.post.title}</h1>
                    <div className="author-like-btn">
                        <span><strong>Author: </strong>{data.post.author}</span>
                        <span className="like-btn"><BiSolidLike/></span>
                    </div>
                </div>
                <div class="product-image">
                    <img src={data.post.pic_url} alt="book img" />
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