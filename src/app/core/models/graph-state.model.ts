
export interface ResultGraph {
   id: number;
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