import React, { useState } from 'react'
import axios from 'axios'
import NetflixStyle from './NetflixStyle.css'
import requests from './requests'
import { useEffect } from 'react'
import Row from './Row'
import Banner from './Banner'
import NetflixLogo from './images/netflix-logo.png'
import YouTube from 'react-youtube'


function Netflix() {
  const [movie, setMovie] = useState('')
  const [displayM, setDisplay] = useState('')
  const [style, setStyle] = useState('searchMovieTab')
  const [searchMovie, setSearchMovie] = useState('display')

  const imageBasePath = 'https://image.tmdb.org/t/p/original/'

  function handleChange(e) {
    setMovie(e.target.value)
  }


  function showMovie(event) {
    event.preventDefault()

    async function getData() {
      const data = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=df41664279ac4a308d8b915accc1f0e4&language=en-US&query=${movie}&page=1&include_adult=false`)
      // console.log(response.data.results)
      setDisplay(data.data.results)
    }
    getData();
    setStyle("showMovieTab")
    setSearchMovie("displaySearch")
  }
  // console.log(displayM)

  return (
    <div>
      <div className="NavBar">
        <div className='logo'>
          <img src={NetflixLogo} />
        </div>

        <div id="search">
          <form onSubmit={showMovie}>
            <input type="text" className="searchBar" value={movie} placeholder="SEARCH MOVIE" onChange={handleChange} />
            <input type='submit' className="submitbtn" value='Search' />
          </form>
        </div>
      </div>
      <div className={style}>
        <div className='searchHeading'>
          <h2>The results as per search {movie} are as follows:</h2>
        </div>
        {
          displayM &&
          displayM.map((data, index) => {
            return (
              <div key={index} className='ImageTab' >
                <div>
                  <img src={`${imageBasePath}${data.poster_path}`} alt={data.original_title || data.name} className='searchImage' />
                </div>
                <div className='movieDetails'>
                  <h2 className='movieTitle'>{data.title}</h2>
                  <p className='movieOverview'><h4>Overview-</h4> {data.overview}</p>
                  <h4 className='movieRelease'>Release Date- {data.release_date}</h4>
                  <h4 className='movieRating'>Rating- {data.vote_average}</h4>
                  <h4 className='movieLanguage'>Language- {data.original_language}</h4>
                </div>
              </div>
            )
          })
        }
      </div>

      <div className={searchMovie}>
        <Banner endPoint={requests.fetchTrending} />
        <Row
          showBanner={true}
          endPoint={requests.fetchTrending}
        />
        <Row
          headline='TRENDING'
          isBigger={true}
          endpoint={requests.fetchTrending}
        />
        <Row
          headline1='ORIGINALS'
          endpoint={requests.fetchNetflixOriginals}
        />
        <Row
          headline2='TOP RATED'
          endpoint={requests.fetchTopRated}
        />
        <Row
          headline3='ACTION MOVIES'
          endpoint={requests.fetchActionMovies}
        />
        <Row
          headline4='COMEDY MOVIES'
          endpoint={requests.fetchComedyMovies}
        />
        <Row
          headline5='HORROR MOVIES'
          endpoint={requests.fetchHorrorMovies}
        />
        <Row
          headline6='ROMANTIC MOVIES'
          endpoint={requests.fetchRomanceMovies}
        />
        <Row
          headline7='DOCUMENTARIES'
          endpoint={requests.fetchDocumentaries}
        />
      </div>

    </div>
  )
}

export default Netflix