const ExerciseList = ({ data }) => {
  return (
    <>
      {data?.map((exercise) => (
        <p key={exercise._id}>{exercise.name}</p>
      ))}
    </>
  );
};

export default ExerciseList;
