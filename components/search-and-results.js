import styles from '../styles/search.module.sass'
import SearchResult from './search-result'
import { debounce } from './helpers/debounce'
import { useCallback, useContext, useEffect, useState } from 'react'
import { Context } from '@/components/helpers/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from '@fortawesome/free-solid-svg-icons'

const SearchAndResults = () => {
  const { catalog } = useContext(Context)
  const [matches, setMatches] = useState([])
  const [results, setResults] = useState(<></>)
  const [pageNumber, setPageNumber] = useState(1)

  const perPage = 5
  const maxPages = useCallback(
    () => Math.ceil(matches.length / perPage),
    [matches.length],
  )

  const pageEndIndex = useCallback(() => {
    return perPage * pageNumber
  }, [pageNumber])
  const pageStartIndex = useCallback(
    () => pageEndIndex() - perPage,
    [pageEndIndex],
  )

  const paginationHandlers = {
    first() {
      setPageNumber(1)
    },
    previous() {
      if (pageNumber > 1) setPageNumber((val) => val - 1)
    },
    next() {
      if (pageNumber < maxPages()) setPageNumber((val) => val + 1)
    },
    last() {
      setPageNumber(maxPages())
    },
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
    setPageNumber(1)
  }

  const matchText = useCallback(() => {
    return matches.length === 0
      ? 'No search results'
      : `${matches.length} result${matches.length > 1 ? 's' : ''}`
  }, [matches.length])

  const buildResults = useCallback(() => {
    return matches.slice(pageStartIndex(), pageEndIndex()).map((result, i) => {
      return (
        <SearchResult
          key={i}
          hash={result.hash}
          artist={result.artist}
          songName={result.song}
        />
      )
    })
  }, [matches, pageEndIndex, pageStartIndex])

  useEffect(() => {
    const results = buildResults()
    setResults(results)
  }, [buildResults, pageNumber])

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="search..."
        onChange={debounce(onSearchHandler, 500)}
      ></input>
      <div className={styles.pagination}>
        <p>{matchText()}</p>
        <ul>
          <li onClick={paginationHandlers.first}>
            <FontAwesomeIcon icon={faAnglesLeft} />
          </li>
          <li onClick={paginationHandlers.previous}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </li>
          <li>{pageNumber}</li>
          <li onClick={paginationHandlers.next}>
            <FontAwesomeIcon icon={faAngleRight} />
          </li>
          <li onClick={paginationHandlers.last}>
            <FontAwesomeIcon icon={faAnglesRight} />
          </li>
        </ul>
      </div>
      <ul className={styles.results}>
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
