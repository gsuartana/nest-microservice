import { exec } from 'node:child_process'

import { CronJob } from 'cron'

const runMigrationGenerate = async function () {
  exec('npm run migration:revert && npm run migration:run', (error, stdout, stderr) => {
    if (!error)
      console.log('Operation successful', error)

    else
      console.log('operation failed', error)
  })
}

const job = CronJob.from({
  /** Restore initial data at 4.30 am every day */
  cronTime: '30 4 * * *',
  timeZone: 'Europe/Zurich',
  start: true,
  onTick() {
    runMigrationGenerate()
    console.log('Task executed daily at 4.30 AM:', new Date().toLocaleTimeString())
  },
})
