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

      <table className="moviesDbBar">
        <tbody>
          <tr>
            <td>
              <img alt="Movies DB Logo" className="moviesDbLogo" src="moviesdb.svg"/>
            </td>
            <td>
              <h3>Mopi Search</h3>
            </td>
          </tr>
        </tbody>
      </table>
      <input onChange= {this.searchMovieInput.bind(this)} placeholder="Search for a movie">
      </input>
      {this.state.rows}
    </div>
  );
}
}
export default App;
