"use client";

import { ErrorCover } from "@/components/ErrorCover";
import { VoteForPoll } from "@/components/VoteForPoll";
import { WithPoll } from "@/components/WithPoll";
import Head from "next/head";
import { useParams } from "next/navigation";

export default function VoteForPollPage() {
    const { pollId } = useParams();

    return typeof pollId === "string" ? (
        <WithPoll pollId={pollId}>
            {(poll) => (
                <>
                    <Head>
                        <title>• {poll.title}</title>
                    </Head>
                    <VoteForPoll poll={poll} />
                </>
            )}
        </WithPoll>
    ) : (
        <ErrorCover message="404 page not found" />
    );
}
