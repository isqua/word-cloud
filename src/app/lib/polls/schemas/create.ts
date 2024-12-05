import { z } from 'zod';
import { CreatePollDto } from '../types';

export const CreatePollDtoSchema = z.object({
    title: z.string(),
    initial: z.array(z.string()),
}) satisfies z.ZodType<CreatePollDto>;
