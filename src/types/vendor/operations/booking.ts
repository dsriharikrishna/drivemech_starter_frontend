export interface BookingEvent {
  id: string;
  title: string;
  startTime: string; // Format: "HH:MM"
  endTime?: string;
  date: string; // ISO date string format (e.g., "2025-04-30")
  color?: "blue" | "red" | "yellow" | "green";
}

export type CalendarView = "day" | "week" | "month";
