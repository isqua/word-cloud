import { NotFoundException, UnexpectedException } from '@/app/lib/errors';
import { service } from '@/app/lib/polls';
import { VoteForPollDtoSchema } from '@/app/lib/polls/schemas';
import { NextContext } from '@/app/lib/shared/types';
import { NextRequest } from 'next/server';
import { ZodError } from 'zod';

type RouteContext = NextContext<{ pollId: string }>;

export async function GET(_req: NextRequest, { params }: RouteContext) {
    const { pollId } = (await params);

    try {
        const poll = service.findById(pollId);

        return Response.json(poll);
    } catch (e) {
        if (e instanceof NotFoundException) {
            return Response.json({ error: e.message }, { status: 404 });
        } else {
            const err = new UnexpectedException();

            return Response.json({ error: err.message }, { status: 500 });
        }
    }
}

export async function DELETE(_req: NextRequest, { params }: RouteContext) {
    const { pollId } = (await params);

    try {
        service.findById(pollId);
        service.delete(pollId);

        return Response.json({ status: 'ok' });
    } catch (e) {
        if (e instanceof NotFoundException) {
            return Response.json({ error: e.message }, { status: 404 });
        } else {
            const err = new UnexpectedException();

            return Response.json({ error: err.message }, { status: 500 });
        }
    }
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
    const { pollId } = await params;

    try {
        const body = await req.json()
        const validatedData = VoteForPollDtoSchema.parse(body);
        const { answers } = validatedData;

        service.addAnswers(pollId, answers);

        return Response.json({ status: 'ok' });
    } catch (e) {
        if (e instanceof ZodError) {
            return Response.json({ error: e.errors }, { status: 400 });
        } else if (e instanceof NotFoundException) {
            return Response.json({ error: e.message }, { status: 404 });
        } else {
            const err = new UnexpectedException();

            console.error(e);

            return Response.json({ error: err.message }, { status: 500 });
        }
    }
}
