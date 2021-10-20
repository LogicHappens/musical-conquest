import Head from 'next/head'
import styles from '../styles/Home.module.sass'
import Player from '../components/player'
import SearchAndResults from '../components/search-and-results'
import Playlist from '../components/playlist'
import { useCallback, useContext, useEffect, useState } from 'react'
import { SONGS_BASE_URL } from '../components/helpers/constants'
import { Howl } from 'howler'
import { useRouter } from 'next/router'
import { Context } from '../components/helpers/context'

export default function Home() {
  const { audio, setAudio, catalog, currentSongHash, setCurrentSong } =
    useContext(Context)
  const router = useRouter()

  const getUrlSongHash = useCallback(
    () => router.asPath.split('/#')[1],
    [router.asPath],
  )

  const [lastHash, setLastHash] = useState(getUrlSongHash())

  useEffect(() => {
    if (currentSongHash === '') return
    const catalogItem = catalog.get(currentSongHash)
    const { song } = catalogItem
    setCurrentSong(catalogItem)

    const songUrl =
      SONGS_BASE_URL + encodeURIComponent(song.filename) + '.' + song.extension

    if (audio) audio.unload()
    const howl = new Howl({
      src: [songUrl],
      html5: true,
      preload: 'metadata',
    })
    howl.play()

    setAudio(howl)

    if (lastHash !== song.hash) {
      router.push(`/#${song.hash}`, undefined, { shallow: true })
      setLastHash(song.hash)
    }

    return function cleanup() {
      howl.unload()
    }
  }, [catalog, currentSongHash, lastHash, router, setCurrentSong])

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
