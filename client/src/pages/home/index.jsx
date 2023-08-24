import BookCard from "../../components/bookCard";
import NavBar from "../../components/navbar";
import { sendRequest } from "../../components/config/request";
import { useState, useEffect } from "react";
import SearchIcon from "../../components/navbar/search.svg"
import "./styles.css"

const HomePage = () => {

    const [books, setBooks] = useState([]);
    const [followingFeed, setFollowingFeed] = useState(false);
    const [followingFeedCards, setFollowingFeedCards] = useState([]);

    useEffect(() => {
        const getBooksHandler = async () => {
            try {
                const response = await sendRequest({
                    method: "GET",
                    route: '/users/get_posts',
                });
                if (response.posts) {
                    setBooks(response.posts);
                    const followingPosts = response.posts.filter(post => post.post.is_following);

                    setFollowingFeedCards(followingPosts);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getBooksHandler();
    }, []);

    return ( 
        <>
        <NavBar/>
        <div className="home-hero-buttons">
            <button className="transition active" onClick={() => setFollowingFeed(false)}>All books</button>
            <button className="transition" onClick={() => setFollowingFeed(true)}>Following</button>
        </div>
        
        <div className="book-cards-container">
            {followingFeed ? 
                    (
                        followingFeedCards.map(book => (
                            <BookCard key={book.post.createdAt} data={book} followingFeed={followingFeed}/>
                        
                    ))
                    ) : (
                        books.map(book => (
                            <BookCard key={book.post.createdAt} data={book} followingFeed={followingFeed}/>
                    ))
                    )
                }
        </div>
        </>
        
     );
}
 
export default HomePage;