import { voteForPoll } from "@/api/polls";
import { ReadPollDto } from "@/app/lib/polls/types";
import { Button } from "@/components/Button";
import { InputField } from "@/components/Input";
import { ChangeEvent, FormEvent, useState } from "react";

const MAX_INPUTS = 10;

type IVoteForPollProps = {
    poll: ReadPollDto;
};

export function VoteForPoll({ poll }: IVoteForPollProps) {
    const [words, setWords] = useState<string[]>([""]);
    const [error, setError] = useState<string>("");
    const [isSuccess, setSuccess] = useState<boolean>(false);

    const handleChange =
        (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
            const newWords = [...words];

            newWords[index] = event.target.value;
            setWords(newWords);

            const shouldAddNewInput =
                index === words.length - 1 &&
                words.length < MAX_INPUTS &&
                event.target.value !== "";

            if (shouldAddNewInput) {
                setWords([...newWords, ""]);
            } else {
                setWords(newWords);
            }
        };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const answers = words.filter((word) => word.trim() !== "");

        if (answers.length === 0) {
            setError("Please enter at least one word");
            return;
        }

        try {
            await voteForPoll(poll.id, { answers });
            setSuccess(true);
        } catch (err) {
            console.error(err);
            setError("Vote failed");
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl font-bold">Thank you!</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    {poll.title}
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {words.map((word, index) => (
                        <div key={index}>
                            <InputField
                                value={word}
                                onChange={handleChange(index)}
                                placeholder={`Enter word ${index + 1}`}
                                autoFocus={index === 0}
                            />
                        </div>
                    ))}
                    {error && <p className="text-xl text-red-500">{error}</p>}
                    <Button type="submit">Submit</Button>
                </form>
            </div>
        </div>
    );
}
