export function formatEvent<T>(type: string, event: T) {
    return `event: ${type}\ndata: ${JSON.stringify(event)}\n\n`;
}
