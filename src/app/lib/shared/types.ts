export type NextContext<TParams extends Record<string, string>> = {
    params: Promise<TParams>;
};

export type Status = "idle" | "success" | "error";
