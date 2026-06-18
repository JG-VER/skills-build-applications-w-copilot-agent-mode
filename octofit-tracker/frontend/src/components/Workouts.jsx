import CollectionView from './CollectionView'

const columns = [
  { key: 'name', label: 'Workout', accessor: (workout) => workout.name },
  { key: 'category', label: 'Category', accessor: (workout) => workout.category },
  { key: 'difficulty', label: 'Difficulty', accessor: (workout) => workout.difficulty },
  { key: 'durationMinutes', label: 'Minutes', accessor: (workout) => workout.durationMinutes },
  { key: 'targetMuscles', label: 'Targets', accessor: (workout) => workout.targetMuscles },
  { key: 'description', label: 'Description', accessor: (workout) => workout.description },
]

function Workouts() {
  return (
    <CollectionView
      resource="workouts"
      title="Workouts"
      description="Personalized workout suggestions and training focus areas."
      columns={columns}
      renderCard={(workout) => (
        <>
          <h2>{workout.name}</h2>
          <p>{workout.category}</p>
          <dl>
            <div><dt>Difficulty</dt><dd>{workout.difficulty}</dd></div>
            <div><dt>Duration</dt><dd>{workout.durationMinutes} min</dd></div>
            <div><dt>Targets</dt><dd>{Array.isArray(workout.targetMuscles) ? workout.targetMuscles.join(', ') : workout.targetMuscles}</dd></div>
          </dl>
        </>
      )}
    />
  )
}

export default Workouts