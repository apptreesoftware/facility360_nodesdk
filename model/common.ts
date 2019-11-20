export type JsonObject = { [prop: string]: any };

export interface Result<T> {
  results: T[];
  totalDuration: number;
  averageDuration: number;
}
