import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({
  tableName: "products",
  timestamps: false,
})
export default class ProductModel extends Model {
  
  @PrimaryKey
  @Column
  declare id: string;

  @Column({
    allowNull: false,
    type: DataType.NUMBER,
  })
   declare price: number;

  @Column({
    allowNull: false,
  })
   declare name: string;
}
