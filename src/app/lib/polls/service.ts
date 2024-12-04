import { nanoid } from 'nanoid';
import { EntityLimitException, NotFoundException } from '../errors';
import { PollsRepository } from './repository';
import type { CreatePollDto, IPoll, PollId, ReadPollDto } from './types';

export class PollsService {
    constructor(
        protected maxPollsCount: number,
        protected repository: PollsRepository,
    ) {}

    create({ title, initial }: CreatePollDto): ReadPollDto {
        if (this.repository.count() >= this.maxPollsCount) {
            throw new EntityLimitException(
                `Cannot create more than ${this.maxPollsCount} polls. Please wait for some of them to complete`
            );
        }

        const poll: IPoll = {
            title,
            results: new Map(),
        }

        for (const word of initial) {
            poll.results.set(word, 1);
        }

        const pollId: PollId = nanoid();

        this.repository.add(pollId, poll);

        return {
            id: pollId,
            title,
        };
    }

    findById(pollId: string): ReadPollDto {
        const poll = this.repository.getById(pollId);

        if (poll === undefined) {
            throw new NotFoundException(`The poll with id ${pollId} not found`);
        }

        return {
            id: pollId,
            title: poll.title,
        };
    }

    delete(pollId: string): void {
        this.repository.delete(pollId);
    }
}
