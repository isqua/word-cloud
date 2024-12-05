import type {
    CreatePollDto,
    PollId,
    PollResultsUpdatedEvent,
    PollSubscribedEvent,
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

export async function findPollById(pollId: PollId): Promise<ReadPollDto> {
    const response = await fetch(`/api/polls/${pollId}`);

    if (response.ok) {
        const data = await response.json();

        return data;
    } else {
        throw new Error("Failed to fetch poll");
    }
}

export async function voteForPoll(
    pollId: PollId,
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

type SubscriptionHandler = (event: PollSubscribedEvent) => void;
type PollResultsUpdatedHandler = (event: PollResultsUpdatedEvent) => void;
type SubscriptionErrorHandler = (error: unknown) => void;

type ISubscribeForPollOptions = {
    onSubscribe: SubscriptionHandler;
    onUpdate: PollResultsUpdatedHandler;
    onError: SubscriptionErrorHandler;
};

export function subscribeForPoll(
    pollId: PollId,
    { onSubscribe, onUpdate, onError }: ISubscribeForPollOptions,
): () => void {
    const eventSource = new EventSource(`/api/polls/${pollId}/subscribe`);

    eventSource.addEventListener("connected", (event) => {
        let data;

        try {
            data = JSON.parse(event.data);
        } catch (err) {
            console.error(err);
            onError(err);
        }

        if (data) {
            onSubscribe(data);
        }
    });

    eventSource.addEventListener("results", (event) => {
        let data;

        console.log("results", event);

        try {
            data = JSON.parse(event.data);
        } catch (err) {
            console.error(err);
            onError(err);
        }

        if (data) {
            onUpdate(data);
        }
    });

    eventSource.addEventListener("error", (error) => {
        console.error("SSE connection error", error);
        eventSource.close();
        onError(error);
    });

    return () => {
        eventSource.close();
    };
}
