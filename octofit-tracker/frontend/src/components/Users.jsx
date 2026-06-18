import CollectionView from './CollectionView'
import { getApiEndpoint } from '../api'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : getApiEndpoint('users')

const columns = [
  { key: 'username', label: 'Username', accessor: (user) => user.username },
  { key: 'fullName', label: 'Name', accessor: (user) => user.fullName },
  { key: 'email', label: 'Email', accessor: (user) => user.email },
  { key: 'teamName', label: 'Team', accessor: (user) => user.teamName },
  { key: 'fitnessGoal', label: 'Goal', accessor: (user) => user.fitnessGoal },
  { key: 'joinedAt', label: 'Joined', accessor: (user) => user.joinedAt },
]

function Users() {
  return (
    <CollectionView
      endpoint={usersEndpoint}
      title="Users"
      description="Profiles, teams, and fitness goals for Octofit members."
      columns={columns}
      renderCard={(user) => (
        <>
          <h2>{user.fullName}</h2>
          <p>{user.username}</p>
          <dl>
            <div><dt>Email</dt><dd>{user.email}</dd></div>
            <div><dt>Team</dt><dd>{user.teamName}</dd></div>
            <div><dt>Goal</dt><dd>{user.fitnessGoal}</dd></div>
          </dl>
        </>
      )}
    />
  )
}

export default Users