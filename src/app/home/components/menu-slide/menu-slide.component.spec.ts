import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSlideComponent } from './menu-slide.component';

describe('MenuSlideComponent', () => {
  let component: MenuSlideComponent;
  let fixture: ComponentFixture<MenuSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuSlideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
