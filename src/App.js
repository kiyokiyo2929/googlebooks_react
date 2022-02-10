import logo from './logo.svg';
import './App.css';
import Home from './components/home';
import Author from './components/author';
import Book from './components/books';
import Header from './components/header'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
   <BrowserRouter>
    <div className="App">
     <Header/>
        <section id="main_part">
            <Routes>
              <Route path="/author" element={<Author/>} />
              <Route path="/book" element={<Book/>} />
              <Route path="/" element={<Home/>} />
            </Routes>
          </section>  
    </div>
    </BrowserRouter>
  );
}

export default App;
