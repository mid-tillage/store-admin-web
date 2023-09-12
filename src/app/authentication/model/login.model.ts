export class Login {
    constructor(login: any) {
        this.username = login.username;
        this.password = login.password;
    }

    private username: string;
    private password: string;
}