import { z } from "zod";
import { VoteForPollDto } from "../types";

export const VoteForPollDtoSchema = z.object({
    answers: z.array(z.string()),
}) satisfies z.ZodType<VoteForPollDto>;
