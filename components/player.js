import { useContext, useEffect, useState } from 'react'
import styles from '../styles/player.module.sass'
import { Context } from '@/components/helpers/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShuffle } from '@fortawesome/free-solid-svg-icons'
import timeFormatter from './helpers/time-formatter'

const Player = () => {
  const [currentPlayed, setCurrentPlayed] = useState(0)
  const [duration, setDuration] = useState(0)

  const {
    audio,
    currentSong,
    currentSong: { song: { artist = 'LOADING', song = 'SONG' } = {} } = {},
    shuffle,
  } = useContext(Context)

  useEffect(() => {
    const update = setInterval(() => {
      setCurrentPlayed(Math.round(audio?.seek()) || 0)
    }, 500)

    return function cleanup() {
      clearInterval(update)
    }
  }, [audio])

  useEffect(() => {
    if (currentSong === undefined || audio === undefined) return
    audio.on('load', () => {
      setDuration(audio?.duration())
    })
  }, [audio, currentSong])

  return (
    <div className={styles.player}>
      <span className={styles.player_screen}>
        <span className={styles.player_screen_songTimer}>
          {timeFormatter(currentPlayed)} : {timeFormatter(duration)}
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
            audio.play()
          }}
        >
          Play
        </span>
        <span
          className={styles.player_controls_pause}
          onClick={() => audio.pause()}
        >
          pause
        </span>
        <span
          className={styles.player_controls_stop}
          onClick={() => audio.stop()}
        >
          Stop
        </span>
        <span className={styles.player_controls_next}>Next</span>
        <FontAwesomeIcon
          className={styles.icon}
          icon={faShuffle}
          onClick={shuffle}
        />
      </span>
    </div>
  )
}

export default Player
