import { useCallback } from 'react'
import styles from '../../styles/playlist.module.sass'
import PlaylistHeader from './playlist-header'
import PlaylistSong from './playlist-song'

const Playlist = ({ title, catalogEntries }) => {
  const playlistItems = useCallback(() => {
    return catalogEntries.map((entry, i) => (
      <PlaylistSong key={i} catalogEntry={entry} />
    ))
  }, [catalogEntries])

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
        {playlistItems()}
      </ul>
    </>
  )
}

export default Playlist
