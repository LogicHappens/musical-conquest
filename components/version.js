import packageInfo from '../package.json'
const { version } = packageInfo

const Version = () => (
  <a
    href="https://github.com/LogicHappens/musical-conquest/releases"
    target="_blank"
    rel="noreferrer"
  >
    v{version}
  </a>
)

export default Version
