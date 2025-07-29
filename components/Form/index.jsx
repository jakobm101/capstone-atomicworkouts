// BUG when editing multiple times in a row the same exercise
// ideas:
/**
 * - useState
 *      tried to change but didn't help  
 * - useEffect
 *      tried that but didn't help
 * - useSWR
 *      tried mutate but no success
 *      i feel like i could miss something about this
 * - mongoose
 *      no idea
 * - Mongo
 *      gets updated cleanly so seems fine
 * - 
 * ///// hydration
 */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import Card from "../Atoms/Card";
import HeadingTiny from "../Atoms/Text/HeadingTiny";
import ButtonClose from "../Button/ButtonClose";
import FormInput from "./Input";
import FormExerciseNestedForm from "./ExerciseNestedForm";
import CardAddExercise from "./CardAddExercise";
import HeadingLarge from "../Atoms/Text/HeadingLarge";
import { mutate } from "swr";

export default function Form({ workout }) {
  const { push } = useRouter();
  const [name, setName] = useState(workout ? workout.name : "");
  const [exercises, setExercises] = useState(
    workout
      ? workout.exercises
      : [
          {
            _id: {
              $oid: "6877cdddc31ed272ee80b837",
            },
            sets: 3,
            reps: 8,
          },
        ]
  );
  
  // useEffect doesn't solve the bug of non updating exercises on repeated edits
  // but i keep it in as evidence
  workout ??= { name, exercises };
  useEffect(() => {
    setExercises(workout.exercises);
    setName(workout.name);
  }, [workout, exercises]);
  console.log("form update initial exercises", exercises[0]);

  const handleAddExercise = () => {
    setExercises([
      ...exercises,
      {
        exerciseId: "6877cdddc31ed272ee80b836",
        _id: "1",
        reps: "8",
        sets: "3",
      },
    ]);
  };

  const handleRemoveExercise = (id) => {
    console.log("handleRemoveExercise id, exercises[0]", id, exercises[0]);

    setExercises(exercises.filter((exercise) => exercise._id !== id));
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
          _id: data[`${index}-exercise`],
          reps: data[`${index}-reps`],
          sets: data[`${index}-sets`],
        };
      }),
    };
    workout && (newWorkout["_id"] = workout._id);
    console.log("newWorkout", newWorkout.exercises[0]);

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
      //these do not solve the bug but them i keep too as evidence
      setName(newWorkout.name);
      setExercises(newWorkout.exercises);
      mutate(`api/workouts/${workout._id}`);

      push(`/`);
    }
  };

  console.log("Form exercises", exercises[0]);

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
              key={index}
              name={index}
              dbExercise={exercise}
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
