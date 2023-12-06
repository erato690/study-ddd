import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({
  tableName: "customers",
  timestamps: false,
})
export default class CustomerModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column({
    allowNull: false,
  })
  declare name: string;

  @Column({
    allowNull: false,
    type: DataType.BOOLEAN,
  })
  declare active: boolean;

  @Column({
    allowNull: false,
    type: DataType.NUMBER,
  })
  declare rewardPoints: number;

  @Column({
    allowNull: false,
  })
  declare street: string;
  @Column({
    allowNull: false,
  })
  declare city: string;

  @Column({
    allowNull: false,
  })
  declare state: string;
  
  @Column({
    allowNull: false,
  })
  declare zipCode: string;

  @Column({
    allowNull: true,
  })
  declare addressNumber: number;
}
