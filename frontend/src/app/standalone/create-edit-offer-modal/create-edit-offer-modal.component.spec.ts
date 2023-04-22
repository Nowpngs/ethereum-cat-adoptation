import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditOfferModalComponent } from './create-edit-offer-modal.component';

describe('CreateEditOfferModalComponent', () => {
  let component: CreateEditOfferModalComponent;
  let fixture: ComponentFixture<CreateEditOfferModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditOfferModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditOfferModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
