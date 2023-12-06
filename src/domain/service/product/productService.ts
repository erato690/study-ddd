import Product from "../../entity/product/product";

export default class ProductService{

    increasePrice(products: Product[] ,percentage:number):Product[]{
        return products.map(product => {
            product.changePrice((product.getPrice() * percentage)/100 + product.getPrice());
            return product;
        });
    }

}