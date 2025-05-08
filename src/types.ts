export interface BookExplanation {
  historicalContext: string;
  mainCharacters: string;
  keyEvents: string;
  centralThemes: string;
  spiritualApplications: string;
  notableQuotes: string;
  biblicalConnection: string;
}

export interface ApiError {
  message: string;
  code?: string;
}