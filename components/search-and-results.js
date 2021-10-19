import styles from '../styles/search.module.sass'
import SearchResult from './search-result'
import { debounce } from './helpers/debounce'
import { useCallback, useState } from 'react'

const SearchAndResults = ({ catalog }) => {
  const [matches, setMatches] = useState([])
  const [results, setResults] = useState(<></>)

  const buildResults = (results) => {
    return results.map((result, i) => {
      return (
        <SearchResult key={i} artist={result.artist} songName={result.song} />
      )
    })
  }

  const onSearchHandler = (event) => {
    const search = event.target.value.toLowerCase()
    const found = []
    catalog.forEach(({ song }) => {
      if (Object.keys(song).length === 0) return
      const artistMatch = song?.artist?.toLowerCase().includes(search)
      const songMatch = song?.song?.toLowerCase().includes(search)
      if (artistMatch || songMatch) found.push(song)
    })

    setMatches(found)
    setResults(buildResults(found))
  }

  const matchText = useCallback(() => {
    return matches.length === 0
      ? 'No search results'
      : `${matches.length} result${matches.length > 1 ? 's' : ''}`
  }, [matches.length])

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="search..."
        onChange={debounce(onSearchHandler, 500)}
      ></input>
      <ul className={styles.results}>
        <p>{matchText()}</p>
        <li className={(styles.results_result, styles.results_headers)}>
          <span className={styles.result_artist}>Artist</span>
          <span className={styles.result_name}>Name</span>
          <span className={styles.result_actions}>Actions</span>
        </li>
        {results}
      </ul>
    </div>
  )
}

export default SearchAndResults
