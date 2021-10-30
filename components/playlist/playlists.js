import styles from '../../styles/playlist.module.sass'
import Playlist from './playlist'

const Playlists = () => {
  return (
    <div className={styles.playlist}>
      <div className={styles.playlist_controls}>
        <a href="#" className={styles.playlist_controls_add}>
          Add Playlist
        </a>
      </div>

      <Playlist
        title="Playlist Schuan"
        catalogEntries={[
          {
            song: { artist: 'Jebus', song: 'Touch my tralala' },
            images: ['pronz.jpg'],
          },
          {
            song: { artist: 'Jebus', song: 'Touch my tralala' },
            images: ['pronz.jpg'],
          },
        ]}
      />

      <Playlist
        title="Playlist Two and heif"
        catalogEntries={[
          {
            song: { artist: 'Jebus', song: 'Touch my tralala' },
            images: ['pronz.jpg'],
          },
          {
            song: { artist: 'Jebus', song: 'Touch my tralala' },
            images: ['pronz.jpg'],
          },
        ]}
      />
    </div>
  )
}

export default Playlists
