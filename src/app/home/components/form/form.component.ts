import { AfterContentInit, ChangeDetectionStrategy, Component, effect, ElementRef, inject, input, linkedSignal, OnInit, output, QueryList, ViewChildren, viewChildren } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ResultGraph, ResultGraphForm } from '../../../core/models/graph-state.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit {
   
   resultGraphToEdit = input.required<ResultGraph>();

   edit = output<ResultGraph>();

   sendValueGraph = output<ResultGraph>();

   cancelEdit = output();

   formBuilder = inject(NonNullableFormBuilder);

   nameValidators: ValidatorFn[]  =   [ Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)*$') ];
   valueValidators: ValidatorFn[]  =  [ Validators.required, Validators.max(9999999999) ];
   domainValidators: ValidatorFn[]  = [ Validators.required ];

   containerValidators: ValidatorFn[][] = [
      this.nameValidators,
      this.valueValidators,
      this.domainValidators
   ]
   
   valueGraphFormGroup: FormGroup = this.formBuilder.group({});

   constructor() {
      effect(() => {
         const currentFormValues = this.resultGraphToEdit();

         this.valueGraphFormGroup.patchValue({
           name: currentFormValues.name,
           value: currentFormValues.value,
           domain: currentFormValues.domain,
         }, { emitEvent: false });

         this.markControls();

       });
   }

   ngOnInit(): void {
      
     this.valueGraphFormGroup = this.formBuilder.group<ResultGraphForm>({
         name:   [ '',  this.nameValidators],
         value:  [ 0,  this.valueValidators],
         domain: [ '', this.domainValidators]
      });

      
   }
   

   getValueGraph() {

      if(this.valueGraphFormGroup.invalid) return;

      if(this.resultGraphToEdit().id !== 0) {
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


   cancelEditing() {
      
      this.cancelEdit.emit();
   }

}
