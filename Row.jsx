import React, { useState, useEffect } from 'react'
import axios from 'axios'
import requests from './requests'
import './NetflixStyle.css'

function Row(props) {
  const imageBasePath= 'https://image.tmdb.org/t/p/original/'
  const [Input, setInput] = useState([])
  useEffect(() => {

    async function getData(data) {
      const response = await axios.get(props.endpoint)
      setInput(response.data.results)
    }
    getData();


  }, [])
  // console.log(Input)
  return (
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
            <div key={index} >
              <img className={props.isBigger ?'bigPoster' : 'posters'} src={imageBasePath+data.poster_path} alt={data.original_title || data.name} />
            </div>
          )
        })}
      </div>
      
    </div>
  )
}

export default Row