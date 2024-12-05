import { NotFoundException } from "@/app/lib/errors";
import { bus } from "@/app/lib/polls/bus";
import {
    PollResultsUpdatedEvent,
    PollSubscribedEvent,
    ReadPollDto,
} from "@/app/lib/polls/types";
import { sendErrorResponse } from "@/app/lib/shared/errorResponse";
import { formatEvent } from "@/app/lib/shared/formatEvent";
import { NextContext } from "@/app/lib/shared/types";
import { NextRequest } from "next/server";

type RouteContext = NextContext<{ pollId: string }>;

export async function GET(req: NextRequest, { params }: RouteContext) {
    const { pollId } = await params;

    if (!pollId) {
        return sendErrorResponse(
            new NotFoundException(`The poll with id ${pollId} not found`),
        );
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
        start(controller) {
            const connetedEvent: PollSubscribedEvent = {
                message: `Subscribed to poll ${pollId}`,
            };

            controller.enqueue(
                encoder.encode(formatEvent("connected", connetedEvent)),
            );

            const onUpdate = (data: ReadPollDto) => {
                const event: PollResultsUpdatedEvent = {
                    results: data.results,
                };

                controller.enqueue(
                    encoder.encode(formatEvent("results", event)),
                );
            };

            bus.on(pollId, onUpdate);

            const closeConnection = () => {
                bus.off(pollId, onUpdate);
                controller.close();
            };

            req.signal.addEventListener("abort", closeConnection);
        },
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache, no-transform",
            Connection: "keep-alive",
        },
    });
}
