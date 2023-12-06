import Product from "../../entity/product/product";
import ICrud from "../iCrud";

export default interface IProductRepository extends ICrud<Product> {
    findByName(name: string): Promise<Product[]>;

}