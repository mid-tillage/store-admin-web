export class ProductOnSale {
    constructor(productOnSale: any) {
        this.productId = productOnSale.productId;
        this.catalogId = productOnSale.catalogId;
        this.price = productOnSale.price;
    }

    private productId: number;
    private catalogId: number;
    private price: number;
}
