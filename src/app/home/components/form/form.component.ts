import { ChangeDetectionStrategy, Component, inject, input, linkedSignal, model, OnInit, output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ResultGraph } from '../../../core/models/graph-state.model';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {

   toEditValueGraph = input<ResultGraph| undefined>();

   formValues = linkedSignal(() => this.toEditValueGraph())

   editingValueGraph = output<ResultGraph>();

   sendValueGraph = output<ResultGraph>();

   cancelEdit = output();

   formBuilder = inject(NonNullableFormBuilder);
   

   valueGraphFormGroup: FormGroup = this.formBuilder.group({
      name:  ['', [ Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)*$') ] ],
      value: ['', [ Validators.required, Validators.max(9999999999) ]],
      domain: ['', [ Validators.required]]
   });

   

   getValueGraph() {

      if(this.valueGraphFormGroup.invalid) return;

      if(this.toEditValueGraph() !== undefined) {

         this.editingValueGraph.emit({
            id: this.toEditValueGraph()?.id,
            ...this.valueGraphFormGroup.value
         });


         return;
      }
      
      this.formValues.set({
         id: 0,
         name: '',
         value: 0,
         domain: ''
      });

      this.sendValueGraph.emit({id: new Date().getTime(), ...this.valueGraphFormGroup.value});

      
   }

   cancelEditing() {
      this.cancelEdit.emit();
   }

}
