import { Job } from 'bullmq';
import { BaseJob } from '../baseJob';
import { JobImp } from '../type';
import systemLog from '../../systemLog';

export class SendWelcomeMail extends BaseJob implements JobImp {
	constructor(public payload: Record<string, unknown>) {
		super();
	}

	handle = (job?: Job<any, any, string> | undefined) => {
		// Send welcome mail
	};

	failed = (job: Job<any, any, string>) => {
		systemLog.error(`Job ${this.name} with ID: ${job.id} has failed.`);
	};
}
