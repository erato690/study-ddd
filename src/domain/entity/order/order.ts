import OrderItem from "./orderItem";

export default class Order{

    private id:string;
    private customerId:string;
    private items:OrderItem[];

    constructor(id:string, customerId:string, items:OrderItem[]){
        this.id = id;
        this.customerId = customerId;
        this.items = items;
        this.validate();
    }

    validate():void{
        if(this.id === undefined || this.id === null || this.id === ""){
            throw new Error("Id is required");
        }
        if(this.customerId === undefined || this.customerId === null || this.customerId === ""){
            throw new Error("CustomerId is required");
        }
        if(this.items === undefined || this.items === null || this.items.length === 0){
            throw new Error("Items is required");
        }
    }
    /* c8 ignore start */
    getId():string{
        return this.id;
    }
    
    getCustomerId():string{
        return this.customerId;
    }

    getItems():OrderItem[]{
        return this.items;
    }

    addItems(item:OrderItem ):void{
        this.items.push(item);
    }


    toString():string{
        return `Order: ${this.id} - Customer: ${this.customerId} - Items: ${this.items}`;
    }
    /* c8 ignore end */

    total():number{
        return this.items.reduce((total, item) => total + item.priceTotal(), 0);
    }

}