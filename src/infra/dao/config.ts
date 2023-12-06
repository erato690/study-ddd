import { Sequelize } from "sequelize-typescript";
import path from 'path'


export default class SequelizeConfig {
  public  sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      sync: { force: true },
      logging: false,
    });
    this.sequelize.addModels([path.join(__dirname, './model/*.ts')]);
  }


  getSequelize(): Sequelize {
    return this.sequelize;
  }
  
}
