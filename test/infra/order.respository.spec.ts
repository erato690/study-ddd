
import Address from "../../src/domain/entity/customer/address";
import Customer from "../../src/domain/entity/customer/customer";
import Order from "../../src/domain/entity/order/order";
import OrderItem from "../../src/domain/entity/order/orderItem";
import  SequelizeConfig  from "../../src/infra/dao/config";
import CustomerRepository from "../../src/infra/repository/customer/customerRepository";
import OrderRepository from "../../src/infra/repository/order/orderRepository";


describe("OrderRepository unit test", () => {

  let sequelizeConfig = new SequelizeConfig();
  let customerRepository;


  beforeEach(async () => {
    await sequelizeConfig.getSequelize().sync();
  });


  afterAll(async () => {
    // Feche a conexão com o banco de dados após os testes
    await sequelizeConfig.getSequelize().close();
  });


  it("should create new order then find order", async () => {
       
    customerRepository = new CustomerRepository();
    const orderRepository = new OrderRepository();

    const customer = new Customer("1", "client-1");
    customer.setAddress( new Address("1", "Main Street", "New York", "NY", 10000));

    await customerRepository.create(customer);

    const order =  new Order("1", customer.getId(), [new OrderItem("1", "product 1", 100, 1,"1")]);

    await orderRepository.create(order);

    const orderSearch = await orderRepository.findById("1");

    expect(orderSearch).toStrictEqual(order);

  });


  it("should create order then count order", async () => {
    customerRepository = new CustomerRepository();
    const orderRepository = new OrderRepository();

    const customer = new Customer("1", "client-1");
    customer.setAddress( new Address("1", "Main Street", "New York", "NY", 10000));

    await customerRepository.create(customer);

    const order =  new Order("1", customer.getId(), [new OrderItem("1", "product 1", 100, 1,"1")]);

    await orderRepository.create(order);

    const count = await orderRepository.count();

    expect(1).toBe(count);

  });

  it("should create product then update product", async () => {
   
    customerRepository = new CustomerRepository();
    const orderRepository = new OrderRepository();

    const customer = new Customer("1", "client-1");
    customer.setAddress( new Address("1", "Main Street", "New York", "NY", 10000));

    await customerRepository.create(customer);

    const order =  new Order("1", customer.getId(), [new OrderItem("1", "product 1", 100, 1,"1")]);

    await orderRepository.create(order);

    order.addItems(new OrderItem("2", "product 2", 100, 1,"2"));

    await orderRepository.update(order);

    const orderSearch = await orderRepository.findById("1");

    expect(order).toStrictEqual(orderSearch);

  });
  it("should create product then findAll product", async () => {
   
    customerRepository = new CustomerRepository();
    const orderRepository = new OrderRepository();

    const customer = new Customer("1", "client-1");
    customer.setAddress( new Address("1", "Main Street", "New York", "NY", 10000));

    await customerRepository.create(customer);

    const order =  new Order("1", customer.getId(), [new OrderItem("1", "product 1", 100, 1,"1")]);
    const order2 =  new Order("2", customer.getId(), [new OrderItem("2", "product 2", 100, 1,"1")]);


    await orderRepository.create(order);
    await orderRepository.create(order2);

    
    let orderSearchPage1 = await orderRepository.findAll(0,1);
    expect(orderSearchPage1.length).toBe(1);

    let orderSearchPage2 = await orderRepository.findAll(1,1);
    expect(orderSearchPage2.length).toBe(1);
  });

  it("should create product then findByParameter product", async () => {
   
    customerRepository = new CustomerRepository();
    const orderRepository = new OrderRepository();

    const customer = new Customer("1", "client-1");
    customer.setAddress( new Address("1", "Main Street", "New York", "NY", 10000));

    await customerRepository.create(customer);

    const order =  new Order("1", customer.getId(), [new OrderItem("1", "product 1", 100, 1,"1")]);
    const order2 =  new Order("2", customer.getId(), [new OrderItem("2", "product 2", 100, 1,"1")]);


    await orderRepository.create(order);
    await orderRepository.create(order2);

    let findByCustomerId = await orderRepository.findByParameter([{customerId:"1"}]);

    expect(findByCustomerId.length).toBe(2);
   
  
  });


});