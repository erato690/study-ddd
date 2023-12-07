import IEvent from "../../../../domain/event/@shared/iEvent";
import IEventHandler from "../../../../domain/event/@shared/iEventHandler";
import ProductCreatedEvent from "../../../../domain/event/product/productCreatedEvent";

export default class SendEmailWhenProductIsCreatedHandler implements IEventHandler {


    handle(event: ProductCreatedEvent): void {
       console.log("Sending email...");
    }

}
