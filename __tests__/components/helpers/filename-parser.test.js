import {
  filenameParser,
  musicFilenameParser,
} from '../../../components/helpers/filename-parser'

describe('filenameParser', () => {
  const filename = 'hello-world.txt'
  const { file, extension } = filenameParser(filename)

  it('has the right filename', () => {
    expect(file).toEqual('hello-world')
  })

  it('has the correct extension', () => {
    expect(extension).toEqual('txt')
  })
})

describe('musicFilenameParser', () => {
  describe('jpg image', () => {
    const filename =
      "Chloe Stafler - Si Jamais J'oublie by ZAZ (Piano Cover by Chloe Stafler) - bc736559378211bed4a6c0d1d4aff085_original - VTzZn3RKrJy.jpg"
    const info = musicFilenameParser(filename)

    it('has matching info', () => {
      expect(info).toMatchInlineSnapshot(`
        Object {
          "artist": "Chloe Stafler",
          "extension": "jpg",
          "filename": "Chloe Stafler - Si Jamais J'oublie by ZAZ (Piano Cover by Chloe Stafler) - bc736559378211bed4a6c0d1d4aff085_original - VTzZn3RKrJy",
          "hash1": "bc736559378211bed4a6c0d1d4aff085_original",
          "hash2": "VTzZn3RKrJy",
          "isSong": false,
          "song": "Si Jamais J'oublie by ZAZ (Piano Cover by Chloe Stafler)",
        }
      `)
    })
  })

  describe('mpg song', () => {
    const filename =
      '30 Seconds to Mars - Stronger (Kanye West cover) (Live BBC Radio 1 Live Lounge) - zJEy6UMCM2z.mp3'
    const info = musicFilenameParser(filename)

    it('has matching info', () => {
      expect(info).toMatchInlineSnapshot(`
        Object {
          "artist": "30 Seconds to Mars",
          "extension": "mp3",
          "filename": "30 Seconds to Mars - Stronger (Kanye West cover) (Live BBC Radio 1 Live Lounge) - zJEy6UMCM2z",
          "hash1": "zJEy6UMCM2z",
          "hash2": undefined,
          "isSong": true,
          "song": "Stronger (Kanye West cover) (Live BBC Radio 1 Live Lounge)",
        }
      `)
    })
  })
})
