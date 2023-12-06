import Product from "../../src/domain/entity/product/product";
import ProductRepository from "../../src/infra/repository/product/productRepository";
import  SequelizeConfig  from "../../src/infra/dao/config";
describe("ProductRepository unit test", () => {

  let sequelizeConfig = new SequelizeConfig();
  let productRepository;


  beforeEach(async () => {
    await sequelizeConfig.getSequelize().sync();
  });


  afterAll(async () => {
    // Feche a conexão com o banco de dados após os testes
    await sequelizeConfig.getSequelize().close();
  });

  it("should create product then find product", async () => {
   
    productRepository = new ProductRepository();
    const product = new Product("1", "1", 100);
    await productRepository.create(product);

    const productSearch = await productRepository.findById("1");

    expect(productSearch).toStrictEqual(product);

  });

  it("should create product then count product", async () => {
   
    productRepository = new ProductRepository();
    const product = new Product("2", "product 2", 100);
    await productRepository.create(product);

    const count = await productRepository.count();

    expect(1).toBe(count);

  });

  it("should create product then update product", async () => {
   
    productRepository = new ProductRepository();
    const product = new Product("1", "1", 100);
    await productRepository.create(product);

    product.changeName("2");
    product.changePrice(200);

    await productRepository.update(product);

    const productSearch = await productRepository.findById("1");

    expect(productSearch).toStrictEqual(product);

  });
  it("should create product then findAll product", async () => {
   
    productRepository = new ProductRepository();
    const product = new Product("1", "1", 100);
    const product2 = new Product("2", "2", 100);
    await productRepository.create(product);
    await productRepository.create(product2);


    const productSearchPage1: Product [] = await productRepository.findAll(0,1);

    expect(productSearchPage1.length).toBe(1);


    const productSearchPage2: Product [] = await productRepository.findAll(1,1);

    expect(productSearchPage2.length).toBe(1);

  });

  it("should create product then findByParameter product", async () => {
   
    productRepository = new ProductRepository();
    const product = new Product("1", "1", 100);
    const product2 = new Product("2", "2", 100);
    await productRepository.create(product);
    await productRepository.create(product2);


    const productSearchPage1: Product [] = await productRepository.findByParameter([{name: 1}]);

    expect(productSearchPage1.length).toBe(1);


    const productSearchPage2: Product [] = await productRepository.findByParameter([{price:100}]);

    expect(productSearchPage2.length).toBe(2);

  });

});
