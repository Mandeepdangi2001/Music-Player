import React,{useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons'

const Player = ({audioRef, currentSong,isPlaying, setIsPlaying,songInfo, setSongInfo ,songs,setCurrentSong,setSong}) => {
    
    useEffect(() => {
        const newSongs = songs.map((song) => {
            if (song.id === currentSong.id) {
                return {
                    ...song,
                    active: true,
                };
            }
            else {
              return {
                ...song,
                active: false,
              };
            }
          });
          setSong(newSongs);
    },[currentSong])
    const playHandler = () =>
    {
        if (isPlaying)
        {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        }
        else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
        
    }
    const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id)
        if (direction === "skip-forward") {
            await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
            if (isPlaying) audioRef.current.play();
        }
            
        
        if (direction === "skip-back") {
            if ((currentIndex - 1) % songs.length === -1) {
                await setCurrentSong(songs[songs.length - 1]);
                if (isPlaying) audioRef.current.play();
                return;
            }
            await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
         
        
        }
        if (isPlaying) audioRef.current.play();
    };




    
    
    
    const getTime = (time) => {
        return (
            Math.floor(time / 60) + " : " + ("0" + Math.floor(time % 60)).slice(-2)
        )
    };
    const dragHandler = (e) =>
    {
        audioRef.current.currentTime=e.target.value;
        setSongInfo({...songInfo , currentTime:e.target.value})
        }
    
  return (
      <div className="player">
          <div className="time-control">
              <p >{getTime(songInfo.currentTime)}</p>
              <input
                  min={0}
                  max={songInfo.duration}
                  onChange={dragHandler}
                  value={songInfo.currentTime}
                  type="range" />
              
              <p>{songInfo.duration ?getTime(songInfo.duration): "00:00"}</p>
          </div>

          <div className="play-control">
              <FontAwesomeIcon
                  onClick={() => skipTrackHandler("skip-back")}
                  className='skip-back'
                  size="2x"
                  icon={faAngleLeft} />
              
              <FontAwesomeIcon
                  onClick={playHandler}
                  className='Play'
                  size="2x"
                  icon={isPlaying?faPause:faPlay} />
              
              <FontAwesomeIcon
                  onClick={() => skipTrackHandler("skip-forward")}
                  className='skip-forward'
                  size="2x"
                  icon={faAngleRight} />
          </div>
        
   </div>
  )
}

export default Player