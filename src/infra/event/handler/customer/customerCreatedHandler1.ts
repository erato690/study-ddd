import IEventHandler from "../../../../domain/event/@shared/iEventHandler";
import CustomerCreatedEvent from "../../../../domain/event/customer/customerCreatedEvent";

export default class CustomerCreatedHandler1 implements IEventHandler {


    handle(event: CustomerCreatedEvent): void {
       console.log("Esse é o primeiro console.log do evento: CustomerCreated");
    }

}