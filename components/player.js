import styles from '../styles/player.module.sass'

const Player = ({
  song: {
    song: {
      artist = 'asdf',
      song = 'qwerty',
      hash1,
      hash2,
      filename,
      extension,
      isSong,
    } = {},
  } = {},
  audio,
}) => {
  return (
    <div className={styles.player}>
      <span className={styles.player_screen}>
        <span className={styles.player_screen_songTimer}>
          {audio?.duration()}
        </span>
        <span className={styles.player_screen_songInfo}>
          {artist} - {song}
        </span>
      </span>
      <span className={styles.player_controls}>
        <span className={styles.player_controls_prev}>Prev</span>
        <span
          className={styles.player_controls_play}
          onClick={() => audio.play()}
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
        <span className={styles.player_controls_progress}>
          {audio?.seek() || 0} of {audio?.duration() || 0}
        </span>
      </span>
    </div>
  )
}

export default Player
