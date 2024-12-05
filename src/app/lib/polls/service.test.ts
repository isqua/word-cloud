import { beforeEach, describe, expect, it, vi } from 'vitest';
import { EntityLimitException, NotFoundException } from '../errors';
import { PollsService } from './service';
import { PollsRepository } from './repository';
import type { CreatePollDto } from './types';

let nanoIdCounter = 0;
vi.mock('nanoid', () => ({
    nanoid: () => `mocked-nanoid-${nanoIdCounter++}`
}));

describe('PollsService', () => {
    let service: PollsService;
    let repository: PollsRepository;
    const maxPollsCount = 5;
    
    beforeEach(() => {
        repository = new PollsRepository();
        service = new PollsService(maxPollsCount, repository);
        nanoIdCounter = 0;
    });
    
    describe('create', () => {
        it('should create a new poll', () => {
            const createPollDto: CreatePollDto = {
                title: 'Test Poll',
                initial: ['Option1', 'Option2']
            };
            
            const createdPoll = service.create(createPollDto);
            
            expect(createdPoll).toEqual({
                title: createPollDto.title,
                id: 'mocked-nanoid-0',
            });
        });
        
        it('should throw EntityLimitException when max polls count is reached', () => {
            const createPollDto: CreatePollDto = {
                title: 'Test Poll',
                initial: ['Option1']
            };
            
            for (let i = 0; i < maxPollsCount; i++) {
                service.create(createPollDto);
            }
            
            expect(() => service.create(createPollDto)).toThrow(EntityLimitException);
        });
    });
    
    describe('findById', () => {
        it('should return a ReadPollDto when poll exists', () => {
            const { id: pollId } = service.create({ title: 'Test Poll', initial: ['Option1'] });
            
            const result = service.findById(pollId);
            
            expect(result).toEqual({
                id: pollId,
                title: 'Test Poll'
            });
        });
        
        it('should throw NotFoundException when poll does not exist', () => {
            expect(() => service.findById('non-existent-id')).toThrow(NotFoundException);
        });
    });
    
    describe('delete', () => {
        it('should delete an existing poll', () => {
            const { id: pollId } = service.create({ title: 'Test Poll', initial: ['Option1'] });
            expect(repository.count()).toBe(1);
            
            service.delete(pollId);
            
            expect(repository.count()).toBe(0);
        });
        
        it('should not throw when deleting a non-existent poll', () => {
            expect(() => service.delete('non-existent-id')).not.toThrow();
        });
    });
});