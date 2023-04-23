import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { BACKEND_API } from '../constants/api.constants';
import { Offer } from '../models/offer.models';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  constructor(private apiService: ApiService) {}

  getMyBuyingOffers(): Observable<Offer[]> {
    return this.apiService.get<Offer[]>(BACKEND_API.my_buying_offers);
  }

  createOffer(data: { catId: number; price: number }): Observable<any> {
    return this.apiService.post(BACKEND_API.offer, data);
  }
}
