import styles from '../../styles/playlist.module.sass'
import { SONGS_BASE_URL } from '../helpers/constants'

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
        <img
          width="20"
          height="20"
          alt="artist image"
          src={SONGS_BASE_URL + images[0].filename + '.' + images[0].extension}
        />
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
