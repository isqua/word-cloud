import { EntityLimitException, UnexpectedException } from "@/app/lib/errors";
import { service } from "@/app/lib/polls";
import { CreatePollDtoSchema } from "@/app/lib/polls/schemas";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const validatedData = CreatePollDtoSchema.parse(body);
        const { title, initial } = validatedData;

        const poll = service.create({ title, initial });

        return NextResponse.json(poll);
    } catch (e) {
        if (e instanceof ZodError) {
            return NextResponse.json({ error: e.errors }, { status: 400 });
        } else if (e instanceof EntityLimitException) {
            return NextResponse.json({ error: e.message }, { status: 400 });
        } else {
            const err = new UnexpectedException();

            return NextResponse.json({ error: err.message }, { status: 500 });
        }
    }
}
