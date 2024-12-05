import { NotFoundException, UnexpectedException } from '@/app/lib/errors';
import { service } from '@/app/lib/polls';
import { NextContext } from '@/app/lib/shared/types';
import { NextRequest } from 'next/server';

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
