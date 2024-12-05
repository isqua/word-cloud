import { nanoid } from "nanoid";
import { EntityLimitException, NotFoundException } from "../errors";
import { PollsRepository } from "./repository";
import type {
    CreatePollDto,
    IPoll,
    IPollResultItem,
    IPollResults,
    PollId,
    ReadPollDto,
    Word,
} from "./types";

export class PollsService {
    constructor(
        protected maxPollsCount: number,
        protected repository: PollsRepository,
    ) {}

    create({ title, initial }: CreatePollDto): ReadPollDto {
        if (this.repository.count() >= this.maxPollsCount) {
            throw new EntityLimitException(
                `Cannot create more than ${this.maxPollsCount} polls. Please wait for some of them to complete`,
            );
        }

        const poll: IPoll = {
            title,
            results: new Map(),
        };

        for (const word of initial) {
            poll.results.set(word, 1);
        }

        const pollId: PollId = nanoid();

        this.repository.add(pollId, poll);

        return {
            id: pollId,
            title,
            results: this.formatResults(poll.results),
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
            results: this.formatResults(poll.results),
        };
    }

    delete(pollId: string): void {
        this.repository.delete(pollId);
    }

    addAnswers(pollId: string, words: Word[]): void {
        this.repository.incrementWordCounts(pollId, this.normalizeWords(words));
    }

    private formatResults(results: IPollResults): IPollResultItem[] {
        return Array.from(results)
            .map(([value, count]) => ({ value, count }))
            .sort((a, b) => b.count - a.count);
    }

    private normalizeWords(words: Word[]): Set<Word> {
        const uniqueWords = new Set<Word>();

        for (const word of words) {
            uniqueWords.add(word.toLowerCase().trim().replace(/\s+/, ""));
        }

        return uniqueWords;
    }
}
