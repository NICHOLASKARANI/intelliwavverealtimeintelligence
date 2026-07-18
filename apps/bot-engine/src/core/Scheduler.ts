// apps/bot-engine/src/core/Scheduler.ts
import { Logger } from '../utils/logger';

interface ScheduledTask {
  id: string;
  callback: () => Promise<void>;
  interval: number;
  timer: NodeJS.Timeout | null;
  lastRun: number;
  isRunning: boolean;
}

export class Scheduler {
  private tasks: Map<string, ScheduledTask> = new Map();
  private logger: Logger;

  constructor() {
    this.logger = new Logger('Scheduler');
  }

  schedule(
    id: string,
    callback: () => Promise<void>,
    interval: number = 60000, // Default 1 minute
  ): void {
    if (this.tasks.has(id)) {
      this.unschedule(id);
    }

    const task: ScheduledTask = {
      id,
      callback,
      interval,
      timer: null,
      lastRun: 0,
      isRunning: false,
    };

    // Start the interval
    task.timer = setInterval(async () => {
      if (task.isRunning) {
        this.logger.debug(`Task ${id} skipped (still running)`);
        return;
      }

      try {
        task.isRunning = true;
        await callback();
        task.lastRun = Date.now();
      } catch (error) {
        this.logger.error(`Task ${id} failed: ${error.message}`);
      } finally {
        task.isRunning = false;
      }
    }, interval);

    this.tasks.set(id, task);
    this.logger.info(`Scheduled task ${id} every ${interval}ms`);
  }

  unschedule(id: string): void {
    const task = this.tasks.get(id);
    if (task?.timer) {
      clearInterval(task.timer);
      task.timer = null;
      this.tasks.delete(id);
      this.logger.info(`Unscheduled task ${id}`);
    }
  }

  getTask(id: string): ScheduledTask | undefined {
    return this.tasks.get(id);
  }

  getAllTasks(): ScheduledTask[] {
    return Array.from(this.tasks.values());
  }

  clear(): void {
    for (const [id] of this.tasks) {
      this.unschedule(id);
    }
    this.logger.info('All tasks cleared');
  }

  getStats(): Record<string, any> {
    const tasks = Array.from(this.tasks.values());
    return {
      totalTasks: tasks.length,
      activeTasks: tasks.filter(t => t.timer !== null).length,
      runningTasks: tasks.filter(t => t.isRunning).length,
    };
  }
}