import { PollId } from "@/app/lib/polls/types";
import Link from "next/link";

interface IVoteLinkProps {
    pollId: PollId;
}

export function VoteLink({ pollId }: IVoteLinkProps) {
    const href = `/polls/${pollId}/vote`;

    return (
        <Link
            href={href}
            target="_blank"
            className="underline text-blue-600 hover:text-blue-800 break-words"
        >
            {window.location.hostname}
            <wbr />
            {href}
        </Link>
    );
}
