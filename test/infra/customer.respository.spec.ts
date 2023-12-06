
import { AfterDestroy, BeforeDestroy } from "sequelize-typescript";
import Address from "../../src/domain/entity/customer/address";
import Customer from "../../src/domain/entity/customer/customer";
import SequelizeConfig  from "../../src/infra/dao/config";
import CustomerRepository from "../../src/infra/repository/customer/customerRepository";

describe("CustomerRepository unit test", () => {

  const sequelizeConfig = new SequelizeConfig();
  let customerRepository;



  beforeEach(async () => {
    await sequelizeConfig.getSequelize().sync();
  });


  afterAll(async () => {
    // Feche a conexão com o banco de dados após os testes
    await sequelizeConfig.getSequelize().close();
  });

  it("should create customer then find customer", async () => {
   
    customerRepository = new CustomerRepository();
    const customer = new Customer("1", "client-1");
    customer.setAddress( new Address("1", "Main Street", "New York", "NY", 10000));

    await customerRepository.create(customer);

    const customerSearch = await customerRepository.findById("1");

    expect(customerSearch).toStrictEqual(customer);

  });


  it("should throw an erro when customer not found", async () => {
   
  
   await expect(async () =>{
      customerRepository = new CustomerRepository();
      await customerRepository.findById("4");
    }).rejects.toThrow("Customer not found");

  });

});