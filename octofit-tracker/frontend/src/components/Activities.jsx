import CollectionView from './CollectionView'

const columns = [
  { key: 'username', label: 'User', accessor: (activity) => activity.username },
  { key: 'activityType', label: 'Activity', accessor: (activity) => activity.activityType },
  { key: 'durationMinutes', label: 'Minutes', accessor: (activity) => activity.durationMinutes },
  { key: 'caloriesBurned', label: 'Calories', accessor: (activity) => activity.caloriesBurned },
  { key: 'pointsEarned', label: 'Points', accessor: (activity) => activity.pointsEarned },
  { key: 'completedAt', label: 'Completed', accessor: (activity) => activity.completedAt },
]

function Activities() {
  return (
    <CollectionView
      resource="activities"
      title="Activities"
      description="Recent movement logged by Octofit members."
      columns={columns}
      renderCard={(activity) => (
        <>
          <h2>{activity.activityType}</h2>
          <p>{activity.username}</p>
          <dl>
            <div><dt>Duration</dt><dd>{activity.durationMinutes} min</dd></div>
            <div><dt>Calories</dt><dd>{activity.caloriesBurned}</dd></div>
            <div><dt>Points</dt><dd>{activity.pointsEarned}</dd></div>
          </dl>
        </>
      )}
    />
  )
}

export default Activities