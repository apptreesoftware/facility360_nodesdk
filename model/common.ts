export type JsonObject = { [prop: string]: any };

export interface Result<T> {
  results: T[];
  first: T | null;
  totalDuration: number;
  averageDuration: number;
}

export interface SdkCallInfo {
  method: string;
  url: string;
  baseUrl: string;
  requestHeaders: Record<string, any>;
  requestBody: any;
  responseStatus: number | null;
  responseBody: any;
  durationMs: number;
  error?: string;
}

export type OnCompleteCallback = (info: SdkCallInfo) => void;
