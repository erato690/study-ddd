import Order from "../../../domain/entity/order/order";
import OrderItem from "../../../domain/entity/order/orderItem";
import IOrderRepository from "../../../domain/repository/order/iOrderRepository";
import OrderItemsModel from "../../dao/model/orderItensModel";
import OrderModel from "../../dao/model/orderModel";

export default class OrderRepository implements IOrderRepository {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.getId(),
        customerId: entity.getCustomerId(),
        orderItems: entity.getItems().map((item) => {
          return OrderItemsModel.build({
            id: item.getId(),
            order_id: entity.getId(),
            product_id: item.getProductId(),
            quantity: item.getQuantity(),
            price: item.getPrice(),
            total: item.priceTotal(),
            name: item.getName(),
          });
        }),
        total: entity.total(),
      },
      { include: [{ model: OrderItemsModel }] }
    );
  }
  async update(entity: Order): Promise<void> {
    // Primeiro, atualize o OrderModel
    await OrderModel.update(
      {
        customerId: entity.getCustomerId(),
        total: entity.total(),
      },
      {
        where: {
          id: entity.getId(),
        },
      }
    );

    // Em seguida, atualize cada OrderItemsModel associado
    for (const item of entity.getItems()) {

      const [order, created] = await OrderItemsModel.findOrCreate({
        where: { id: item.getId() },
        defaults: {
          id: item.getId(),
          order_id: entity.getId(),
          product_id: item.getProductId(),
          quantity: item.getQuantity(),
          price: item.getPrice(),
          total: item.priceTotal(),
          name: item.getName(),
        }
      });
      
      if (!created) {
        // se o registro já existia, atualize-o
        await OrderItemsModel.update(
          {
            order_id: entity.getId(),
            product_id: item.getProductId(),
            quantity: item.getQuantity(),
            price: item.getPrice(),
            total: item.priceTotal(),
            name: item.getName(),
          },
          {
            where: {
              id: item.getId(),
            },
          }
        );
      }

    
    }
  }
  async findById(id: string): Promise<Order> {
    return new Promise((resolve, reject) => {
      OrderModel.findByPk(id, { include: [{ model: OrderItemsModel }] }).then(
        (order) => {
          if (order) {
            resolve(
              new Order(
                order.id,
                order.customerId,
                order.orderItems.map((item) => {
                  return new OrderItem(
                    item.id,
                    item.name,
                    item.price,
                    item.quantity,
                    item.product_id
                  );
                })
              )
            );
          }
          reject(new Error("Order not found"));
        }
      );
    });
  }
  findAll(currentPage: number, maxItemPerPage: number): Promise<Order[]> {
    return OrderModel.findAll({
      offset: currentPage,
      limit: maxItemPerPage,
      include: [{ model: OrderItemsModel }],
    }).then((orders) => {
      return orders.map((order) => {
        if (order === null) {
          throw new Error("Orders not found");
        }
        return new Order(
          order.id,
          order.customerId,
          order.orderItems.map((item) => {
            return new OrderItem(
              item.id,
              item.name,
              item.price,
              item.quantity,
              item.product_id
            );
          })
        );
      });
    });
  }
  findByParameter(itens: any[]): Promise<Order[]> {
    return OrderModel.findAll({
      where: itens,
      include: [{ model: OrderItemsModel }],
    }).then((orders) => {
      return orders.map((order) => {
        return new Order(
          order.id,
          order.customerId,
          order.orderItems.map((item) => {
            return new OrderItem(
              item.id,
              item.name,
              item.price,
              item.quantity,
              item.product_id
            );
          })
        );
      });
    });
  }
  count(): Promise<number> {
    return OrderModel.count().then((count) => {
      return count;
    });
  }
}
