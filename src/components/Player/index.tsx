import { useContext, useEffect, useRef } from 'react'
import { PlayerContext } from '../../contexts/PlayerContext'
import Episode from '../../pages/episode/[detail]'
import styles from './style.module.scss'
import Image from "next/image"
import Slider from 'rc-slider'
import "rc-slider/assets/index.css"

export default function Player() {
    const audioRef = useRef<HTMLAudioElement>(null);

    const { 
        episodeList,
        currentEpisodeIndex, 
        isPlaying, 
        togglePlay,
        setOnPlay
    } = useContext(PlayerContext)

    useEffect(() => {
        if (!audioRef.current) {
            return
        }

        if (isPlaying) {
            audioRef.current.play()
        } else {
            audioRef.current.pause()
        }
    }, [isPlaying])

    const episode = episodeList[currentEpisodeIndex]

    return(
        <div className={styles.playerContainer}>
            <header>
                <img src="/playing.svg" alt="Playing Now"/>
                <strong>Tocando agora</strong>
            </header>

            {episode ? (
            <div className={styles.currentEpisode}>
                <Image 
                width={592} height={592} 
                src={episode.thumbnail} 
                objectFit='cover' 
                alt='Episode'
                />
                <strong>{episode.title}</strong>
                <span>{episode.members}</span>
            </div>
            ) : (
            <div className={styles.emptyPlayer}>
              <strong>Selecione um podcast para ouvir</strong>
            </div>
            )}
            

            <footer className={!episode ? styles.empty : ''}>
                <div className={styles.progress}>
                    <span>00:00</span>
                    <div className={styles.slider}>
                        {episode ? (
                            <Slider 
                            trackStyle={{backgroundColor: '#04d361'}}
                            railStyle={{backgroundColor: '#9f75ff'}}
                            handleStyle={{borderColor: '#04d361', borderWidth: 4}}
                            />
                        ) : (
                            <div className={styles.emptySlider} />
                        )}
                    </div>
                    <span>00:00</span>
                </div>

                {episode && (
                    <audio
                      src={episode.url}
                      ref={audioRef}
                      autoPlay
                      onPlay={() => setOnPlay(true)}
                      onPause={() => setOnPlay(false)}
                    />
                )}

                <div className={styles.buttons}>
                    <button type='button' disabled={!episode}>
                        <img src="/shuffle.svg" alt="Shuffle"/>
                    </button>
                    
                    <button type='button' disabled={!episode}>
                        <img src="/play-previous.svg" alt="Play Previous"/>
                    </button>
                    
                    <button type='button' className={styles.playButton} disabled={!episode} onClick={togglePlay}>
                        {isPlaying ? (
                        <img src="/pause.svg" alt="Play"/>    
                        ) : (
                        <img src="/play.svg" alt="Play"/>
                        )}
                        
                    </button>

                    <button type='button' disabled={!episode}>
                        <img src="/play-next.svg" alt="Play Next"/>
                    </button>

                    <button type='button' disabled={!episode}>
                        <img src="/repeat.svg" alt="Repeat"/>
                    </button>
                    
                </div>
            </footer>
        </div>
    )
}