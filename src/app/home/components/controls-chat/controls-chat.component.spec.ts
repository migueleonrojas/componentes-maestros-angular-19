import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlsChatComponent } from './controls-chat.component';

describe('ControlsChatComponent', () => {
  let component: ControlsChatComponent;
  let fixture: ComponentFixture<ControlsChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlsChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlsChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
