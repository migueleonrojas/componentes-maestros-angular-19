interface ResultCircleGraph {
   name: string;
   value: number;
   domain: string;
}

export type CircleGraphState = {
   results: ResultCircleGraph[];
   colorScheme: string[]
}
