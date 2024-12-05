"use client";

import { createPoll } from "@/api/polls";
import { Button } from "@/components/Button";
import { InputField } from "@/components/Input";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export function CreatePoll() {
    const [title, setTitle] = useState("");
    const [error, setError] = useState<string>("");
    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setError("");
        setTitle(e.target.value);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            const poll = await createPoll({
                title,
                initial: [],
            });

            router.push(`/polls/${poll.id}`);
        } catch (error) {
            console.error("Error:", error);
            setError("Failed to create poll");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    Create Poll
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <InputField
                            autoFocus
                            value={title}
                            onChange={handleChange}
                            placeholder="Enter poll text"
                            required
                        />
                    </div>
                    {error && <p className="text-xl text-red-500">{error}</p>}
                    <Button>Create</Button>
                </form>
            </div>
        </div>
    );
}
