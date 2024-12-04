export type PollId = string;
export type Word = string;

export type IPoll = {
    title: string;
    results: IPollResults;
}

export type IPollResults = Map<Word, number>;

export type CreatePollDto = {
    title: string;
    initial: Word[];
}

export type ReadPollDto = {
    id: PollId;
    title: string;
}
