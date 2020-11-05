import React, { useEffect, useState, useRef } from 'react';
import './../styles/App.css'
import './../styles/GameShowcase.css'

const GameShowcase = ({ game, gameId }) => {

  const [screenshots, setScreenshots] = useState([]);

  const [selectedButton, setSelectedButton] = useState(0);

  const image0 = useRef(null);
  const image1 = useRef(null);
  const image2 = useRef(null);
  const image3 = useRef(null);

  const refArray = [image0, image1, image2, image3];

  useEffect(() => {
    fetch(`http://localhost:8080/screenshots/${gameId}`)
    .then(jsonData => jsonData.json())
    .then(data => { 
      console.log(data);
      const urls = data.array.map(object => {
        return object.image
      })
      if(game.clip) {
        const shortArray = urls.splice(0, 3);
        setScreenshots([game.clip.preview, ...shortArray]);
      } else {
        const shortArray = urls.splice(0, 4);
        setScreenshots(shortArray);
      }
    });
  }, []) //eslint-disable-line

  return (
    <React.Fragment>
      <div className='showcase'>
        <div className='showcase__active'>
          {
            game.clip && selectedButton === 0

            ? <video controls autoPlay muted>
                <source src={ game.clip.clip } type="video/mp4" />
                Your browser does not support embedded videos
              </video>
            
            : <img src={screenshots[selectedButton] } alt='main screenshot'/>
          }
        </div>
        <div className='showcase__alternate'>
          { screenshots.map((url, i) => {
              return (
                <div 
                  className='showcase__button' 
                  onClick={ () => { setSelectedButton(i) }}
                  key={i}>
                    <img 
                      ref={ refArray[i] }
                      className='img'
                      src={ url } 
                      alt='screenshot' 
                      onLoad={() => { refArray[i].current.classList.add('img--loaded') }}
                    />
                </div>
                );
            })
          }
        </div>
      </div>
    </React.Fragment>
  );
}

export default GameShowcase;