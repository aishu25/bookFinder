/* eslint-disable */
import React from 'react';
import './book.css';
import Noimage from '../book/image.png';
import Popup from '../popup/popup';
import NoResultsFound from '../book/noresults.gif';



class Book extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchInput: '',
            searchInputError: '',
            isShow: false,
            books: [],
            showDiv: null,
        },
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSearchChange = this.handleSearchChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleSearchChange = (event) => {
        this.setState({
            searchInput: event.target.value
        })
    }

    handleClick = (index) => {
        console.log("comes to showDiv", index);
        event.preventDefault()
        this.setState({
            showDiv: index
        })
    }

    handleRefresh = () => {
        console.log("refresh")
        this.setState({
            searchInput: '',
            searchInputError: '',
            isShow: false,
            books: [],
            showDiv: null,
        })
    }


    handleSubmit = (event) => {
        let searchInputError = '';
        event.preventDefault();
        if(this.state.searchInput.length <= 0) {
            searchInputError = "Input is required";
            console.log("error")
            this.setState({
                searchInputError,
                isShow: false
            })
        }
        else {
            fetch('https://www.googleapis.com/books/v1/volumes?q=' + this.state.searchInput + '&startIndex=0&maxResults=40&key=AIzaSyBkMp2Bcn67MaJ6sBL2BOCagCKpWWbhUAY', {
                headers: {
                    "Content-Type" : "text/plain",
                } 
            })
            .then (response => response.json())
            .then(response => {
                console.log(response)
                if (response.totalItems > 0) {
                    this.setState({
                        searchInput: '',
                        searchInputError: '',
                        isShow: true,
                        books: response.items,
                    })  
                }
                else {
                    this.setState({
                        searchInput: '',
                        searchInputError: '',
                        isShow: false,
                        books: null
                    }) 
                }
            })
        }
    }

    render() { 
        if(this.state.books) {
            return(
                <div id="container">
                    <form id="formDiv" onSubmit={this.handleSubmit}>
                        <input type="search" id="searchValue" placeholder="Search a book..." value={this.state.searchInput} onChange={this.handleSearchChange}></input>
                        <button type="submit" value="Submit">Submit</button>
                    </form>
                        <h3 style={{ color: "red" }}>{this.state.searchInputError}</h3>
                    <br></br>
                    {this.state.isShow ? 
                        <div id="book-container">
                            {this.state.books.map((book, index) => {
                                return (
                                    <div className="book" key={index}>
                                        <div className="info">
                                            <ul>
                                                <li><strong>Title :</strong> {book.volumeInfo.title}</li>
                                                <li><strong>Publisher : </strong>{book.volumeInfo.publisher}</li>
                                                <li><strong>Publish Date : </strong>{book.volumeInfo.publishedDate}</li>
                                                <li><strong>Authors : </strong> {book.volumeInfo.authors}</li>
                                            </ul>
                                        </div>
                                        <div id="imageButton">
                                            { book.volumeInfo.imageLinks ? <img className="img-container" src={book.volumeInfo.imageLinks.thumbnail}></img> : <img className="img-container" src={Noimage}></img> }
                                            <button id="infoButton" onClick={() => this.handleClick(index)}>info</button>
                                            {this.state.showDiv === index && <Popup info={book.volumeInfo.infoLink}></Popup>}
                                        </div>
                                    </div>
                                )
                            })}
                        </div> : null
                    }
                </div>
            )
        }   
        else {
            console.log(this.state.books)
            return (
                <div>
                    <button onClick={this.handleRefresh}>Refresh</button>
                    <h1>No Results Found!</h1>
                    <img src={NoResultsFound} alt="noResultsFound"></img>
                </div>
            )
        }
    };
}


export default Book;


