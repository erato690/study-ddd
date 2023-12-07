
import EventDispatcher from '../../src/infra/event/eventDispatcher';
import { EventName } from '../../src/domain/event/@shared/iEvent';
import SendEmailWhenProductIsCreatedHandler from '../../src/infra/event/handler/product/sendEmailWhenProductIsCreatedHandler';
import ProductCreatedEvent from '../../src/domain/event/product/productCreatedEvent';


describe("Domain events unit test", () => {


    it("should register an event handler", () => {
     
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();


        eventDispatcher.register(EventName.PRODUCT_CREATED, eventHandler);

        expect(eventDispatcher.getEventHandle(EventName.PRODUCT_CREATED)[0]).toMatchObject(eventHandler);

        expect(eventDispatcher.getEventHandle(EventName.PRODUCT_CREATED)).toBeDefined();

        expect(eventDispatcher.getEventHandle(EventName.PRODUCT_CREATED).length).toBe(1);
    });

    it("should unregister an event handler", () => {
     
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();



        eventDispatcher.register(EventName.PRODUCT_CREATED, eventHandler);

        expect(eventDispatcher.getEventHandle(EventName.PRODUCT_CREATED)[0]).toMatchObject(eventHandler);


        eventDispatcher.unregister(EventName.PRODUCT_CREATED, eventHandler);


        expect(eventDispatcher.getEventHandle(EventName.PRODUCT_CREATED).length).toBe(0);


    });

    it("should notify an event handler", () => {
     
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyHandler  = jest.spyOn(eventHandler, 'handle');

        eventDispatcher.register(EventName.PRODUCT_CREATED, eventHandler);

        expect(eventDispatcher.getEventHandle(EventName.PRODUCT_CREATED)[0]).toMatchObject(eventHandler);


        eventDispatcher.notify( new ProductCreatedEvent({
            name: "test",
            description: "test",
            price: 1
        }) );


        expect(spyHandler).toHaveBeenCalledTimes(1);


    });


    // it("should notify  dont have handler them throw Erro", () => {
     
    //     const eventDispatcher = new EventDispatcher();
    //     const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    //     const spyHandler  = jest.spyOn(eventHandler, 'handle');


    //     eventDispatcher.notify( new ProductCreatedEvent({
    //         name: "test",
    //         description: "test",
    //         price: 1
    //     }) );


    //     expect(spyHandler).toHaveBeenCalledTimes(1);


    // });
});