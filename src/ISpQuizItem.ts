export interface ISPQuizItem {
  Title: string;
  DayLightSaving: boolean;
  DayLightSavingAPI?: boolean;
  City: string;
  DayOfWeek: string;
  DayOfWeekAPI?: string;
  DayOfYear: number | null;
  DayOfYearAPI?: Number;
  TimeZones: string;
  TimeZonesAPI?: string;
}
