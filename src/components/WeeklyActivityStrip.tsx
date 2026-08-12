import { Check } from "lucide-react";
import { getCurrentWeekDates } from "../utils/getCurrentWeekDates";
import { Card } from "./Card";

interface WeeklyActivityStripProps {
    activeDates: string[]; // "YYYY-MM-DD"
    className?: string;
}

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function WeeklyActivityStrip({activeDates, className = ""}: WeeklyActivityStripProps){
    const weekDates = getCurrentWeekDates();
    const activeSet = new Set(activeDates);

    return (
        <Card variant="subject" className={className}>
            <h2 className="text-xl font-bold">Weekly Activity</h2>
            <p className="pt-2">Keep track of your consistency</p>
            <div className="flex justify-between pt-5">
                {weekDates.map((date, i) => {
                    const isActive = activeSet.has(date);

                    return (
                        <div key={date} className="flex flex-col items-center gap-1">
                            <span className="text-xs text-gray-500">{DAY_LABELS[i]}</span>
                            <div
                                className={`w-7 h-7 md:size-9 rounded-full flex items-center justify-center ${
                                    isActive ? "bg-orange-400 text-white" : "bg-gray-200 text-gray-300"
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