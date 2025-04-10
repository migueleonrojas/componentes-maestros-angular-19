
export interface ResultGraph {
   name: string;
   value: number;
   domain: string;
}

export type GraphState = {
   xAxisLabel: string;
   yAxisLabel: string;
   results: ResultGraph[];
   colorScheme: string[]
}