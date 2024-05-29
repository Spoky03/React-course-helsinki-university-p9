import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.get('/ping', (_req, res) => {
  res.send('pong');
});
app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.json({ error: 'malformatted parameters' });
  } else {
    res.json({
      weight,
      height,
      bmi: calculateBmi(height, weight),
    });
  }
});

app.post('/exercises', express.json(), (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    res.json({ error: 'parameters missing' });
  } else if (!Array.isArray(daily_exercises) || isNaN(target)){
    res.json({ error: 'malformatted parameters' });
  } else {
    res.json(calculateExercises(daily_exercises, target));
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});