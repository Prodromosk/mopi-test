import React from 'react'

class MovieRow extends React.Component {

  fallBackImg(ev) {
    ev.target.src = './fallBackImg.jpg'
  }

  render() {

    return (
      <table key= {this.props.movie.id}>
        <tbody>
          <tr>
            <td>
            <img onError= {this.fallBackImg} alt={this.props.movie.title} src={this.props.movie.moviePoster}/>
            </td>
            <td>
            <h1>{this.props.movie.title}</h1>
            <p>{this.props.movie.overview}</p>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default MovieRow;
