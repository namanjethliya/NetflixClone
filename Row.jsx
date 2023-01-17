import React, { useState, useEffect } from 'react'
import axios from 'axios'
import requests from './requests'
import './RowStyle.css'
import YouTube from 'react-youtube'
import getYouTubeID from 'get-youtube-id'
import BannerStyle from './BannerStyle.css'



function Row(props) {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    async function fetchData() {
      const randomImage = await axios.get(`${props.endPoint}`);
      console.log(randomImage.data.results)
      console.log(Math.floor(Math.random() * randomImage.data.results.length))
      console.log(randomImage.data.results[Math.floor(Math.random() * randomImage.data.results.length)]);

      setMovies(
        randomImage.data.results[Math.floor(Math.random() * randomImage.data.results.length)]
      );
    } 
    fetchData();
  }, []);

  // console.log(movies)
  const styles = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original/${movies.backdrop_path})`,
    height: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center"
  };

  const noBanner ={display: "none"};


  const MOVIE_API = 'https://api.themoviedb.org/3';
  const API_KEY = 'df41664279ac4a308d8b915accc1f0e4';

  const imageBasePath= 'https://image.tmdb.org/t/p/original/'
  const [Input, setInput] = useState([])
  

  useEffect(() => {

    async function getData(data) {
      const response = await axios.get(props.endpoint)
      setInput(response.data.results)
    }
    getData();


  }, [])

  return (
    <>
     <header style={props.showBanner ? styles : noBanner } >
      <div className= "banner">
        {(movies) &&
          <div className='bannerDetails'>
            <h1 className='bannerHeading'>{movies.original_title}</h1>
            <div className='bannerButton'>
              <button><a href="#">Play Trailer</a></button>
            </div>
            <p className='bannerOverview'>
              {movies.overview && movies.overview.slice(0, 200) + '...'}
            </p>
          </div>
        }
      </div>
    </header>
  
    <div className='main'>
     
      <div><h2 className='heading'>{props.headline}</h2> </div>
      <div><h2 className='heading'>{props.headline1}</h2> </div>
      <div><h2 className='heading'>{props.headline2}</h2> </div>
      <div><h2 className='heading'>{props.headline3}</h2> </div>
      <div><h2 className='heading'>{props.headline4}</h2> </div>
      <div><h2 className='heading'>{props.headline5}</h2> </div>
      <div><h2 className='heading'>{props.headline6}</h2> </div>
      <div><h2 className='heading'>{props.headline7}</h2> </div>
      <div className='postersTab'>{
        Input.map((data, index) => {
          return (

            <div key={index}  >
              <img className={props.isBigger ?'bigPoster' : 'posters'} src={imageBasePath+data.poster_path} 
              alt={data.original_title || data.name}/>
            </div>
          )
        })}
      </div>
      
    </div>
  </>
  )
}

export default Row