import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentHumidityComponent } from './current-humidity.component';

describe('CurrentHumidityComponent', () => {
  let component: CurrentHumidityComponent;
  let fixture: ComponentFixture<CurrentHumidityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentHumidityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentHumidityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
