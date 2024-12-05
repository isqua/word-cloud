import { subscribeForPoll } from "@/api/polls";
import type { ReadPollDto } from "@/app/lib/polls/types";
import type { Status } from "@/app/lib/shared/types";
import { StatusIndicator } from "@/components/StatusIndicator";
import { VoteLink } from "@/components/VoteLink";
import { WordCloud } from "@/components/WordCloud";
import { useEffect, useState } from "react";

type IPollResultsProps = {
    poll: ReadPollDto;
};

export function PollResults({ poll }: IPollResultsProps) {
    const [results, setResults] = useState(poll.results);
    const [status, setStatus] = useState<Status>("idle");

    useEffect(() => {
        const unsubscribe = subscribeForPoll(poll.id, {
            onSubscribe: () => setStatus("success"),
            onUpdate: (data) => setResults(data.results),
            onError: () => setStatus("error"),
        });

        return unsubscribe;
    }, [poll.id, setStatus, setResults]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <span className="fixed right-2 top-1">
                <StatusIndicator status={status} />
            </span>
            <div className="p-8 w-full max-w-md text-center">
                <h1 className="text-2xl font-bold">{poll.title}</h1>
                <WordCloud words={results} />
                <VoteLink pollId={poll.id} />
            </div>
        </div>
    );
}
