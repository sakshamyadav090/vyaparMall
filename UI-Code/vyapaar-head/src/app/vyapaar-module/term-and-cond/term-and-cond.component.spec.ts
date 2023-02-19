import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermAndCondComponent } from './term-and-cond.component';

describe('TermAndCondComponent', () => {
  let component: TermAndCondComponent;
  let fixture: ComponentFixture<TermAndCondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermAndCondComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermAndCondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
