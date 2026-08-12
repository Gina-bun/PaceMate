import type { ProgressBarProps } from "../components/types";

export function getPercentage({value, max}: ProgressBarProps){
    if (!Number.isFinite(value) || !Number.isFinite(max) || max === 0) return 0;
    return Math.round(Math.min((value / max) * 100, 100) * 10) / 10;
}
