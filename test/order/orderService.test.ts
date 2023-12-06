import Order from "../../src/domain/entity/order/order";
import OrderItem from "../../src/domain/entity/order/orderItem";
import Customer from "../../src/domain/entity/customer/customer";
import OrderService from "../../src/domain/service/order/orderService";

describe("OrderService unit test", () => {
  let orderService: OrderService;
  const orderItems:  OrderItem [] =[
    new OrderItem("1", "1", 1, 100,"1"),
    new OrderItem("2", "2", 1, 200,"2"),
    new OrderItem("3", "3", 1, 300,"3"),

  ];




  beforeEach(() => {
    orderService = new OrderService();
  });

  it("should calculate the total sum of orders", () => {
    const orders: Order[] = [
      new Order("1", "client 1", [orderItems[0],orderItems[1]]),
      new Order("2", "client 2", [orderItems[1],orderItems[2]]),
      new Order("3", "client 3", [orderItems[0],orderItems[2]]),
    ];

    const totalSum = orderService.sumTotalOrder(orders);

    expect(totalSum).toBe(1200);
  });

  it("should place on order", () => {

    const customer1 = new Customer("1", "client 1");
    const itens: OrderItem[] = [
      new OrderItem("1", "1", 1, 100,"1"),
    ];
    const order = orderService.placeOrder(customer1, itens);


    expect(customer1.getRewardPoint()).toBe(50);
    expect(order.total()).toBe(100);
  });
});