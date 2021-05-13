import Header from '../components/Header'
import '../styles/global.scss'
import styles from '../styles/app.module.scss'
import Player from '../components/Player'
import { PlayerContext } from '../contexts/PlayerContext'
import { useState } from 'react'

function MyApp({ Component, pageProps }) {
  const [episodeList, setEpsisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = (episode) => {
    setEpsisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const setOnPlay = (state: boolean) => {
    setIsPlaying(state)
  }

  return (
  <PlayerContext.Provider value={{ episodeList, currentEpisodeIndex, play, isPlaying, togglePlay, setOnPlay }}>
  <div className={styles.wrapper}>
    <main>
    <Header />
    <Component {...pageProps} />
    </main>
    <Player />
  </div>
  </PlayerContext.Provider>
  )
}

export default MyApp
