import { useContext, useEffect, useState } from 'react'
import styles from '../styles/player.module.sass'
import { Context } from '@/components/helpers/context'
import timeFormatter from './helpers/time-formatter'

const Player = () => {
  const {
    audio,
    currentDuration,
    duration,
    currentSong: { song: { artist = '', song = '' } = {} } = {},
    shuffle,
    play,
  } = useContext(Context)

  const [currentProgress, setCurrentProgress] = useState(0)
  const [scrubbing, setScrubbing] = useState(false)

  useEffect(() => {
    if (!scrubbing) setCurrentProgress(currentDuration)
  }, [currentDuration])

  const sliderUpdate = (event) => {
    const value = event.target.value
    setCurrentProgress(value)
    if (!scrubbing) audio.seek(value)
  }

  return (
    <div className={styles.player}>
      <span className={styles.player_screen}>
        <span className={styles.player_screen_songTimer}>
          {timeFormatter(currentDuration)} - {timeFormatter(duration)}
        </span>
        <span className={styles.player_screen_songInfo}>
          {artist} - {song}
        </span>
      </span>
      <span className={styles.player_controls}>
        <div className={styles.player_controls_progressbar}>
          <input
            className={styles.slider}
            type="range"
            min={0}
            max={duration}
            onMouseDown={() => setScrubbing(true)}
            onMouseUp={() => audio.seek(currentProgress) & setScrubbing(false)}
            onChange={sliderUpdate}
            value={currentProgress}
          />
        </div>
        <span className={styles.player_controls_prev}>Prev</span>
        <span className={styles.player_controls_play} onClick={play}>
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
        <span className={styles.player_controls_shuffle} onClick={shuffle}>
          Shuffle
        </span>
        <span className={styles.player_controls_repeat}>Repeat</span>
        <span className={styles.player_controls_volume}>
          <input
            className={styles.slider}
            type="range"
            min="1"
            max="100"
            defaultValue="50"
          />
        </span>
      </span>
    </div>
  )
}

export default Player
