import Address from "../../../domain/entity/customer/address";
import Customer from "../../../domain/entity/customer/customer";
import ICustomerRepository from "../../../domain/repository/customer/iCustomerRepository";
import CustomerModel from "../../dao/model/customerModel";

export default class CustomerRepository implements ICustomerRepository {
  findByName(name: string): Promise<Customer[]> {
   return CustomerModel.findAll({ where: { name: name } }).then((customers) => {
        return customers.map((customer) => {
            let address = new Address(
            customer.street,
            customer.city,
            customer.state,
            customer.zipCode,
            customer.addressNumber
            );
            let customerEntity = new Customer(
            customer.id,
            customer.name,
            address,
            customer.active,
            customer.rewardPoints
            );
    
            return customerEntity;
        });
        });
  }
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.getId(),
      name: entity.getName(),
      active: entity.isActive(),
      rewardPoints: entity.getRewardPoint(),
      city: entity.getAddress().getCity(),
      state: entity.getAddress().getState(),
      street: entity.getAddress().getStreet(),
      addressNumber: entity.getAddress().getNumber(),
      zipCode: entity.getAddress().getZipCode(),
    });
  }
  async update(entity: Customer): Promise<void> {
   await  CustomerModel.update({
        name: entity.getName(),
        active: entity.isActive(),
        rewardPoints: entity.getRewardPoint(),
        city: entity.getAddress().getCity(),
        state: entity.getAddress().getState(),
        street: entity.getAddress().getStreet(),
        addressNumber: entity.getAddress().getNumber(),
        zipCode: entity.getAddress().getZipCode(),
        },
        {
        where: {
            id: entity.getId(),
        },
        });
        
    }

  findById(id: string): Promise<Customer> {

    return CustomerModel.findByPk(id)
      .then((customer) => {
        if (customer) {
          let address = new Address(
            customer.street,
            customer.city,
            customer.state,
            customer.zipCode,
            customer.addressNumber
          );
          let customerEntity = new Customer(
            customer.id,
            customer.name,
            address,
            customer.active,
            customer.rewardPoints
          );

          return customerEntity;
        }
        throw new Error("Customer not found");
      })
      .catch((error) => {
        throw error;
      });
  }
  findAll(currentPage: number, maxItemPerPage: number): Promise<Customer[]> {
    return CustomerModel.findAll({offset: currentPage, limit: maxItemPerPage}).then((customers) => {
        if(customers){
            customers.map((customer) => {
                let address = new Address(
                    customer.street,
                    customer.city,
                    customer.state,
                    customer.zipCode,
                    customer.addressNumber
                  );
                  let customerEntity = new Customer(
                    customer.id,
                    customer.name,
                    address,
                    customer.active,
                    customer.rewardPoints
                  );

                  return customerEntity;
            });
        }
        throw new Error("Customer not found");
    });
  }
  findByParameter(itens: any[]): Promise<Customer[]> {
    return CustomerModel.findAll({ where: itens }).then((customers) => {
      return customers.map((customer) => {
        let address = new Address(
          customer.street,
          customer.city,
          customer.state,
          customer.zipCode,
          customer.addressNumber
        );
        let customerEntity = new Customer(
          customer.id,
          customer.name,
          address,
          customer.active,
          customer.rewardPoints
        );

        return customerEntity;
      });
    });
  }
  count(): Promise<number> {
   return CustomerModel.count().then((count) => {
      return count;
    });
  }
}
