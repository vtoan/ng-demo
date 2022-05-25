export interface PagingResponse<K> {
  count: number;
  total: number;
  description: string;
  data: K;
}
