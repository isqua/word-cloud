'use client';

import { ErrorCover } from '@/components/ErrorCover';
import { VoteForPoll } from '@/components/VoteForPoll';
import { useParams } from 'next/navigation';

export default function VoteForPollPage() {
    const { pollId } = useParams();

    return typeof pollId === 'string' ?
        (<VoteForPoll pollId={pollId} />) :
        (<ErrorCover message='404 page not found' />);
}
