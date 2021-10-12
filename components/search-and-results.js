import styles from '../styles/search.module.sass'

const SearchAndResults = () => {
    return(
        <div className={styles.search}>
            <input type="text" placeholder="search..."></input>
            <ul className={styles.results}>
                <p>No search results</p>
                <li className={styles.results_result, styles.results_headers}>
                    <span className={styles.result_artist}>Artist</span>
                    <span className={styles.result_name}>Name</span>
                    <span className={styles.result_actions}>Actions</span>
                </li>
                <li className={styles.results_result}>
                    <span className={styles.result_artist}>Captain Tip</span>
                    <span className={styles.result_name}>My ding ding dong</span>
                    <span className={styles.result_actions}>
                        <a href="#" className={styles.result_actions_add}>+</a>
                    </span>
                </li>
                <li className={styles.results_result}>
                    <span className={styles.result_artist}>Captain Tip</span>
                    <span className={styles.result_name}>my shaba daba daba dai</span>
                    <span className={styles.result_actions}>
                        <a href="#" className={styles.result_actions_add}>+</a>
                    </span>
                </li>
            </ul>
        </div>
    )
}

export default SearchAndResults
