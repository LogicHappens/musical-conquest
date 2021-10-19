import styles from '../styles/search.module.sass'

const SearchResult = ({ artist, songName }) => {
  return (
    <li className={styles.results_result}>
      <span className={styles.result_artist}>{artist}</span>
      <span className={styles.result_name}>{songName}</span>
      <span className={styles.result_actions}>
        <a href="#" className={styles.result_actions_add}>
          +
        </a>
      </span>
    </li>
  )
}

export default SearchResult
