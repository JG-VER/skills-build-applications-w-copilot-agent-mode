import CollectionView from './CollectionView'
import { getApiEndpoint } from '../api'

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : getApiEndpoint('leaderboard')

const columns = [
  { key: 'rank', label: 'Rank', accessor: (entry) => entry.rank },
  { key: 'username', label: 'User', accessor: (entry) => entry.username },
  { key: 'teamName', label: 'Team', accessor: (entry) => entry.teamName },
  { key: 'totalPoints', label: 'Total Points', accessor: (entry) => entry.totalPoints },
  { key: 'weeklyActivities', label: 'Weekly Activities', accessor: (entry) => entry.weeklyActivities },
]

function Leaderboard() {
  return (
    <CollectionView
      endpoint={leaderboardEndpoint}
      title="Leaderboard"
      description="Competitive standings across users and teams."
      columns={columns}
      renderCard={(entry) => (
        <>
          <h2>#{entry.rank} {entry.username}</h2>
          <p>{entry.teamName}</p>
          <dl>
            <div><dt>Total points</dt><dd>{entry.totalPoints}</dd></div>
            <div><dt>Weekly activities</dt><dd>{entry.weeklyActivities}</dd></div>
          </dl>
        </>
      )}
    />
  )
}

export default Leaderboard