import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditCatModelComponent } from './create-edit-cat-model.component';

describe('CreateEditCatModelComponent', () => {
  let component: CreateEditCatModelComponent;
  let fixture: ComponentFixture<CreateEditCatModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditCatModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditCatModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
