import { Link } from "react-router-dom";


function Home(){
    return(
        <div id="top">
            <Link to="/author" id="top_link"><p>Find Nice Books</p></Link>
        </div>
       
    )
}

export default Home;