

export default interface ICrud<T> {
  create(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  findById(id: string): Promise<T>;
  findAll(currentPage: number, maxItemPerPage: number): Promise<T[]>;
  findByParameter( itens:any []): Promise<T[]>;
  count(): Promise<number>;
}
