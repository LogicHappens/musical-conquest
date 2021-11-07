import styles from '../../styles/playlist.module.sass'

const PlaylistSong = ({
  catalogEntry: { song: { artist = '', song = '' }, images } = {
    song: {},
    images: [],
  },
}) => {
  return (
    <li className={styles.playlist_list_song}>
      <span className={styles.song_artist}>{artist}</span>
      <span className={styles.song_name}>{song}</span>
      <span className={styles.song_image}>
        {images[0] && (
          <img width="20" height="20" alt="artist image" src={images[0].url} />
        )}
      </span>
      <span className={styles.song_actions}>
        <a href="#" className={styles.playlist_song_actions_remove}>
          X
        </a>
      </span>
    </li>
  )
}

export default PlaylistSong
