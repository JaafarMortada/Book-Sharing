import BookCard from "../../components/bookCard";
import NavBar from "../../components/navbar";
import "./styles.css"

const HomePage = () => {
    return ( 
        <>
        <NavBar/>
        <div className="book-cards-container">
            <BookCard/>
            <BookCard/>
            <BookCard/>
            <BookCard/>
            <BookCard/>
            <BookCard/>
            <BookCard/>
            <BookCard/>
            <BookCard/>
            <BookCard/>
        </div>
        </>
        
     );
}
 
export default HomePage;