const fs = require('fs/promises');
const { healthMetricsCounter } = require('../healthReader');

const TEST_FILE = __dirname + '/test-health-metrics.json';

const testData = {
  metrics: [
    { date: '2024-01-01', type: 'sleep', duration: '7.5' },
    { date: '2024-01-01', type: 'nutrition', calories: '2100' },
  ],
};

beforeAll(async () => {
  await fs.writeFile(TEST_FILE, JSON.stringify(testData));
});

afterAll(async () => {
  await fs.unlink(TEST_FILE);
});

test('counts the entries in a valid file', async () => {
  const result = await healthMetricsCounter(TEST_FILE);
  expect(result).toBe(2);
});

test('returns null when the file is missing', async () => {
  const result = await healthMetricsCounter(__dirname + '/missing.json');
  expect(result).toBeNull();
});
