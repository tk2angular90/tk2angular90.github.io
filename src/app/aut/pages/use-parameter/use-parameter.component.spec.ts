import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseParameterComponent } from './use-parameter.component';

describe('UseParameterComponent', () => {
  let component: UseParameterComponent;
  let fixture: ComponentFixture<UseParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseParameterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
