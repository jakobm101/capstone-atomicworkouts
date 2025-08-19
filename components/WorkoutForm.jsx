import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import { uid } from "uid";
import Card from "./Card";
import styled from "styled-components";
import { Trash } from "lucide-react";

export default function WorkoutForm({ onSubmit, defaultValue }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [workoutPreview, setWorkoutPreview] = useState({
    workoutName: defaultValue?.name ?? "New Workout",
    exercises: defaultValue?.exercises ?? [{ _id: uid(), exercise: "" }],
  });

  const { data: exercises, isLoading, error } = useSWR(`/api/exercises`);

  if (isLoading) {
    return <div>Loading exercises...</div>;
  }
  if (error) {
    return <div>Error loading exercises: {error.message}</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!workoutPreview.exercises) { 
      // pop up: please add exercises
    }

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const newExercisesList = workoutPreview.exercises.map((_, index) => {
      return {
        exercise: data[`exercise-${index}`],
        sets: data[`sets-exercise-${index}`] || 4,
        reps: data[`reps-exercise-${index}`] || 8,
      };
    });

    const workoutInSubmit = {
      name: data.workoutName,
      exercises: newExercisesList,
    };

    onSubmit(workoutInSubmit);
  };

  const handleSelect = (id, selectedExerciseId) => {
    let newExercises = workoutPreview.exercises.map((exercise) =>
      exercise._id === id
        ? { ...exercise, exercise: selectedExerciseId }
        : exercise
    );

    setWorkoutPreview({
      ...workoutPreview,
      exercises: newExercises,
    });
  };

  const handleDeleteExercise = ({ _id }) => {
    const newExercises = workoutPreview.exercises.filter(
      (exercise) => exercise._id !== _id
    );
    setWorkoutPreview({ ...workoutPreview, exercises: newExercises });
  };

  const handleAddExercise = () => {
    const newExercises = [
      ...workoutPreview.exercises,
      { _id: uid(), exercise: "" },
    ];
    setWorkoutPreview({ ...workoutPreview, exercises: newExercises });
  };

  const handleNameChange = (event) => {
    setWorkoutPreview({ ...workoutPreview, workoutName: event.target.value });
  };

  const handleSetChange = (event, id) => {
    const newWorkoutPreviewExercises = workoutPreview.exercises.map(
      (exercise) =>
        exercise._id === id
          ? { ...exercise, sets: event.target.value }
          : exercise
    );
    setWorkoutPreview({
      ...workoutPreview,
      exercises: newWorkoutPreviewExercises,
    });
  };

  const handleRepsChange = (event, id) => {
    const newWorkoutPreviewExercises = workoutPreview.exercises.map(
      (exercise) =>
        exercise._id === id
          ? { ...exercise, reps: event.target.value }
          : exercise
    );

    setWorkoutPreview({
      ...workoutPreview,
      exercises: newWorkoutPreviewExercises,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* NAME */}
      <label htmlFor="workoutName">Name</label>
      <input
        type="text"
        name="workoutName"
        placeholder="enter workout name"
        value={workoutPreview.workoutName}
        onChange={(event) => handleNameChange(event)}
        required
      />
      <p>————————</p>

      {/* EXERCISES */}
      {workoutPreview.exercises.map((exerciseInWorkout, index) => {
        return (
          <Card key={index}>
            <h5>Exercise</h5>
            <select
              name={`exercise-${index}`}
              value={
                exerciseInWorkout.exercise?._id || exerciseInWorkout.exercise
              }
              onChange={(event) =>
                handleSelect(exerciseInWorkout._id, event.target.value)
              }
              required
            >
              <option value="">Select exercise</option>
              {exercises.map(({ _id, name: exerciseName }) => {
                return (
                  <option value={_id} key={_id}>
                    {exerciseName}
                  </option>
                );
              })}
            </select>
            <div>
              {/* Sets */}
              <InputWrapper>
                <label htmlFor={`sets-exercise-${index}`}>Sets</label>
                <StyledInput
                  type="number"
                  name={`sets-exercise-${index}`}
                  placeholder="4"
                  maxLength="1"
                  minLength="1"
                  min="1"
                  max="9"
                  value={exerciseInWorkout.sets}
                  onChange={(event) =>
                    handleSetChange(event, exerciseInWorkout._id)
                  }
                />
              </InputWrapper>

              {/* Reps */}
              <InputWrapper>
                <label htmlFor={`reps-exercise-${index}`}>Reps</label>
                <StyledInput
                  type="number"
                  name={`reps-exercise-${index}`}
                  placeholder="8"
                  maxLength="2"
                  minLength="1"
                  min="1"
                  max="32"
                  value={exerciseInWorkout.reps}
                  onChange={(event) =>
                    handleRepsChange(event, exerciseInWorkout._id)
                  }
                />
              </InputWrapper>
            </div>

            {/* delete exercise */}
            <StyledDelete
              type="button"
              onClick={() => handleDeleteExercise(exerciseInWorkout)}
            >
              <Trash size={16} />
            </StyledDelete>
          </Card>
        );
      })}
      <button type="button" onClick={handleAddExercise}>
        add exercise
      </button>

      {/* BUTTONS */}
      <div>
        <p>————————</p>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Submit"}
        </button>
        <button type="button" onClick={router.back}>
          Cancel
        </button>
      </div>
    </form>
  );
}

const InputWrapper = styled.div`
  margin-right: 5px;
  padding-right: 5px;
  display: inline-block;
`;

const StyledDelete = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  border: none;
  box-shadow: none;
  cursor: pointer;
  &:hover {
    border: none;
    box-shadow: none;
  }
`;

const StyledInput = styled.input`
  text-align: right;
`;
