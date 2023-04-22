import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketListsComponent } from './market-lists.component';

describe('MarketListsComponent', () => {
  let component: MarketListsComponent;
  let fixture: ComponentFixture<MarketListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketListsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
