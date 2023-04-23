export interface Offer {
  id: number;
  catId: number;
  catName: string;
  catBreed: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
}

export interface SellerOffer {
  catId: number;
  catName: string;
  catBreed: string;
  offer: CompactOffer[];
}

export interface CompactOffer {
  id: number;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
}
