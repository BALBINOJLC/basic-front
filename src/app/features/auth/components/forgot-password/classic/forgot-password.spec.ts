import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordClassicComponent } from './forgot-password.component';

describe('ForgotPasswordClassicComponent', () => {
  let component: ForgotPasswordClassicComponent;
  let fixture: ComponentFixture<ForgotPasswordClassicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPasswordClassicComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordClassicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
