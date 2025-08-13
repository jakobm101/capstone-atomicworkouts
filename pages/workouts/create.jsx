export default function WorkoutCreate() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Submitting", data);
  };
  return (
    <main>
      <h1>Creating Workout</h1>
      <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="enter workout name" />
        <button type="submit">submit</button>
      </form>
    </main>
  );
}
