import styles from '../../styles/playlist.module.sass'
import Playlist from './playlist'
import { hydrateFromHashes } from '../helpers/playlist'
import { Context } from '@/components/helpers/context'
import { useContext } from 'react'

const Playlists = () => {
  const { catalog } = useContext(Context)

  return (
    <div className={styles.playlist}>
      <div className={styles.playlist_controls}>
        <a href="#" className={styles.playlist_controls_add}>
          Add Playlist
        </a>
      </div>

      <Playlist
        title="Hydrated"
        catalogEntries={hydrateFromHashes(
          [
            'awAvrAC167S',
            '5rX1HCZFjew',
            '55FJiPJSZS0',
            'C6Q7KpkfuJ3',
            '830zrnBIkZG',
            'UFlWDpGnRId',
          ],
          catalog,
        )}
      />

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
