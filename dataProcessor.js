require('dotenv').config();

const { workoutCalculator } = require('./workoutReader');
const { healthMetricsCounter } = require('./healthReader');

async function processFiles() {
  const userName = process.env.USER_NAME;
  const weeklyGoal = parseInt(process.env.WEEKLY_GOAL, 10);

  console.log(`Processing data for: ${userName}`);

  console.log('📁 Reading workout data...');
  const workoutResult = await workoutCalculator('./data/workouts.csv');

  console.log('📁 Reading health data...');
  const healthEntries = await healthMetricsCounter('./data/health-metrics.json');

  if (!workoutResult || healthEntries === null) {
    console.log('Could not load all data files.');
    return;
  }

  console.log('\n=== SUMMARY ===');
  console.log(`Workouts found: ${workoutResult.totalWorkouts}`);
  console.log(`Total workout minutes: ${workoutResult.totalMinutes}`);
  console.log(`Health entries found: ${healthEntries}`);
  console.log(`Weekly goal: ${weeklyGoal} minutes`);

  if (workoutResult.totalMinutes >= weeklyGoal) {
    console.log(`🎉 Congratulations ${userName}! You have exceeded your weekly goal!`);
  } else {
    console.log(`Keep going ${userName}! You need ${weeklyGoal - workoutResult.totalMinutes} more minutes to reach your weekly goal.`);
  }
}

processFiles();
