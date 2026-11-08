const fs = require('fs');
const csv = require('csv-parser');

function readWorkoutData(filepath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filepath)
      .on('error', reject)
      .pipe(csv())
      .on('data', (row) => results.push(row))
      .on('end', () => resolve(results));
  });
}

async function workoutCalculator(filepath) {
  try {
    const workouts = await readWorkoutData(filepath);
    let totalMinutes = 0;
    for (let i = 0; i < workouts.length; i++) {
      totalMinutes += parseInt(workouts[i].duration, 10);
    }
    console.log(`Total workouts: ${workouts.length}`);
    console.log(`Total minutes: ${totalMinutes}`);
    return { totalWorkouts: workouts.length, totalMinutes };
  } catch (error) {
    console.log('Could not read workout data:', error.message);
    return null;
  }
}

module.exports = { workoutCalculator };
