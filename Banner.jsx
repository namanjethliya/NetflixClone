import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BannerStyle from './BannerStyle.css'

function Banner(props) {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    async function fetchData() {
      const randomImage = await axios.get(`${props.endPoint}`);
      console.log(randomImage);
      setMovies(
        randomImage.data.results[Math.floor(Math.random() * randomImage.data.results.length)]
      );
    }
    fetchData();
  }, []);

  const styles = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original/${movies.backdrop_path})`,
    height: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center"
  };

  return (
    <header style={styles} >
      <div className="banner">
        {(movies) &&
          <div className='bannerDetails'>
            <h1 className='bannerHeading'>{movies.original_title}</h1>
            <div className='bannerButton'>
              <button><a href="#">Play Now</a></button>
              <button><a href="#">My List</a></button>
            </div>
            <p className='bannerOverview'>
              {movies.overview && movies.overview.slice(0, 200) + '...'}
            </p>
          </div>
        }
      </div>

    </header>
  )
}

export default Banner