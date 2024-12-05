import { service } from "@/app/lib/polls";
import { VoteForPollDtoSchema } from "@/app/lib/polls/schemas";
import { sendErrorResponse } from "@/app/lib/shared/errorResponse";
import { NextContext } from "@/app/lib/shared/types";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = NextContext<{ pollId: string }>;

export async function GET(_req: NextRequest, { params }: RouteContext) {
    const { pollId } = await params;

    try {
        const poll = service.findById(pollId);

        return NextResponse.json(poll);
    } catch (error) {
        return sendErrorResponse(error);
    }
}

export async function DELETE(_req: NextRequest, { params }: RouteContext) {
    const { pollId } = await params;

    try {
        service.findById(pollId);
        service.delete(pollId);

        return NextResponse.json({ status: "ok" });
    } catch (error) {
        return sendErrorResponse(error);
    }
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
    const { pollId } = await params;

    try {
        const body = await req.json();
        const validatedData = VoteForPollDtoSchema.parse(body);
        const { answers } = validatedData;

        service.addAnswers(pollId, answers);

        return NextResponse.json({ status: "ok" });
    } catch (error) {
        return sendErrorResponse(error);
    }
}
