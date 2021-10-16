import Head from 'next/head'
import styles from '../styles/Home.module.sass'
import Player from '../components/player'
import SearchAndResults from '../components/search-and-results'
import Playlist from '../components/playlist'
import { useEffect, useState } from 'react'
import {
    SONGS_LOCAL_STORAGE_KEY,
    SONGS_URL,
} from '../components/helpers/constants'
import axios from 'axios'
import { musicFilenameParser } from '@/components/helpers/filename-parser'

export default function Home() {
    const [files, setFiles] = useState([])

    const parseFiles = (files) => {
        const lines = files.split('\n')
        const songs = lines.map(musicFilenameParser)
        setFiles(songs)
        console.log(songs.slice(0, 10))
    }

    useEffect(() => {
        const filenames = localStorage.getItem(SONGS_LOCAL_STORAGE_KEY)
        if (filenames) {
            parseFiles(filenames)
            return
        }

        axios.get(SONGS_URL).then(({ data }) => {
            localStorage.setItem(SONGS_LOCAL_STORAGE_KEY, data)
            parseFiles(data)
        })
    }, [])

    return (
        <div className={styles.container}>
            <Head>
                <title>Musical Conquest</title>
                <meta name="description" content="Musical Conquest" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.main}>
                <div className={styles.left}>
                    <Player />
                    <SearchAndResults />
                </div>
                <div className={styles.right}>
                    <Playlist />
                </div>
            </div>
        </div>
    )
}
