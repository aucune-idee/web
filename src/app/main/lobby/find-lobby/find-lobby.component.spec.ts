import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindLobbyComponent } from './find-lobby.component';

describe('FindLobbyComponent', () => {
  let component: FindLobbyComponent;
  let fixture: ComponentFixture<FindLobbyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindLobbyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindLobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
