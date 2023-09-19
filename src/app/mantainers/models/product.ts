export class Product {
    constructor(product: any) {
        this.idProduct = product.idProduct;
        this.name = product.name;
        this.description = product.description;
        this.enterpriseId = product.enterpriseId;
    }

    public idProduct: number;
    public name: string;
    public description: string;
    public enterpriseId: string;
}
