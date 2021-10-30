import { useContext, useEffect, useState } from 'react'
import styles from '../styles/player.module.sass'
import { Context } from '@/components/helpers/context'
import timeFormatter from './helpers/time-formatter'
import { Howl as _Howl } from 'howler'

const Player = () => {
  /** @type {{audio: _Howl}} */
  const {
    audio,
    currentDuration,
    duration,
    currentSong: { song: { artist = '', song = '' } = {} } = {},
    shuffle,
    play,
  } = useContext(Context)

  const [currentProgress, setCurrentProgress] = useState(0)

  const sliderUpdate = (event) => {
    const value = event.target.value
    setCurrentProgress(value)
  }

  useEffect(() => {
    setCurrentProgress(currentDuration)
  }, [currentDuration])

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
            onMouseUp={() => audio.seek(currentProgress)}
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
            min="0"
            max="100"
            defaultValue="100"
            onChange={(event) => audio.volume(event.target.value / 100)}
          />
        </span>
      </span>
    </div>
  )
}

export default Player
