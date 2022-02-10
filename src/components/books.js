import axios from 'axios';
import React, {useState} from 'react';

function Book (){
    const [valueTag, setValueTag] = useState("");
    const [bookTitle, setBookTitle] = useState();
    const [page, setPage] = useState(0);
    const [total_number, setTotal_Number] = useState();
    const [list_data, setList_data] = useState();
    const [exist_result, setExist_result] = useState(false);
    const [max_number_onPage, setMax_number_onPage] = useState();

    const handleInputChange = (e) => {
      setBookTitle(e.target.value);
      setValueTag(e.target.value);
    }

    const handleSubmit = (e) => {
        let url_set;
        e.preventDefault();
        url_set = `https://www.googleapis.com/books/v1/volumes?q=intitle:${bookTitle}&maxResults=15&startIndex=${page}`;
   

        axios.get(url_set)
        .then(response=>{
            setExist_result(false);
            setPage(0);
            console.log(response.data);
            setTotal_Number(response.data.totalItems);
            setList_data(response.data.items);
            (response.data.items)? setExist_result(true): setExist_result(false);
            (response.data.totalItems < 15)? setMax_number_onPage(response.data.totalItems): setMax_number_onPage(15);
            setValueTag("");
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const handleNextPage = () =>{
        let next_url_set = `https://www.googleapis.com/books/v1/volumes?q=intitle:${bookTitle}&maxResults=15&startIndex=${page+15}`;
       
        axios.get(next_url_set)
        .then(response=>{
            setList_data(response.data.items);
            let maxPage_link = max_number_onPage+15;
            (response.data.totalItems < max_number_onPage+15)? setMax_number_onPage(response.data.totalItems) : setMax_number_onPage (maxPage_link);
            let nextpage_number =  page + 15;
            setPage(nextpage_number);
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const handlePreviousPage = () =>{
        let previous_url_set = `https://www.googleapis.com/books/v1/volumes?q=intitle:${bookTitle}&maxResults=15&startIndex=${page-15}`;
       
        axios.get(previous_url_set)
        .then(response=>{
            setList_data(response.data.items);
            setMax_number_onPage(page);
            let previous_page_number =  page - 15;
            setPage(previous_page_number);
        })
        .catch(err=>{
            console.log(err)
        })
    }


    return (
        <div>
            <section id="form_result_part">
                <form onSubmit={handleSubmit} id="form_wrapper">
                    <input type="text" name="author_name" value={valueTag} onChange={handleInputChange} />
                    <input type="submit" value="Books Search" />
                </form>

                <div id="search_result_number_wrapper">
                    {(total_number)?
                        <ul class="search_result">
                            <li><p id="search_keyword">Search Keyword : <span>{bookTitle}</span></p></li>
                            <li><p id="search_result_number"><span>{page+1} - {max_number_onPage}</span> items / <span>{total_number} </span> items </p></li>
                        </ul>
                    :""
                    }

                    {(total_number==0)?
                        <div class="search_result_number">
                            <p class="zero_result">Search Keyword : <span> {bookTitle} </span></p>
                            <p class="zero_result"><span>0</span> item</p>
                        </div>
                    :""
                    }
                </div>
            </section>
            
            <section id="list_part"> 
            {(list_data)?

               <ul id="result_list_ul"> 
                  {list_data.map((item)=>
                     <li key={item.etag} id="result_list">
                         {(item.volumeInfo.imageLinks)?
                             <a href={item.volumeInfo.infoLink} target="_blank"><img src={item.volumeInfo.imageLinks.thumbnail} id="cover"/></a>
                            :<div class="img_wrapper"><a href={item.volumeInfo.infoLink} target="_blank"><img src={`${process.env.PUBLIC_URL}/Black.jpeg`} id="no_cover"/></a><p>No Cover Image</p></div>
                        }
                        <div id="result_list_data">
                        <h3>{item.volumeInfo.title}</h3>
                         {(item.volumeInfo.authors)?
                        <p>{item.volumeInfo.authors[0]}</p>  
                         :''}
                        <p>{item.volumeInfo.publisher}</p>
                        <p>{item.volumeInfo.publishedDate}</p>
                        </div>
                     </li>
                  )}
               </ul>

            :''
            }

            {(exist_result)?
            <div class="pagination_flex">
                {(page > 0)?
                   <p onClick={handlePreviousPage} id="previous_page_link">Previous</p>
                :<span>   </span>}
                {(page+15 < total_number)?
                   <p href="#header_part"onClick={handleNextPage} id="next_page_link">Next</p>
                :<span>   </span>}
            </div>
            :""
            }
            </section>
        </div>
    )
}
 

export default Book;