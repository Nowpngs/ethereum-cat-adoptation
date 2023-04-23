import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { BACKEND_API } from '../constants/api.constants';
import { Offer, SellerOffer } from '../models/offer.models';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  constructor(private apiService: ApiService) {}

  getMyBuyingOffers(): Observable<Offer[]> {
    return this.apiService.get<Offer[]>(BACKEND_API.my_buying_offers);
  }

  geyMySellingOffers(): Observable<SellerOffer[]> {
    return this.apiService.get<SellerOffer[]>(BACKEND_API.my_selling_offers);
  }

  createOffer(data: {
    catId: number;
    buyerName: string;
    buyerEmail: string;
    buyerPhone: string;
  }): Observable<any> {
    return this.apiService.post(BACKEND_API.offer, data);
  }

  editOffer(
    id: number,
    data: { buyerName: string; buyerEmail: string; buyerPhone: string }
  ): Observable<any> {
    return this.apiService.update(BACKEND_API.offer + '/' + id, data);
  }

  confirmOffer(id: number): Observable<any> {
    return this.apiService.post(BACKEND_API.confirm_offer, { id: id });
  }
}
