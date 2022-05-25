export interface GetAllProductRequest {
  query?: string;
  filter?: string[];
  sort?: string;
  page?: number;
  size?: number;
}
