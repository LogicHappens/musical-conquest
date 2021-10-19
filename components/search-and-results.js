import styles from '../styles/search.module.sass'
import SearchResult from './search-result'

const SearchAndResults = () => {
  return (
    <div className={styles.search}>
      <input type="text" placeholder="search..."></input>
      <ul className={styles.results}>
        <p>No search results</p>
        <li className={(styles.results_result, styles.results_headers)}>
          <span className={styles.result_artist}>Artist</span>
          <span className={styles.result_name}>Name</span>
          <span className={styles.result_actions}>Actions</span>
        </li>
        <SearchResult artist="Captain Tip" songName="My ding ding dong" />
        <SearchResult artist="Captain Tip" songName="my shaba daba daba dai" />
      </ul>
    </div>
  )
}

export default SearchAndResults
