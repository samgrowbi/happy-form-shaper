import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { formatDateOnly } from "@/lib/dateOnly";
import { format } from "date-fns";

interface BookingCalendarProps {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  availableDates: Date[];
  isLoading: boolean;
  isMobile?: boolean;
  onMonthChange?: (month: Date) => void;
  timezone?: string;
}

export function BookingCalendar({
  selectedDate,
  onDateSelect,
  availableDates,
  isLoading,
  onMonthChange,
}: BookingCalendarProps) {
  const availableKeys = new Set(availableDates.map((d) => formatDateOnly(d)));
  const sorted = [...availableDates].sort((a, b) => a.getTime() - b.getTime());
  const firstAvailable = sorted[0];

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-6">
        <Skeleton className="h-7 w-40 mx-auto" />
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 35 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-full rounded-md" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 p-4 sm:p-6 lg:p-8">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={(date) => date && onDateSelect(date)}
        defaultMonth={selectedDate ?? firstAvailable ?? new Date()}
        onMonthChange={onMonthChange}
        fromMonth={new Date()}
        disabled={(date) => !availableKeys.has(formatDateOnly(date))}
        modifiers={{ available: (date) => availableKeys.has(formatDateOnly(date)) }}
        modifiersClassNames={{
          available: "font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100",
        }}
        className={cn("p-3 pointer-events-auto")}
      />

      {availableDates.length === 0 ? (
        <p className="text-muted-foreground text-sm text-center">
          No available dates this month. Try the next month.
        </p>
      ) : (
        firstAvailable && (
          <p className="text-xs lg:text-sm text-muted-foreground text-center">
            Earliest availability: {format(firstAvailable, "EEEE, MMMM d")}
          </p>
        )
      )}
    </div>
  );
}
