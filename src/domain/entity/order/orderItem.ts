export default class OrderItem{

    private id:String;
    private name:String;
    private price:number;
    private quantity:number;
    private productId:String;

    constructor(id:String, name:String, price:number, quantity:number, productId:String){
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.productId = productId;
        this.validate();
    }

    /* c8 ignore start */
    getId():String{
        return this.id;
    }

    getName():String{
        return this.name;
    }

    getPrice():number{
        return this.price;
    }

    priceTotal():number{
        return this.price * this.quantity;
    }

    getQuantity():number{
        return this.quantity;
    }

    getProductId():String{
        return this.productId;
    }
    /* c8 ignore end */

    validate():void{
        if(this.id === undefined || this.id === null || this.id === ""){
            throw new Error("Id is required");
        }
        if(this.name === undefined || this.name === null || this.name === ""){
            throw new Error("Name is required");
        }
        if(this.price === undefined || this.price === null || this.price <= -1){
            throw new Error("Price is required");
        }
        if(this.quantity === undefined || this.quantity === null || this.quantity <= -1){
            throw new Error("Quantity is required");
        }
        if(this.productId === undefined || this.productId === null || this.productId === ""){
            throw new Error("ProductId is required");
        }
    }

    toString():String{
        return `OrderItem: ${this.id} - Name: ${this.name} - Price: ${this.price} - Quantity: ${this.quantity}`;
    }

}