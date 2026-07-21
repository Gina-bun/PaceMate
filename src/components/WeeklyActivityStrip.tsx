import { Check } from "lucide-react";
import { getCurrentWeekDates } from "../utils/getCurrentWeekDates";
import { Card } from "./Card";

interface WeeklyActivityStripProps {
    activeDates: string[]; // "YYYY-MM-DD"
}

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function WeeklyActivityStrip({activeDates}: WeeklyActivityStripProps){
    const weekDates = getCurrentWeekDates();
    const activeSet = new Set(activeDates);

    return (
        <Card variant="subject">
            <div className="flex justify-between">
                {weekDates.map((date, i) => {
                    const isActive = activeSet.has(date);

                    return (
                        <div key={date} className="flex flex-col items-center gap-1">
                            <span className="text-xs text-gray-500">{DAY_LABELS[i]}</span>
                            <div
                                className={`w-7 h-7 rounded-full flex items-center justify-center ${
                                    isActive ? "bg-orange-400 text-white" : "bg-gray-100 text-gray-300"
                                    }`}
                            >
                                {isActive && <Check size={14}/>}
                            </div>
                        </div>
                    )
                })}
            </div>
        </Card>
    )
}