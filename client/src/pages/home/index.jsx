import BookCard from "../../components/bookCard";
import NavBar from "../../components/navbar";
import { sendRequest } from "../../components/config/request";
import { useState, useEffect } from "react";
import SearchIcon from "../../components/navbar/search.svg"
import "./styles.css"

const HomePage = () => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        const getBooksHandler = async () => {
            try {
                const response = await sendRequest({
                    method: "GET",
                    route: '/users/get_posts',
                });
                if (response.posts) {
                    setBooks(response.posts);
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
            <button className="transition active">All books</button>
            <button className="transition">Following</button>
        </div>
        
        <div className="book-cards-container">
            {books.map(book => (
                 <BookCard key={book.post.createdAt} data={book}/>
            ))}
        </div>
        </>
        
     );
}
 
export default HomePage;