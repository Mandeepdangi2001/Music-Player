import { library } from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import LibrarySong from './LibrarySong';


const Library = ({ songs, setCurrentSong, audioRef, isPlaying ,setSong,libraryStatus}) => {
    return (
        <div className={`library ${libraryStatus?"active-library": ""}`}>
            
            <h2>Library</h2>
             <div className="library-songs">
                {
                    songs.map((song) => (
                       
                        <LibrarySong
                            key={song.id}
                            song={song}
                            songs={songs}
                            id={song.id}
                            setCurrentSong={setCurrentSong}
                            audioRef={audioRef}
                            isPlaying={isPlaying}
                            setSong={setSong}
                        />
                        
                    ))}
            </div>
        </div>
    );
}

export default Library; 