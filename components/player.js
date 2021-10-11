import styles from '../styles/player.module.sass'
import { useState } from 'react'


const Player = () => {
    const [counter, setCounter] = useState(0)

    return(
        <div className={styles.player}>
            <span className={styles.player_screen}>
                <span className={styles.player_screen_songTimer}>Song Timer</span>
                <span className={styles.player_screen_songInfo}>Song Info</span>
            </span>
            <span className={styles.player_controls}>
                <span className={styles.player_controls_prev}>Prev</span>
                <span className={styles.player_controls_play}>Play</span>
                <span className={styles.player_controls_pause}>pause</span>
                <span className={styles.player_controls_stop}>Stop</span>
                <span className={styles.player_controls_next}>Next</span>
            </span>
        </div>
    )
}

export default Player
