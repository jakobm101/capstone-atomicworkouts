export function collectMuscleGroups(exercises) {
  const muscleGroups = new Set();
  exercises.forEach((exerciseInWorkout) => {
    const exercise = exerciseInWorkout.exercise || exerciseInWorkout;
    exercise.muscleGroups.forEach((muscleGroup) =>
      muscleGroups.add(muscleGroup)
    );
  });
  return [...muscleGroups];
}
