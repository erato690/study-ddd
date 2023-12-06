import Product from "../../src/domain/entity/product/product";

describe("Product unit test", () => {
  it("should create an instance of Order", () => {
    expect(() => new Product("1", "1", 100)).not.toThrow();
  });

  it("should throw error when id is empty", () => {
    expect(() => new Product("", "1", 100)).toThrow("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => new Product("1", "", 100)).toThrow("Name is required");
  });

  it("should throw error when price is less zero", () => {
    expect(() => new Product("1", "1", -1)).toThrow("Price is required");
  });

  it("should change name", () => {
    const product = new Product("1", "1", 100);
    product.changeName("2");
    expect(product.getName()).toBe("2");
  });

  it("should throw error when change name to empty", () => {
    const product = new Product("1", "1", 100);
    expect(() =>product.changeName("")).toThrow("Name is required");
  });


  it("should change price", () => {
    const product = new Product("1", "1", 100);
    product.changePrice(5);
    expect(product.getPrice()).toBe(5);
  });

  it("should throw error when change price to less zero", () => {
    const product = new Product("1", "1", 100);
    expect(() => product.changePrice(-1)).toThrow("Price is required");
  });

});
