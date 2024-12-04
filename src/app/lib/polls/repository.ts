import { ConflictException } from '../errors';
import type { IPoll, PollId } from './types';

export class PollsRepository {
    protected polls = new Map<string, IPoll>();

    count(): number {
        return this.polls.size;
    }

    add(pollId: string, poll: IPoll): PollId {
        if (this.polls.has(pollId)) {
            throw new ConflictException('Cannot use the same poll id');
        }

        this.polls.set(pollId, poll);

        return pollId;
    }

    getById(pollId: string): IPoll | undefined {
        return this.polls.get(pollId);
    }

    delete(pollId: string) {
        if (this.polls.has(pollId)) {
            this.polls.delete(pollId);
        }
    }
}
