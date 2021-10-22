import { useContext, useEffect, useState } from 'react'
import styles from '../styles/player.module.sass'
import { Context } from '@/components/helpers/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShuffle } from '@fortawesome/free-solid-svg-icons'

const Player = () => {
  const [currentPlayed, setCurrentPlayed] = useState(0)

  const {
    audio,
    currentSong: { song: { artist = 'LOADING', song = 'SONG' } = {} } = {},
    shuffle,
  } = useContext(Context)

  useEffect(() => {
    const update = setInterval(() => {
      setCurrentPlayed(Math.round(audio.current?.seek()) || 0)
    }, 500)

    return function cleanup() {
      clearInterval(update)
    }
  }, [audio])

  return (
    <div className={styles.player}>
      <span className={styles.player_screen}>
        <span className={styles.player_screen_songTimer}>
          {audio.current?.duration()}
        </span>
        <span className={styles.player_screen_songInfo}>
          {artist} - {song}
        </span>
      </span>
      <span className={styles.player_controls}>
        <span className={styles.player_controls_prev}>Prev</span>
        <span
          className={styles.player_controls_play}
          onClick={() => {
            audio.current.play()
          }}
        >
          Play
        </span>
        <span
          className={styles.player_controls_pause}
          onClick={() => audio.current.pause()}
        >
          pause
        </span>
        <span
          className={styles.player_controls_stop}
          onClick={() => audio.current.stop()}
        >
          Stop
        </span>
        <span className={styles.player_controls_next}>Next</span>
        <FontAwesomeIcon
          className={styles.icon}
          icon={faShuffle}
          onClick={shuffle}
        />
        <span className={styles.player_controls_progress}>
          {currentPlayed} of {audio.current?.duration() || 0}
        </span>
      </span>
    </div>
  )
}

export default Player
