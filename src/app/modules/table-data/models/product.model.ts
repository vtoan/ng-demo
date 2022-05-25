export interface ProductResponse {
  id: string | null;
  name: string;
  code: string;
  price: number;
  image: string;
  discount: number;
  slug: string;
  productPromotionId: string | null;
  categoryId: string | null;
  bandId: string | null;
  wireId: string | null;
}
