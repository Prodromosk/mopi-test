import React from 'react'


class MovieRow extends React.Component {

  fallBackImg(ev) {
    ev.target.src = './fallBackImg.jpg'
  }

  render() {

    return (

      <div className="media" key= {this.props.movie.id}>
        <img className= "moviePosterImg" onError= {this.fallBackImg}
             alt={this.props.movie.title}
             src={this.props.movie.moviePoster}/>

        <div className= "media-body">
          <h3 className= "mt-0">{this.props.movie.title}</h3>
          {this.props.movie.overview}
        </div>
        <hr></hr>
      </div>
    )
  }
}

export default MovieRow;
