import { Enterprise } from "./enterprise";

export class Product {
    constructor(product: any) {
        this.idProduct = product.idProduct;
        this.name = product.name;
        this.description = product.description;
        this.enterprise = product.enterprise;
    }

    public idProduct: number;
    public name: string;
    public description: string;
    public enterprise: Enterprise;
}
