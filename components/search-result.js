import { useContext } from 'react'
import styles from '../styles/search.module.sass'
import { Context } from '@/components/helpers/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

const SearchResult = ({ hash, artist, songName }) => {
  const { setCurrentSongHash } = useContext(Context)

  return (
    <li className={styles.results_result}>
      <span className={styles.result_artist}>{artist}</span>
      <span className={styles.result_name}>{songName}</span>
      <span className={styles.result_actions}>
        <button
          className={styles.result_actions_play}
          onClick={() => setCurrentSongHash(hash)}
        ></button>
        <button className={styles.result_actions_add}></button>
      </span>
    </li>
  )
}

export default SearchResult
