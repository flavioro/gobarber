import Bee from 'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

const jobs = [CancellationMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    // not return, use forEach
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig
        }),
        handle
      };
    });
  }

  // Add job in queue to process
  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  // Process Queue, processes each job in the queue
  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      // heart a event
      // bee.process(handle);
      // Queue have has several events (success etc)
      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
