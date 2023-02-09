export interface ImageThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Image {
  url: string;
  width: number;
  height: number;
  thumbnails?: ImageThumbnail[];
  alternateText?: string;
}

export interface ComplexImage {
  image: Image;
  details?: string;
  description?: string;
  clickthroughUrl?: string;
}

export type PaymentOption = {
  name: string;
  price: number;
};

export default interface Ce_product {
  slug?: string;
  name: string;
  c_brand?: string;
  c_rating?: number;
  c_reviewCount?: number;
  photoGallery?: ComplexImage[];
  c_paymentOptions?: PaymentOption[];
}
