import React,{useRef,useState} from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import "./styles/app.scss";
import data from "./util (2)";
import Library from "./components/Library";
import Nav from "./components/Nav";
  
function App() {
  const [songs, setSong] = useState(data());

  const [currentSong, setCurrentSong] = useState(songs[4]);


  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0
  
  });
  const [libraryStatus, setLibraryStatus] = useState(false);


  const audioRef = useRef(null);
  const timeHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration: duration });

  }

  const endHandler = async () =>
  {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id)
   
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    
    }
    
  return (
    <div className="app">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSong={setSong}
      />
      <Library libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} isPlaying={isPlaying} audioRef={audioRef} songs={songs} setCurrentSong={setCurrentSong} setSong={setSong} />
      <audio
              onLoadedMetadata={timeHandler}
              onTimeUpdate={timeHandler} ref={audioRef}
        src={currentSong.audio}
        onEnded={endHandler}
        autoPlay>
              </audio>
 </div>
  )
}

export default App;
