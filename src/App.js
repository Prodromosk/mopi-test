import React, {Component} from 'react';
import './App.css';
import MovieRow from './movies'
import $ from 'jquery'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.searchMovie()
  }

  searchMovie(searchTerm) {
    const movieDbUrl = "https://api.themoviedb.org/3/search/movie?api_key=7cab534891bcb78b8d5a153f1f4133b9&query=" + searchTerm
    $.ajax({
      url: movieDbUrl,
      success: (searchResults) => {
        console.log("fetched data from movie db success")
        const results = searchResults.results

        var movieRows = []

        results.forEach((movie) => {
          movie.moviePoster = "http://image.tmdb.org/t/p/w185" + movie.poster_path
          const movieObject = <MovieRow key={movie.id} movie= {movie}/>
          movieRows.push(movieObject)
        })

        this.setState({rows: movieRows})
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data")
      }
    })

  }

  searchMovieInput(event) {
    const movieInput = this
    const searchTerm = event.target.value
    movieInput.searchMovie(searchTerm)
  }

  render() {
    return (
    <div className="App">

<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <a className="navbar-brand" href="#">MoPi Search</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <a className="nav-link" href={""}>Home <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href={""}>Loved</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href={""}>Watch later</a>
      </li>
    </ul>
  </div>
</nav>

<div className="searchBox has-search">
  <span className="fa fa-search form-control-feedback"></span>
  <input onChange= {this.searchMovieInput.bind(this)}
        className="form-control" type="text"
        placeholder="Search for a movie"
        aria-label="Search"></input>
  </div>
      {this.state.rows}
    </div>
  );
}
}
export default App;
