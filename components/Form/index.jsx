import { useState } from "react";
import { uid } from "uid";
import { useRouter } from "next/router";
import styled from "styled-components";

import Card from "../Atoms/Card";
import HeadingTiny from "../Atoms/Text/HeadingTiny";
import ButtonClose from "../Button/ButtonClose";
import FormInput from "./Input";
import FormExerciseNestedForm from "./ExerciseNestedForm";
import CardAddExercise from "./CardAddExercise";

import libWorkouts from "@/lib/workouts";

export default function Form({ workout = libWorkouts[0] }) {
  const { push } = useRouter();
  const [name, setName] = useState(workout ? workout.name : "");
  //preparing for updating {id, rep, set}
  const [exercises, setExercises] = useState([{ tempId: 1 }, { tempId: 2 }]);

  const handleAddExercise = () => {
    setExercises([...exercises, { tempId: uid() }]);
  };
  const handleRemoveExercise = (id) => {
    setExercises(exercises.filter((exercise) => exercise.tempId !== id));
  };

  const handleNameInput = (e) => setName(e.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const newWorkout = {
      name: data.name,
      exercises: exercises.map((_, index) => {
        return {
          exerciseId: data[`${index + 1}-exercise`],
          reps: data[`${index + 1}-reps`],
          sets: data[`${index + 1}-sets`],
        };
      }),
    };

    const response = await fetch(`/api/workouts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newWorkout),
    });
    if (response.ok) {
      event.target.reset();
      push(`/`);
    }
  };

  return (
    <StyledDiv>
      <StyledClose href="/" />
      <h1>Workout Form</h1>
      <form onSubmit={handleSubmit}>
        <FormInput name="name" required value={name} onChange={handleNameInput}>
          Workout Name
        </FormInput>
        <HeadingTiny>Exercises</HeadingTiny>
        <StyledCard>
          {exercises.map((exercise) => (
            <FormExerciseNestedForm
              tempId={exercise.tempId}
              name={exercise.tempId}
              key={exercise.tempId}
              onDelete={handleRemoveExercise}
            />
          ))}
          <CardAddExercise onClick={handleAddExercise} />
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
