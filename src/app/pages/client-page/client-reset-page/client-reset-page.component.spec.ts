import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientResetPageComponent } from './client-reset-page.component';

describe('ClientResetPageComponent', () => {
  let component: ClientResetPageComponent;
  let fixture: ComponentFixture<ClientResetPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientResetPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientResetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
