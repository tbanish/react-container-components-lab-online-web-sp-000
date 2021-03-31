import React, { Component } from 'react';
import 'isomorphic-fetch';
import MovieReviews from './MovieReviews'

const NYT_API_KEY = 'dGpQ5OmGP2SgfvZimlpCUoF4iOag9qzZ';
const URL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?'
            + `api-key=${NYT_API_KEY}`;

// Code SearchableMovieReviewsContainer Here
class SearchableMovieReviewsContainer extends Component {
  constructor() {
    super()
    this.state = {
      reviews: [],
      searchTerm: ""
    }
  }

  handleSearchTerm = (event) => {
    this.setState({
      searchTerm: event.target.value
    })
  }

  submitHandler = (event) => {
    event.preventDefault()
    const searchTerm = `&query=${this.state.searchTerm}`
    fetch(URL+searchTerm)
    .then(resp => resp.json)
    .then(json => {
      const reviews = json.results
      if (json.results !== undefined) {
        this.setState({
          reviews: reviews
        })
      }
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={event => this.submitHandler(event)} className="searchable-movie-reviews">
          <input onChange={event => this.handleSearchTerm(event)} type="text"/>
          <input type="submit"/>
        </form>
        <div><MovieReviews reviews={this.state.reviews}/></div>
      </div>
    )
  }
}



export default SearchableMovieReviewsContainer
