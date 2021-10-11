import styles from '../styles/playlist.module.sass'

const Playlist = () => {
    return(
        <div className={styles.playlist}>
            <div className={styles.playlist_controls}>
                <a href="#" className={styles.playlist_controls_add}>Add Playlist</a>
            </div>
            <div className={styles.playlist_header}>
                <h2 className={styles.playlist_header_name}>Playlist Name</h2>
                <a href="#" className={styles.playlist_header_edit}>E</a>
                <a href="#" className={styles.playlist_header_remove}>X</a>
            </div>
            <ul className={styles.playlist_list}>
                <li class={styles.playlist_list_headers}>
                    <span className={styles.song_artist}>Artist</span>
                    <span className={styles.song_name}>Song Name</span>
                    <span className={styles.song_hash}>Hash</span>
                    <span className={styles.song_image}>Image</span>
                    <span className={styles.song_actions}>Actions</span>
                </li>
                <li class={styles.playlist_list_song}>
                    <span className={styles.song_artist}>Jebus</span>
                    <span className={styles.song_name}>Touch my tralala</span>
                    <span className={styles.song_hash}>we even need this shit?</span>
                    <span className={styles.song_image}>pr0nz.jpg</span>
                    <span className={styles.song_actions}>Actions
                        <a href="#" className={styles.playlist_song_remove}>Remove Song -</a>
                    </span>
                </li>
                <li class={styles.playlist_list_song}>
                    <span className={styles.song_artist}>Jebus</span>
                    <span className={styles.song_name}>Touch my tralala</span>
                    <span className={styles.song_hash}>we even need this shit?</span>
                    <span className={styles.song_image}>pr0nz.jpg</span>
                    <span className={styles.song_actions}>Actions
                        <a href="#" className={styles.playlist_song_remove}>Remove Song -</a>
                    </span>
                </li>
            </ul>
        </div>
    )
}

export default Playlist
