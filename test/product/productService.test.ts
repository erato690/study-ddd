import Product from "../../src/domain/entity/product/product";
import ProductService from "../../src/domain/service/product/productService";

describe("ProductService unit test", () => {
  let productService: ProductService;

  beforeEach(() => {
    productService = new ProductService();
  });

  it("should increase price of products by percentage", () => {
    const products: Product[] = [
      new Product("1", "Product 1", 100),
      new Product("2", "Product 2", 200),
      new Product("3", "Product 3", 300),
    ];

    const increasedProducts = productService.increasePrice(products, 10);

    expect(increasedProducts.length).toBe(3);
    expect(increasedProducts[0].getPrice()).toBe(110);
    expect(increasedProducts[1].getPrice()).toBe(220);
    expect(increasedProducts[2].getPrice()).toBe(330);
  });
});