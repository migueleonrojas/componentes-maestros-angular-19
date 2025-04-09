interface Serie {
   name: string;
   value: number;
   domain: string;
}

interface ResultLinearGraph {
   name: string;
   series: Serie[]
}

export type LinearGraphState = {
   xAxisLabel: string;
   yAxisLabel: string;
   results: ResultLinearGraph[];
   colorScheme: string[]
}
