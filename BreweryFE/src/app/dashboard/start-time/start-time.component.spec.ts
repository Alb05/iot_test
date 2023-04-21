import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartTimeComponent } from './start-time.component';

describe('StartTimeComponent', () => {
  let component: StartTimeComponent;
  let fixture: ComponentFixture<StartTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
