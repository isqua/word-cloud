"use client";

import { ErrorCover } from "@/components/ErrorCover";
import { PollResults } from "@/components/PollResults";
import { useParams } from "next/navigation";

export default function PollPage() {
    const { pollId } = useParams();

    return typeof pollId === "string" ? (
        <PollResults pollId={pollId} />
    ) : (
        <ErrorCover message="404 page not found" />
    );
}
