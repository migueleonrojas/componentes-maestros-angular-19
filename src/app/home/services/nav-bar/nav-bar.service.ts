import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {

   private breakpointObserver = inject(BreakpointObserver);

   private resultMatches = signal<boolean>(false);

   

   setBreakPoint(breakPoint: string) {

      this.resultMatches.set(this.breakpointObserver.isMatched(breakPoint));

      this.breakpointObserver.observe(breakPoint).subscribe(( result: BreakpointState) => {
         this.resultMatches.set(result.matches);
      })

   }

   getBreakPointMatch(): Signal<boolean> {


      return this.resultMatches.asReadonly();
   }
  
}
