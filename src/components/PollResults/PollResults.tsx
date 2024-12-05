import { PollId } from "@/app/lib/polls/types";
import { VoteLink } from "@/components/VoteLink";
import { WithPoll } from "@/components/WithPoll";
import { WordCloud } from "@/components/WordCloud";

type IPollResultsProps = {
    pollId: PollId;
};

export function PollResults({ pollId }: IPollResultsProps) {
    return (
        <WithPoll pollId={pollId}>
            {(poll) => (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="p-8 w-full max-w-md text-center">
                        <h1 className="text-2xl font-bold">{poll.title}</h1>
                        <WordCloud words={poll.results} />
                        <VoteLink pollId={poll.id} />
                    </div>
                </div>
            )}
        </WithPoll>
    );
}
