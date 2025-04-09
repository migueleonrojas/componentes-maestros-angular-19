
interface ResultBarGraph {
   name: string;
   value: number;
   domain: string;
}

export type BarGraphState = {
   xAxisLabel: string;
   yAxisLabel: string;
   results: ResultBarGraph[];
   colorScheme: string[]
}