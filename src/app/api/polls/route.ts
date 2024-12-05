import { service } from "@/app/lib/polls";
import { CreatePollDtoSchema } from "@/app/lib/polls/schemas";
import { sendErrorResponse } from "@/app/lib/shared/errorResponse";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const validatedData = CreatePollDtoSchema.parse(body);
        const { title, initial } = validatedData;

        const poll = service.create({ title, initial });

        return NextResponse.json(poll);
    } catch (error) {
        return sendErrorResponse(error);
    }
}
