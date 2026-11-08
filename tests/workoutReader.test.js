const fs = require('fs');
const { workoutCalculator } = require('../workoutReader');

const TEST_FILE = __dirname + '/test-workouts.csv';

const testCsvData = `date,exercise,duration,calories
2024-01-01,Running,30,300
2024-01-01,Push-ups,15,100
2024-01-02,Cycling,45,400`;

beforeAll(() => {
  fs.writeFileSync(TEST_FILE, testCsvData);
});

afterAll(() => {
  fs.unlinkSync(TEST_FILE);
});

test('returns totals for a valid file', async () => {
  const result = await workoutCalculator(TEST_FILE);
  expect(result).toEqual({ totalWorkouts: 3, totalMinutes: 90 });
});

test('returns null when the file is missing', async () => {
  const result = await workoutCalculator(__dirname + '/missing.csv');
  expect(result).toBeNull();
});
