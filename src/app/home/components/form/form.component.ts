import { AfterContentInit, ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, input, linkedSignal, OnInit, output, QueryList, signal, ViewChildren, viewChildren } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ResultGraph, ResultGraphForm } from '../../../core/models/graph-state.model';
import { valueIncludedInArrayObject } from '../../../core/validators/value-in-array-of-objets.validator';


@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit {
   
   resultGraphToEdit = input.required<ResultGraph>();

   resultGraphs = input.required<ResultGraph[]>()

   edit = output<ResultGraph>();

   sendValueGraph = output<ResultGraph>();

   cancelEdit = output();

   isEditing = computed(() => this.resultGraphToEdit().id !== 0)

   formBuilder = inject(NonNullableFormBuilder);

   valueGraphFormGroup: FormGroup = this.formBuilder.group({});

   private valueIncludedInArrayObjectValidator: ValidatorFn | null = null;

   constructor() {
      effect(() => {

         const currentFormValues = this.resultGraphToEdit();

         this.valueGraphFormGroup.patchValue({
           name: currentFormValues.name,
           value: currentFormValues.value,
           domain: currentFormValues.domain,
         }, { emitEvent: false });

         this.markControls();

         this.toggleValidatorNameRepeatInResults();

      });
   }

   ngOnInit(): void {

      this.valueIncludedInArrayObjectValidator = valueIncludedInArrayObject('name', this.resultGraphs());
      
     this.valueGraphFormGroup = this.formBuilder.group<ResultGraphForm>({
         name:   ['',  [
            Validators.required,
            Validators.maxLength(30),
            Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)*$'),
            this.valueIncludedInArrayObjectValidator
         ]],
         value:  [0, [
            Validators.required, 
            Validators.max(9999999999)
         ]],
         domain: ['', [
            Validators.required
         ]]
      });

      

      
   }


   

   getValueGraph() {

      if(this.valueGraphFormGroup.invalid) return;

      if(this.isEditing()) {
         this.edit.emit({
            id: this.resultGraphToEdit()?.id,
            ...this.valueGraphFormGroup.value
         });
         
         return;
      }
      
      this.sendValueGraph.emit({id: new Date().getTime(), ...this.valueGraphFormGroup.value});

   }

   private markControls () {
      Object.values(this.valueGraphFormGroup.controls).map(control => {
         control.markAsUntouched();
         control.markAsPristine();
      });
   }

   private toggleValidatorNameRepeatInResults() {
      
      if(this.isEditing()) {
         this.valueGraphFormGroup.get('name')?.removeValidators(this.valueIncludedInArrayObjectValidator!);
         this.valueGraphFormGroup.get('name')?.updateValueAndValidity();
      }

      else {
         this.valueGraphFormGroup.get('name')?.addValidators(this.valueIncludedInArrayObjectValidator!);
         this.valueGraphFormGroup.get('name')?.updateValueAndValidity();
      }
      
   }


   cancelEditing() {
      
      this.cancelEdit.emit();
   }

}
