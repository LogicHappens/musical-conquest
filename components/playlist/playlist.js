import styles from '../../styles/playlist.module.sass'
import PlaylistHeader from './playlist-header'
import PlaylistSong from './playlist-song'

const Playlist = ({ title }) => {
  return (
    <>
      <div className={styles.playlist_header}>
        <h2 className={styles.playlist_header_name}>{title}</h2>
        <a href="#" className={styles.playlist_header_edit}>
          E
        </a>
        <a href="#" className={styles.playlist_header_remove}>
          X
        </a>
      </div>

      <ul className={styles.playlist_list}>
        <PlaylistHeader />
        <PlaylistSong
          catalogEntry={{
            song: { artist: 'Jebus', song: 'Touch my tralala' },
            images: ['pronz.jpg'],
          }}
        />
        <PlaylistSong
          catalogEntry={{
            song: { artist: 'Jebus', song: 'Touch my tralala' },
            images: ['pronz.jpg'],
          }}
        />
      </ul>
    </>
  )
}

export default Playlist
