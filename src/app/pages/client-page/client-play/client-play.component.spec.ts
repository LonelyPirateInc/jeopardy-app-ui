import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPlayComponent } from './client-play.component';

describe('ClientPlayComponent', () => {
  let component: ClientPlayComponent;
  let fixture: ComponentFixture<ClientPlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientPlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
