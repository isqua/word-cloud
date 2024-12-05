import type { Status } from "@/app/lib/shared/types";

type IStatusIndicatorProps = {
    status: Status;
};

const colorByStatus: Record<Status, string> = {
    idle: "text-slate-400",
    error: "text-rose-400",
    success: "text-emerald-500",
};

export function StatusIndicator({ status }: IStatusIndicatorProps) {
    return (
        <span className={`font-bold text-3xl ${colorByStatus[status]}`}>•</span>
    );
}
