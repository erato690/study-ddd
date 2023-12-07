export default interface IEvent{

    eventData: any;
    dateTimeOccurred: Date;
    eventName: EventName;



}


export enum EventName{
    PRODUCT_CREATED = 'product.created',
    CUSTOMER_CREATED = 'customer.created',
    CUSTOMER_CHANGE_ADDRESS = 'customer.change.address'
}