import CustomerChangeAddressHandler from "../../../infra/event/handler/customer/customerChangeAddressHandler";
import CustomerCreatedHandler1 from "../../../infra/event/handler/customer/customerCreatedHandler1";
import CustomerCreatedHandler2 from "../../../infra/event/handler/customer/customerCreatedHandler2";
import Customer from "../../entity/customer/customer";
import { EventName } from "../../event/@shared/iEvent";
import IEventDispatcher from "../../event/@shared/iEventDispatcher";
import CustomerChangeAddressEvent from "../../event/customer/customerChangeAddressEvent";
import CustomerCreatedEvent from "../../event/customer/customerCreatedEvent";
import ICustomerRepository from "../../repository/customer/iCustomerRepository";

export default class CustomerService {

    private  customerRepository: ICustomerRepository;
    private eventBus: IEventDispatcher;
    

    constructor(customerRepository:ICustomerRepository, eventBus: IEventDispatcher) {
        this.customerRepository = customerRepository;
        this.eventBus = eventBus;

        this.eventBus.register(EventName.CUSTOMER_CREATED, new CustomerCreatedHandler1());
        this.eventBus.register(EventName.CUSTOMER_CREATED, new CustomerCreatedHandler2());
        this.eventBus.register(EventName.CUSTOMER_CHANGE_ADDRESS, new CustomerChangeAddressHandler());
    }
    async createCustomer(customer:Customer) {

        customer.validate();

        this.customerRepository.create(customer);
        this.eventBus.notify(new CustomerCreatedEvent({
            name: customer.getName(),
            address: customer.getAddress()
        }));
    }
    async changeAddress(customer:Customer) {
        
        customer.validate();

        this.customerRepository.update(customer);

        this.eventBus.notify(new CustomerChangeAddressEvent({
                id: customer.getId(),
                nome: customer.getName(),
                endereco: `${customer.getAddress().getStreet()}, ${customer.getAddress().getNumber()} - ${customer.getAddress().getCity()}`
            }));
    }
}