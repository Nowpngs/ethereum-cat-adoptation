import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatListsComponent } from './cat-lists.component';

describe('CatListsComponent', () => {
  let component: CatListsComponent;
  let fixture: ComponentFixture<CatListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatListsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
