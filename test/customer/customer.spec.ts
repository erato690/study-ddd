
import Address from '../../src/domain/entity/customer/address';
import Customer from '../../src/domain/entity/customer/customer';

describe("Customer unit test", () => {


    it("should create a customer", () => {
        const  customer = new Customer("1", "John Doe");
        expect(customer.getName()).toBe("John Doe");
        expect(customer.getId()).toBe("1");
    });

    it("should thow error when name is empty", () => {
     
        expect(()=>{
            const  customer = new Customer("1", "");
        }).toThrow("Name is required")
        
    });

    it("should thow error when id is empty", () => {
     
        expect(()=>{
            const  customer = new Customer("", "sddd");
        }).toThrow("Id is required")
        
    });

    it("should activate customer", () => {
        const customer = new Customer("1", "John Doe");
        customer.setAddress( new Address("1", "Main Street", "New York", "NY", 10000));
        expect(() => customer.activate()).not.toThrow();
        expect(customer.isActive()).toBe(true);
    });

    it("should throw error when trying to activate customer without address", () => {
        const customer = new Customer("1", "John Doe");
        expect(() => customer.activate()).toThrow("Address is required to activate customer");
    });
    


});