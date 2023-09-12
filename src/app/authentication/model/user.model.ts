export class User {
    constructor(user: any) {
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.address = user.address;
        this.city = user.city;
        this.state = user.state;
        this.postalCode = user.postalCode;
    }

    private username: string;
    private email: string;
    private password: string;
    private firstName: string;
    private lastName: string;
    private address: string;
    private city: string;
    private state: string;
    private postalCode: number;
}