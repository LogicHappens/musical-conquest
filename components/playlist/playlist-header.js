import styles from '../../styles/playlist.module.sass'

const PlaylistHeader = () => {
  return (
    <li className={styles.playlist_list_headers}>
      <span className={styles.song_artist}>Artist</span>
      <span className={styles.song_name}>Song Name</span>
      <span className={styles.song_image}>Image</span>
      <span className={styles.song_actions}>Actions</span>
    </li>
  )
}

export default PlaylistHeader
