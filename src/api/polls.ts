import type {
    CreatePollDto,
    ReadPollDto,
    VoteForPollDto,
} from "@/app/lib/polls/types";

export async function createPoll(poll: CreatePollDto): Promise<ReadPollDto> {
    const response = await fetch("/api/polls", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(poll),
    });

    if (response.ok) {
        const body = await response.json();

        return body;
    } else {
        throw new Error("Failed to create poll");
    }
}

export async function findPollById(pollId: string): Promise<ReadPollDto> {
    const response = await fetch(`/api/polls/${pollId}`);

    if (response.ok) {
        const data = await response.json();

        return data;
    } else {
        throw new Error("Failed to fetch poll");
    }
}

export async function voteForPoll(
    pollId: string,
    data: VoteForPollDto,
): Promise<void> {
    const response = await fetch(`/api/polls/${pollId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to vote for poll");
    }
}
