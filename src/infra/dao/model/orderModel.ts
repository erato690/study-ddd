import { Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import CustomerModel from "./customerModel";
import OrderItemsModel from "./orderItensModel";

@Table({
    tableName: "orders",
    timestamps: false,
    })
export default class OrderModel extends Model {

    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => CustomerModel)
    @Column({allowNull: false})
    declare customerId: string;

    @Column({allowNull: false})
    declare total: number;

    @HasMany(() => OrderItemsModel)
    declare orderItems: OrderItemsModel[];

}