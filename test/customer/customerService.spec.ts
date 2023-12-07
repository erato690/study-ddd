import SequelizeConfig from "../../src/infra/dao/config";
import EventDispatcher from "../../src/infra/event/eventDispatcher";
import CustomerRepository from "../../src/infra/repository/customer/customerRepository";
import CustomerService from "../../src/domain/service/customer/customerService";
import Address from "../../src/domain/entity/customer/address";
import Customer from "../../src/domain/entity/customer/customer";
import CustomerCreatedHandler1 from "../../src/infra/event/handler/customer/customerCreatedHandler1";
import CustomerCreatedHandler2 from "../../src/infra/event/handler/customer/customerCreatedHandler2";


describe("CustomerService unit test", () => {

    const sequelizeConfig = new SequelizeConfig();

  
  
    beforeEach(async () => {
      await sequelizeConfig.getSequelize().sync();
    });
  
  
    afterAll(async () => {
      // Feche a conexão com o banco de dados após os testes
      await sequelizeConfig.getSequelize().close();
    });


    it("should create customer then send event", async () => {
        
        
        const eventBus = new EventDispatcher();
        const customerRepository = new CustomerRepository();

        const eventHandler1 = new CustomerCreatedHandler1();
        const eventHandler2 = new CustomerCreatedHandler2();


        const spyHandler  = jest.spyOn(eventBus, 'notify');


        const customerService = new CustomerService(customerRepository,eventBus);

  
        customerService.createCustomer(new Customer("1", "client-1", new Address("1", "Main Street", "New York", "NY", 10000)));


        expect(spyHandler).toHaveBeenCalledTimes(1);

    });

    it("should change address customer then send event", async () => {
        
        
      const eventBus = new EventDispatcher();
      const customerRepository = new CustomerRepository();

      const eventHandler1 = new CustomerCreatedHandler1();
      const eventHandler2 = new CustomerCreatedHandler2();


      const spyHandler  = jest.spyOn(eventBus, 'notify');


      const customerService = new CustomerService(customerRepository,eventBus);

      let customer = new Customer("1", "client-1", new Address("Main Street", "New York", "NY", "10000",1));

      await customerService.createCustomer(customer);

      customer.setAddress(new Address("Cardoso de alneida", "São Paulo", "SP", "0014665",10));


      await customerService.changeAddress(customer);


      expect(spyHandler).toHaveBeenCalledTimes(2);

  });
});  