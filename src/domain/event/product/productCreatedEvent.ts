import IEvent, { EventName } from "../@shared/iEvent";

export default class ProductCreatedEvent implements IEvent {
    
    eventData: any;
    dateTimeOccurred: Date;
    eventName: EventName;

    constructor(eventData: any) {
        this.eventData = eventData;
        this.dateTimeOccurred = new Date();
        this.eventName = EventName.PRODUCT_CREATED;
    }

    getEventData(): any {
        return this.eventData;
    }

    getDateTimeOccurred(): Date {
        return this.dateTimeOccurred;
    }
}
