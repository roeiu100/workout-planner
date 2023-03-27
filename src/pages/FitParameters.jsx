export default function FitParameters() {
  return (
    <div className="fit-params">
      <label name="difficulty" className="difficulty">
        Chose the difficulty level of the exercise:{" "}
      </label>
      <select name="difficulty">
        <option value="beginner">beginner</option>
        <option value="intermediate">intermediate</option>
        <option value="expert">expert</option>
      </select>

      
    </div>
  );
}
