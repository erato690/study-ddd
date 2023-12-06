import Order from '../../src/domain/entity/order/order';
import OrderItem from '../../src/domain/entity/order/orderItem';

describe('Order unit test', () => {

    let items: OrderItem[];
    beforeEach(() => {
        items = [new OrderItem('1','Item 1',10,1,"1"),new OrderItem('2','Item 2',20,1,"2"),new OrderItem('3','Item 3',30,1,"3"),new OrderItem('4','Item 4',40,1,"4")];
    });

   
    it('should create an instance of Order', () => {
        expect(() => new Order('1', '1', items)).not.toThrow();
    });

  
    it('should throw error when id is empty', () => {
        expect(() => new Order("", '1', items)).toThrow("Id is required");
    });

    it('should throw error when customerId is empty', () => {
        expect(() => new Order("1", '', items)).toThrow("CustomerId is required");
    });


    it('should throw error when items is empty', () => {
        expect(() => new Order("1", '1',[] )).toThrow("Items is required");
    });


    it('should total is equals 100', () => {

        const order = new Order("1", '1',items );

        expect(order.total()).toBe(100)
    });


    it('should total with quatity 2 equals 100', () => {


        let newItem = new OrderItem('5','Item 5',10,2,"5")
        items.push(newItem);

        const order = new Order("1", '1',items );

        expect(order.total()).toBe(120)

        expect(items.pop()).toBe(newItem);
    });




});


