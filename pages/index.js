import Head from 'next/head'
import styles from '../styles/Home.module.sass'
import Player from '../components/player'
import SearchAndResults from '../components/search-and-results'
// import Playlists from '../components/playlist/playlists'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Howl } from 'howler'
import { useRouter } from 'next/router'
import { Context } from '../components/helpers/context'
import { getRandomInt } from '@/lib/random'
import GithubBadge from '@/components/github-badge'
import Version from '@/components/version'

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
      /// Dirty <script> global from _app.js
      // eslint-disable-next-line no-undef
      if (typeof goatcounter !== 'undefined') {
        // eslint-disable-next-line no-undef
        goatcounter.count({
          path: location.pathname + location.search + location.hash,
        })
      }
      router.push(`/#${currentSongHash}`, undefined, { shallow: true })
    }
  }, [currentSongHash, lastHash, router])

  // Play Song
  useEffect(() => {
    if (currentSong === undefined) return

    const howl = new Howl({
      src: [currentSong.song.url],
      html5: true,
      preload: 'metadata',
    })

    howl.play()
    setAudio(howl)

    return () => {
      howl.unload()
    }
  }, [currentSong, setAudio])

  const randomImage = useMemo(() => {
    if (!currentSong?.images) return false
    const key = getRandomInt(0, currentSong?.images.length - 1)
    const image = currentSong?.images[key]
    return image?.url || ''
  }, [currentSong?.images])

  return (
    <div className={styles.container}>
      <Head>
        <title>Musical Conquest</title>
        <meta name="description" content="Musical Conquest" />
        <link
          rel="icon"
          type="image/svg+xml"
          href="imgs/logo.svg"
          sizes="any"
        />
      </Head>

      <div className={styles.logo}>Musical Conquest</div>
      <div className={styles.infos}>
        <GithubBadge />
        <Version />
      </div>

      {randomImage && (
        <img
          src={randomImage}
          className={styles.background_image}
          alt="Background image"
        />
      )}

      <div className={styles.main}>
        <div className={styles.left}>
          <div className={styles.wrapper}>
            <Player />
            <SearchAndResults />
          </div>
        </div>
        {/* <div className={styles.right}>
          <Playlists />
        </div> */}
      </div>
    </div>
  )
}
