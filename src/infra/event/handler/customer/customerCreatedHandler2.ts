import IEventHandler from "../../../../domain/event/@shared/iEventHandler";
import CustomerCreatedEvent from "../../../../domain/event/customer/customerCreatedEvent";

export default class CustomerCreatedHandler2 implements IEventHandler {

    handle(event: CustomerCreatedEvent): void {
       console.log("Esse é o segundo console.log do evento: CustomerCreated");
    }

}