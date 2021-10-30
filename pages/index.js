import Head from 'next/head'
import styles from '../styles/Home.module.sass'
import Player from '../components/player'
import SearchAndResults from '../components/search-and-results'
// import Playlist from '../components/playlist'
import { useCallback, useContext, useEffect, useState } from 'react'
import { SONGS_BASE_URL } from '../components/helpers/constants'
import { Howl } from 'howler'
import { useRouter } from 'next/router'
import { Context } from '../components/helpers/context'
import { getRandomInt } from '@/lib/random';

export default function Home() {
  const { setAudio, currentSongHash, currentSong } = useContext(Context)
  const router = useRouter()

  const getUrlSongHash = useCallback(
    () => router.asPath.split('/#')[1],
    [router.asPath],
  )

  const [lastHash, setLastHash] = useState(getUrlSongHash())

  // Update URL
  useEffect(() => {
    if (currentSongHash === undefined) return

    if (lastHash !== currentSongHash) {
      setLastHash(currentSongHash)
      router.push(`/#${currentSongHash}`, undefined, { shallow: true })
    }
  }, [currentSongHash, lastHash, router])

  // Play Song
  useEffect(() => {
    if (currentSong === undefined) return

    const { song } = currentSong
    const songUrl =
      SONGS_BASE_URL + encodeURIComponent(song.filename) + '.' + song.extension

    const howl = new Howl({
      src: [songUrl],
      html5: true,
      preload: 'metadata',
    })
    // howl.play()

    setAudio(howl)

    return () => {
      howl.unload()
    }
  }, [currentSong, setAudio])

  const randomImage = useCallback(() => {
    if (!currentSong) return
    const key = getRandomInt(0, currentSong?.images.length - 1)
    const image = currentSong?.images[key]
    return `${SONGS_BASE_URL}${image?.filename}.${image?.extension}`
  }, [currentSong])

  return (
    <div className={styles.container}>
      <Head>
        <title>Musical Conquest</title>
        <meta name="description" content="Musical Conquest" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <img src={randomImage()} className={styles.background_image} alt="Background image" />

      <div className={styles.main}>
        <div className={styles.left}>
          <div className={styles.wrapper}>
            <Player />
            <SearchAndResults />
          </div>
        </div>
        {/* <div className={styles.right}>
          <Playlist />
        </div> */}
      </div>
    </div>
  )
}
