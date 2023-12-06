
import { v4 as UUID } from 'uuid';
import Order from '../../entity/order/order';
import Customer from '../../entity/customer/customer';
import OrderItem from '../../entity/order/orderItem';

export default class OrderService{


    sumTotalOrder(order: Order [] ): number{
        let total = 0;
        return order.reduce((total, order) => total + order.total(), 0);
    }

    placeOrder(customer: Customer, itens: OrderItem[]): Order{
        const order = new Order(UUID(), customer.getId(), itens);

        customer.addRewardPoint(order.total() / 2);

        return order;
    }
}