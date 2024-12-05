import { ConflictException, NotFoundException } from "../errors";
import type { IPoll, PollId, Word } from "./types";

export class PollsRepository {
    protected polls = new Map<string, IPoll>();

    count(): number {
        return this.polls.size;
    }

    add(pollId: string, poll: IPoll): PollId {
        if (this.polls.has(pollId)) {
            throw new ConflictException("Cannot use the same poll id");
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

    incrementWordCounts(pollId: string, words: Set<Word>): void {
        const poll = this.polls.get(pollId);

        if (!poll) {
            throw new NotFoundException(`The poll with id ${pollId} not found`);
        }

        words.forEach((word) => {
            const count = poll.results.get(word) || 0;
            poll.results.set(word, count + 1);
        });
    }
}
