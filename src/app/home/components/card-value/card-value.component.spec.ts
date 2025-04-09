import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardValueComponent } from './card-value.component';

describe('CardValueComponent', () => {
  let component: CardValueComponent;
  let fixture: ComponentFixture<CardValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardValueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
