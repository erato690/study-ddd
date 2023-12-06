import Customer from "../../entity/customer/customer";
import ICrud from "../iCrud";

export default interface ICustomerRepository extends ICrud<Customer> {
    findByName(name: string): Promise<Customer[]>;
}