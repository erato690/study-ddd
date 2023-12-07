import IEventHandler from "../../../../domain/event/@shared/iEventHandler";
import CustomerChangeAddressEvent from "../../../../domain/event/customer/customerChangeAddressEvent";

export default class CustomerChangeAddressHandler implements IEventHandler {

    handle(event: CustomerChangeAddressEvent): void{
        console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.nome} alterado para: ${event.eventData.endereco}`);
    }
}