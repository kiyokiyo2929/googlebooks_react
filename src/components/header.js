import { Link } from "react-router-dom";
import React, {useState} from 'react';



function Header(){
    const[author, setAuthor] = useState(false);
    const[book, setbook] = useState(false);

    const author_display = () =>{
        setAuthor(true);
        setbook(false);
    }

    const book_display = () =>{
        setAuthor(false);
        setbook(true);
    }
    return(
        <div id="header_part">
            <ul id="header_flex">
                <li onClick={author_display}><Link to="/author" ><p class={author?"header_deko":''}>Authors Search</p></Link></li>
                <li onClick={book_display}><Link to="/book"><p class={book?"header_deko":''}>Books Search</p></Link></li>
            </ul>
        </div>
    )
}

export default Header;