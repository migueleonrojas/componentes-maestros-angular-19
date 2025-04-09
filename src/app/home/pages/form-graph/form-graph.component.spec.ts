import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGraphComponent } from './form-graph.component';

describe('FormGraphComponent', () => {
  let component: FormGraphComponent;
  let fixture: ComponentFixture<FormGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
