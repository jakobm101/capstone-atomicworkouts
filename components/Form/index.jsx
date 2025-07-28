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

// offline work fallbacks
import dbclone from "@/lib/dbclone";

export default function Form({ workout = dbclone.workouts[0] }) {
  const { push } = useRouter();
  const [name, setName] = useState(workout ? workout.name : "");
  const [exercises, setExercises] = useState(
    workout ? workout.exercises : [{ tempId: 1 }, { tempId: 2 }]
  );
  console.log("exercises", exercises);

  const handleAddExercise = () => {
    console.log("✨", dbclone.exercises[0]);

    setExercises([
      ...exercises,
      {
        exerciseId: "6877cdddc31ed272ee80b836",
        _id: "6877cdddc31ed272ee80b836",
        reps: "8",
        sets: "3",
      },
    ]);
  };

  const handleRemoveExercise = (id) => {
    setExercises(exercises.filter((exercise) => exercise.tempId !== id));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log("data", data);

    const newWorkout = {
      name: data.name,
      exercises: exercises.map((_, index) => {
        return {
          exerciseId: data[`${index}-exercise`],
          reps: data[`${index}-reps`],
          sets: data[`${index}-sets`],
        };
      }),
    };

    console.log("submit", newWorkout);

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
        <FormInput
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        >
          Workout Name
        </FormInput>
        <HeadingTiny>Exercises</HeadingTiny>
        <StyledCard>
          {exercises.map((exercise, index) => (
            <FormExerciseNestedForm
              dbExercise={exercise}
              tempId={index}
              name={index}
              key={index}
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
