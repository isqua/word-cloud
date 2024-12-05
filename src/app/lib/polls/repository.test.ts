import { beforeEach, describe, expect, it } from 'vitest';
import { ConflictException, NotFoundException } from '../errors';
import { PollsRepository } from './repository';
import type { IPoll, CreatePollDto, PollId } from './types';

describe('PollsRepository', () => {
    let repository: PollsRepository;

    beforeEach(() => {
        repository = new PollsRepository();
    });

    it('should start with an empty repository', () => {
        expect(repository.count()).toBe(0);
    });

    describe('add', () => {
        it('should add a poll and return its id', () => {
            const pollCreateDto: CreatePollDto = {
                title: 'Test question',
                initial: ['Option 1', 'Option 2']
            };
            const pollId: PollId = 'test-id';

            const poll: IPoll = {
                title: pollCreateDto.title,
                results: new Map(pollCreateDto.initial.map(word => [word, 0]))
            };

            const result = repository.add(pollId, poll);

            expect(result).toBe(pollId);
            expect(repository.count()).toBe(1);
        });

        it('should throw ConflictException when adding a poll with existing id', () => {
            const poll: IPoll = {
                title: 'Test question',
                results: new Map([['Option 1', 0], ['Option 2', 0]])
            };
            const pollId: PollId = 'test-id';

            repository.add(pollId, poll);

            expect(() => repository.add(pollId, poll)).toThrow(ConflictException);
            expect(() => repository.add(pollId, poll)).toThrow('Cannot use the same poll id');
        });
    });

    describe('getById', () => {
        it('should retrieve a poll by id', () => {
            const poll: IPoll = {
                title: 'Test question',
                results: new Map([['Option 1', 1], ['Option 2', 1]])
            };
            const pollId: PollId = 'test-id';

            repository.add(pollId, poll);

            const retrievedPoll = repository.getById(pollId);
            expect(retrievedPoll).toEqual(poll);
        });

        it('should return undefined when getting non-existent poll', () => {
            const retrievedPoll = repository.getById('non-existent-id');
            expect(retrievedPoll).toBeUndefined();
        });
    });

    describe('delete', () => {
        it('should delete a poll', () => {
            const poll: IPoll = {
                title: 'Test question',
                results: new Map([['Option 1', 1], ['Option 2', 1]])
            };
            const pollId: PollId = 'test-id';

            repository.add(pollId, poll);
            expect(repository.count()).toBe(1);

            repository.delete(pollId);
            expect(repository.count()).toBe(0);
            expect(repository.getById(pollId)).toBeUndefined();
        });

        it('should not throw when deleting non-existent poll', () => {
            expect(() => repository.delete('non-existent-id')).not.toThrow();
        });
    });

    describe('incrementWordCounts', () => {
        it('should increment word counts for existing poll', () => {
            const pollId = repository.add('test-id', { title: 'Test Poll', results: new Map([['word1', 1]]) });
            repository.incrementWordCounts(pollId, new Set(['word1', 'word2']));

            const poll = repository.getById(pollId);
            expect(poll?.results.get('word1')).toBe(2);
            expect(poll?.results.get('word2')).toBe(1);
        });

        it('should throw NotFoundException for non-existent poll', () => {
            expect(() => repository.incrementWordCounts('non-existent', new Set(['word']))).toThrow(NotFoundException);
        });
    });
});