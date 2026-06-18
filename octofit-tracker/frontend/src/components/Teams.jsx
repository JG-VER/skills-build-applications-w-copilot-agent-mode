import CollectionView from './CollectionView'
import { getApiEndpoint } from '../api'

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : getApiEndpoint('teams')

const columns = [
  { key: 'name', label: 'Team', accessor: (team) => team.name },
  { key: 'mascot', label: 'Mascot', accessor: (team) => team.mascot },
  { key: 'captain', label: 'Captain', accessor: (team) => team.captain },
  { key: 'memberCount', label: 'Members', accessor: (team) => team.memberCount },
  { key: 'weeklyPoints', label: 'Weekly Points', accessor: (team) => team.weeklyPoints },
]

function Teams() {
  return (
    <CollectionView
      endpoint={teamsEndpoint}
      title="Teams"
      description="Team rosters, captains, and weekly momentum."
      columns={columns}
      renderCard={(team) => (
        <>
          <h2>{team.name}</h2>
          <p>{team.mascot}</p>
          <dl>
            <div><dt>Captain</dt><dd>{team.captain}</dd></div>
            <div><dt>Members</dt><dd>{team.memberCount}</dd></div>
            <div><dt>Weekly points</dt><dd>{team.weeklyPoints}</dd></div>
          </dl>
        </>
      )}
    />
  )
}

export default Teams