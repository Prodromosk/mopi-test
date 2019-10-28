import React, {Component} from 'react';
import { BrowserRouter as Router,
         Link,
         Switch,
         Route } from 'react-router-dom';

import './App.css';
import './components/movie/movie.css';

import MovieRow from './components/movie/movie';
import Favorite from './views/fav';
import WatchLater from './views/watchLater';

import $ from 'jquery'

const APIKEY = '7cab534891bcb78b8d5a153f1f4133b9';
var baseUrl = 'https://api.themoviedb.org/3/search/movie'
var searchMovieUrl = ''.concat(baseUrl, '?api_key=', APIKEY, '&query=');

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.searchMovie()
  }

  searchMovie(searchTerm) {
    const movieDbUrl = searchMovieUrl + searchTerm
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

    <Router>
    <nav className="navbar navbar-dark bg-dark">
      <ul className="navbar-nav">
        <li className="nav-link">
            {' '}
            <Link to="/watch-Later">Watch Later</Link>{' '}
        </li>
        <li className="nav-link">
            {' '}
            <Link to="/my-favorites">Loved Movies</Link>{' '}
        </li>
      </ul>
    </nav>

      <Switch>
        <Route path="/my-favorites" component={ Favorite } />
        <Route path="/watch-later" component={ WatchLater } />
      </Switch>
    </Router>

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

export { App as default, APIKEY, baseUrl, searchMovieUrl };
