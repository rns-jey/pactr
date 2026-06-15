import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/molecules/Card";
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";
import { Button } from "../atoms/Button";
import { cn } from "@/lib/utils";

interface DayData {
  date: Date;
  isCurrentMonth: boolean;
}

export default function WorkoutStreakCard() {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const calendarData = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // Get the first day of the month
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startingDay = firstDayOfMonth.getDay();
    const days: (DayData | null)[] = [];

    const previousMonthLastDay = new Date(year, month, 0);

    // Add empty cells for padding
    for (let i = startingDay - 1; i >= 0; i--) {
      const date = new Date(
        year,
        month - 1,
        previousMonthLastDay.getDate() - i,
      );
      const dateString = date.toDateString();

      days.push({ date, isCurrentMonth: false });
    }

    // Add days of the current month
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const date = new Date(year, month, i);
      const dateString = date.toDateString();

      days.push({ date, isCurrentMonth: true });
    }

    // Add empty cells for padding at the end
    for (
      let i = 0;
      i < 7 - ((startingDay + lastDayOfMonth.getDate()) % 7);
      i++
    ) {
      const date = new Date(year, month + 1, i + 1);
      const dateString = date.toDateString();

      days.push({ date, isCurrentMonth: false });
    }

    return days;
  }, [currentMonth]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="text-primary h-5 w-5" />
          Workout Streak
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Month Navigation */}
        <div className="flex items-center justify-between">
          <Button variant={"ghost"} size={"icon"}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span>{formatMonthYear(currentMonth)}</span>
          <Button variant={"ghost"} size={"icon"}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Week Day Headers */}
        <div className="mt-4 grid grid-cols-7 gap-2">
          {weekDays.map((day) => (
            <div
              key={day}
              className={cn(
                "text-muted-foreground text-center text-xs font-medium",
              )}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="mt-2 grid grid-cols-7 gap-2">
          {calendarData.map((day, index) => (
            <div key={index} className="text-center">
              {day ? (
                <Button
                  variant="outline"
                  disabled={!day.isCurrentMonth}
                  className={cn(
                    "w-full",
                    isToday(day.date) && "ring-primary ring-2 ring-offset-2",
                  )}
                >
                  {day.date.getDate()}
                </Button>
              ) : null}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
