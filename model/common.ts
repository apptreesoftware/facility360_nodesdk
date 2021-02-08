export type JsonObject = { [prop: string]: any };

export interface Result<T> {
  results: T[];
  first: T | null;
  totalDuration: number;
  averageDuration: number;
}
