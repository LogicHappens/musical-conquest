import Head from 'next/head'
import styles from '../styles/Home.module.sass'
import Player from '../components/player'
import SearchAndResults from '../components/search-and-results'
import Playlist from '../components/playlist'
import { useEffect, useState } from 'react'
import {
  SONGS_BASE_URL,
  SONGS_LOCAL_STORAGE_KEY,
  SONGS_URL,
} from '../components/helpers/constants'
import axios from 'axios'
import { musicFilenameParser } from '@/components/helpers/filename-parser'
import { Howl } from 'howler'
import { catalogSongs } from '@/components/helpers/catalog-songs'

export default function Home() {
  const [files, setFiles] = useState([])
  const [currentSong, setCurrentSong] = useState({})
  const [audio, setAudio] = useState()

  const parseFiles = (files) => files.split('\n').map(musicFilenameParser)

  useEffect(() => {
    const filenames = localStorage.getItem(SONGS_LOCAL_STORAGE_KEY)
    if (filenames) {
      const songs = parseFiles(filenames)
      const catalog = catalogSongs(songs)
      const keys = Array.from(catalog.keys())
      const randomKey = keys[Math.floor(Math.random() * keys.length)]
      const randomSong = catalog.get(randomKey)

      console.log(randomKey, 'RND', randomSong)

      const songUrl =
        SONGS_BASE_URL +
        encodeURIComponent(randomSong.song.filename) +
        '.' +
        randomSong.song.extension
      console.log('SONG URL', songUrl)

      const audio = new Howl({
        src: [songUrl],
        html5: true,
        preload: 'metadata',
      })
      audio.play()

      setAudio(audio)
      setFiles(songs)
      setCurrentSong(randomSong)
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
          <Player song={currentSong} audio={audio} />
          <SearchAndResults />
        </div>
        <div className={styles.right}>
          <Playlist />
        </div>
      </div>
    </div>
  )
}
