import BookCard from "../../components/bookCard";
import NavBar from "../../components/navbar";
import { sendRequest } from "../../components/config/request";
import { useState, useEffect, useCallback } from "react";
import "./styles.css"
import EmptyState from "../../assets/animated/emptyState";

const HomePage = () => {

    const [books, setBooks] = useState([]);
    const [followingFeed, setFollowingFeed] = useState(false);
    const [followingFeedCards, setFollowingFeedCards] = useState([]);
    const [searchedPosts, setSearchedPosts] = useState([]);

    const handleSearchResult = useCallback((searchResult) => {
        setSearchedPosts(searchResult);
    }, []);

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
            <NavBar search={handleSearchResult} />
            <div className="home-hero-buttons">
                <button 
                    className={`transition ${followingFeed && searchedPosts.length == 0 ? "" : "active"}`} 
                    onClick={() => setFollowingFeed(false)}
                >
                    {
                        searchedPosts.length == 0 ? "All books" : "Results"
                    }
                </button>
                {
                    searchedPosts.length == 0 ?
                        <button className={`transition ${followingFeed ? "active" : ""}`} onClick={() => setFollowingFeed(true)}>Following</button>
                    :
                        null
                }
            </div>

            <div className="book-cards-container">
                {
                    books.length == 0 || searchedPosts[0] === "no posts found" ?
                    <div>
                        <EmptyState/>
                        <span>No books found...</span>
                    </div>
                    :
                        (searchedPosts.length == 0 ?
                            (followingFeed ?
                                (
                                    followingFeedCards.length != 0 ?
                                        followingFeedCards.map(book => (
                                            <BookCard key={book.post.createdAt} data={book} followingFeed={followingFeed} />
                                        ))
                                    : 
                                    <div>
                                        <EmptyState/>
                                        <span>No books found...</span>
                                    </div>
                                ) : (
                                    books.map(book => (
                                        <BookCard key={book.post.createdAt} data={book} followingFeed={followingFeed} />
                                    ))
                                )
                            ) : (
                                searchedPosts.map(book => (
                                    <BookCard key={book.post._id} data={book} followingFeed={followingFeed} />
                                ))
                            )
                        )
                }
            </div>
        </>
    );
}

export default HomePage;