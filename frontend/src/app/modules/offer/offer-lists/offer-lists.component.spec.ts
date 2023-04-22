import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferListsComponent } from './offer-lists.component';

describe('OfferListsComponent', () => {
  let component: OfferListsComponent;
  let fixture: ComponentFixture<OfferListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferListsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
