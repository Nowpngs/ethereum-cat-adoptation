export interface Offer {
  id: number;
  catId: number;
  catName: string;
  catBreed: string;
  price: number;
}

export interface SellerOffer {
  catId: number;
  catName: string;
  catBreed: string;
  offer: CompactOffer[];
}

export interface CompactOffer {
  id: number;
  price: number;
}
