'use client';
import { useEffect, useRef, useState } from 'react';

const BackgroundMusic = () => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                (audioRef.current as HTMLAudioElement).pause();
            } else {
                (audioRef.current as HTMLAudioElement)
                    .play()
                    .catch((error: Error) => {
                        console.error('Error playing audio:', error);
                    });
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        if (audioRef.current) {
            (audioRef.current as HTMLAudioElement)
                .play()
                .catch((error: Error) => {
                    console.error('Error playing audio:', error);
                });
        }
    }, []);

    return (
        <div>
            <audio ref={audioRef} loop>
                <source src="/rain.mp3" type="audio/mpeg" />
                <track
                    kind="captions"
                    src="/rain.mp3"
                    srcLang="en"
                    label="English"
                />
                Your browser does not support the audio element.
            </audio>
            <button onClick={togglePlay}>
                {isPlaying ? 'Pause Music' : 'Play Music'}
            </button>
        </div>
    );
};

export default BackgroundMusic;
