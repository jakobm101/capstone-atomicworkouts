import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import Card from "../Atoms/Card";
import HeadingTiny from "../Atoms/Text/HeadingTiny";
import ButtonClose from "../Button/ButtonClose";
import FormInput from "./Input";
import FormExerciseNestedForm from "./ExerciseNestedForm";
import CardAddExercise from "./CardAddExercise";
import { defaultExercise } from "@/lib/dbclone";
import HeadingLarge from "../Atoms/Text/HeadingLarge";

export default function Form({ workout }) {
  const { push } = useRouter();
  const [name, setName] = useState(workout ? workout.name : "");
  const [exercises, setExercises] = useState(
    workout ? workout.exercises : [defaultExercise]
  );

  const handleAddExercise = () => {
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
    workout && (newWorkout["_id"] = workout._id);

    const responseContent = {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newWorkout),
    };
    let response;
    if (workout) {
      response = await fetch(`/api/workouts/${workout._id}`, {
        method: "PUT",
        ...responseContent,
      });
    } else {
      response = await fetch(`/api/workouts`, {
        method: "POST",
        ...responseContent,
      });
    }
    if (response.ok) {
      push(`/`);
    }
  };

  return (
    <StyledDiv>
      <StyledClose href="/" />
      <HeadingLarge>
        {workout ? `Updating Workout` : `Creating new workout`}
      </HeadingLarge>
      {workout && <HeadingTiny>Current Name: {workout.name}</HeadingTiny>}
      <form onSubmit={handleSubmit}>
        <FormInput
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        >
          {workout && "New "}Workout Name
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
        <button type="reset" onClick={() => setExercises([])}>
          reset
        </button>
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
