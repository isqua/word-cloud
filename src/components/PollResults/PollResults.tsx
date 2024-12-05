import { findPollById } from '@/api/polls';
import { PollId, ReadPollDto } from '@/app/lib/polls/types';
import { ErrorCover } from '@/components/ErrorCover';
import { Loader } from '@/components/Loader';
import { WordCloud } from '@/components/WordCloud';
import { useCallback, useEffect, useState } from 'react';

type IPollResultsProps = {
    pollId: PollId;
}

export function PollResults({ pollId }: IPollResultsProps) {
    const [poll, setPoll] = useState<ReadPollDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    const fetchPoll = useCallback(async (pollId: string) => {
        try {
            const poll = await findPollById(pollId);

            setPoll(poll);
        } catch (error) {
            console.error('Error:', error);
            setError('Error fetching poll');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPoll(pollId);
    }, [pollId, fetchPoll]);

    if (loading) {
        return (<Loader />);
    }

    if (error) {
        return (<ErrorCover message={error} />);
    }

    if (!poll) {
        return (<ErrorCover message="Poll not found" />);
    }

    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className='p-8 w-full max-w-md text-center'>
                <h1 className='text-2xl font-bold'>{poll.title}</h1>
                <WordCloud words={poll.results} />
            </div>
        </div>
    );
}
