import Product from "../../../domain/entity/product/product";
import IProductRepository from "../../../domain/repository/product/iProductRepository";
import ProductModel from "../../dao/model/productModel";

export default class ProductRepository implements IProductRepository {
 

  findByParameter(query: any[]): Promise<Product[]> {
    return  ProductModel.findAll({ where: query }).then((products) => {
        return products.map((product) => {
          return new Product(product.id, product.name, product.price);
        });
      });
  }

  findByName(name: string): Promise<Product[]> {
   return  ProductModel.findAll({ where: { name: name , id: name } }).then((products) => {
      return products.map((product) => {
        return new Product(product.id, product.name, product.price);
      });
    });
  }


  async create(entity: Product): Promise<void> {
   await  ProductModel.create({
      id: entity.getId(),
      name: entity.getName(),
      price: entity.getPrice(),
    });
  }
  async update(entity: Product): Promise<void> {
    await ProductModel.update(
      {
        name: entity.getName(),
        price: entity.getPrice(),
      },
      {
        where: {
          id: entity.getId(),
        },
      }
    );
  }
  async findById(id: string): Promise<Product> {

   return  new Promise((resolve, reject) => {

        ProductModel.findByPk(id).then((product) => {
            if (product) {
                resolve(new Product(product.id, product.name, product.price));
            }
            reject(new Error("Product not found"));
        });

    });

  }

  findAll(currentPage: number, maxItemPerPage: number): Promise<Product[]> {
   return  ProductModel.findAll({  offset: currentPage, limit: maxItemPerPage }).then((products) => {
      return products.map((product) => {   
        return new Product(product.id, product.name, product.price);
      });
    });

  }
  count(): Promise<number> {
    return ProductModel.count().then((count) => {
      return count;
    });
  }
}
