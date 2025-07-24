import Form__ExerciseNestedForm from "./Form__ExerciseNestedForm";
import Card__AddExercise from "./Card__AddExercise";
import Form__Input from "./Form__Input";
import { useState } from "react";
import ButtonClose from "../Button/ButtonClose";
import useSWR from "swr";
import { uid } from "uid";
import styled from "styled-components";
import Card from "../Atoms/Card";
import HeadingTiny from "../Atoms/Text/HeadingTiny";

export default function Form() {
  const { mutate } = useSWR(`/api/workouts`);
  //preparing for updating {id, rep, set}
  const [exercises, setExercises] = useState([{ tempId: 1 }, { tempId: 2 }]);

  const handleAddExercise = () => {
    setExercises([...exercises, { tempId: uid() }]);
  };
  const handleRemoveExercise = (id) => {
    setExercises(exercises.filter((exercise) => exercise.tempId !== id));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const workout = {
      name: data.name,
      exercises: exercises.map((_, index) => {
        return {
          exerciseId: data[`${index + 1}-exercise`],
          reps: data[`${index + 1}-reps`],
          sets: data[`${index + 1}-sets`],
        };
      }),
    };
    console.log(workout);

    const response = await fetch(`/api/workouts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workout),
    });
    if (response.ok) mutate();

    event.target.reset();
  };

  return (
    <StyledDiv>
      <StyledClose href="/" />
      <h1>Workout Form</h1>
      <form onSubmit={handleSubmit}>
        <Form__Input name="name" required>
          Workout Name
        </Form__Input>
        <HeadingTiny>Exercises</HeadingTiny>
        <StyledCard>
          {exercises.map((exercise) => (
            <Form__ExerciseNestedForm
              tempId={exercise.tempId}
              name={exercise.tempId}
              key={exercise.tempId}
              onDelete={handleRemoveExercise}
            />
          ))}
          <Card__AddExercise onClick={handleAddExercise} />
        </StyledCard>
        <button type="submit">submit</button>
        <button type="reset">reset</button>
      </form>
    </StyledDiv>
  );
}

const StyledClose = styled(ButtonClose)`
  color: var(--color-orange-10);
  position: absolute;
  right: 0;
  top: 0;
`;

const StyledDiv = styled.div`
  position: relative;
`;

const StyledCard = styled(Card)`
  margin: 0;
  padding: 0;
`;
