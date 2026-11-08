const fs = require('fs/promises');

async function healthMetricsCounter(filepath) {
  try {
    const data = await fs.readFile(filepath, 'utf8');
    const healthData = JSON.parse(data);
    const totalEntries = healthData.metrics.length;
    console.log(`Total health entries: ${totalEntries}`);
    return totalEntries;
  } catch (error) {
    console.log('Could not read health data:', error.message);
    return null;
  }
}

healthMetricsCounter('./data/health-metrics.json');

module.exports = { healthMetricsCounter };
