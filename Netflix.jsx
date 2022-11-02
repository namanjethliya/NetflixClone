import React, { useState } from 'react'
import axios from 'axios'
import NetflixStyle from './NetflixStyle.css'
import requests from './requests'
import { useEffect } from 'react'
import Row from './Row'

function Netflix() {
  const [movie, setMovie] = useState('')
  const [display, setDisplay] = useState('')
  const [style, setStyle] = useState('searchMovieTab')
  // const imageBase = 'https://image.tmdb.org/t/p/original/'


  function handleChange(e) {
    setMovie(e.target.value)
  }

  function showMovie(event) {
    // useEffect(() => {
    // },[])

    async function getData() {
      const data = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=df41664279ac4a308d8b915accc1f0e4&language=en-US&query=${movie}&page=1&include_adult=false`)
      // console.log(response.data.results)
      setDisplay(data.data.results)
    }
    getData();
    event.preventDefault()
    setStyle("showMovieTab");
  }
  console.log(display)

  return (
    <div>
      <div id="search">
        <form onSubmit={showMovie}>
          <input type="text" className="searchBar" value={movie} placeholder="ENTER A MOVIE" onChange={handleChange} />
          <input type='submit' className="submitbtn" value='Submit' />
        </form>

      </div>
      <div className={style}>
        <div>
        {display.map((data, index) => {
          return (
            <div key={index} >
              <img src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} alt={data.original_title || data.name} />
            </div>
          )
        })}
        </div>
      </div>

      <div className='display'>
        <Row
          isBigger={true}
          endpoint={requests.fetchTrending}
        />
        <Row
          headline1='NETFLIX ORIGINAL'
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