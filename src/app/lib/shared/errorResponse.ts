import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { NotFoundException, UnexpectedException } from "@/app/lib/errors";

export function sendErrorResponse(error: unknown) {
    if (error instanceof ZodError) {
        return NextResponse.json({ error: error.errors }, { status: 400 });
    } else if (error instanceof NotFoundException) {
        return NextResponse.json({ error: error.message }, { status: 404 });
    } else {
        const err = new UnexpectedException();

        console.error(error);

        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
