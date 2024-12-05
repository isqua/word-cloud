import { findPollById } from "@/api/polls";
import { PollId, ReadPollDto } from "@/app/lib/polls/types";
import { ErrorCover } from "@/components/ErrorCover";
import { Loader } from "@/components/Loader";
import { ReactNode, useCallback, useEffect, useState } from "react";

type IWithPollProps = {
    pollId: PollId;
    children: (poll: ReadPollDto) => ReactNode;
};

export function WithPoll({ pollId, children }: IWithPollProps) {
    const [poll, setPoll] = useState<ReadPollDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    const fetchPoll = useCallback(async (pollId: string) => {
        try {
            const poll = await findPollById(pollId);

            setPoll(poll);
        } catch (error) {
            console.error("Error:", error);
            setError("Error fetching poll");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPoll(pollId);
    }, [pollId, fetchPoll]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <ErrorCover message={error} />;
    }

    if (!poll) {
        return <ErrorCover message="Poll not found" />;
    }

    return children(poll);
}
