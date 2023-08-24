import { BiSolidLike } from 'react-icons/bi';
import { SlUserFollowing, SlUserFollow } from "react-icons/sl"
import { sendRequest } from '../config/request';
import "./styles.css"
import { useState } from 'react';

const BookCard = ({data}) => {

    const [liked, setLiked] = useState(data.post.is_liked)
    const [following, setFollowing] = useState(data.post.is_following)

    const likeRequest = async () => {
        try {
            const response = await sendRequest({
                method: "POST",
                route: `/users/${data.post._id}/like`,
            });
            if (response.message === "liked successfully"){
                setLiked(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div id="container">
                <div className="product-details">
                    <div className='author-div'>
                        <span><strong>Recommended by:</strong>{localStorage.getItem('name') === data.user_name ? "You": data.user_name}</span>
                        { localStorage.getItem('name') === data.user_name ? null :
                            <span 
                            className= {`follow-btn ${ following ? "follow-btn-following" : ""}`}
                            >
                                {following? <SlUserFollowing/> : <SlUserFollow/>}
                            </span>
                        }
                    </div>
                    <h1>{data.post.title}</h1>
                    <div className="author-like-btn">
                        <span><strong>Author: </strong>{data.post.author}</span>
                        { localStorage.getItem('name') === data.user_name ? null :
                            <span 
                                className={`like-btn ${ liked ? "like-button-red" : ""}`}
                                onClick={likeRequest}
                            >
                                <BiSolidLike/>
                            </span>
                        }
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