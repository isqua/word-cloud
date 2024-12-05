import { MAX_POLLS_COUNT } from '@/app/lib/config';
import { PollsRepository } from '@/app/lib/polls/repository';
import { PollsService } from '@/app/lib/polls/service';

const repository = new PollsRepository();

export const service = new PollsService(MAX_POLLS_COUNT, repository);
