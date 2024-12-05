import { ReadPollDto } from "@/app/lib/polls/types";

type IWordCloudProps = {
    words: ReadPollDto['results'];
}

export function WordCloud({ words }: IWordCloudProps) {
    return (
        <ul>
            {words.map(w => (
                <li key={w.value}>{w.count}: {w.value}</li>
            ))}
        </ul>
    )
}
