import IEvent, { EventName } from "../@shared/iEvent";

export default class CustomerChangeAddressEvent implements IEvent {
    
    eventData: any;
    dateTimeOccurred: Date;
    eventName: EventName;

    constructor(eventData: any) {
        this.eventData = eventData;
        this.dateTimeOccurred = new Date();
        this.eventName = EventName.CUSTOMER_CHANGE_ADDRESS;
    }

    getEventData(): any {
        return this.eventData;
    }

    getDateTimeOccurred(): Date {
        return this.dateTimeOccurred;
    }
}