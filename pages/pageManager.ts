import { Page} from "@playwright/test"
import LoginPage from '../pages/loginPage';
import SecurePage from "./securePage";

export class PageManager {

    private readonly page: Page
    private readonly loginPage: LoginPage
    private readonly securePage: SecurePage
   

    constructor(page: Page) {
        this.page = page
        this.loginPage = new LoginPage(this.page)
        this.securePage = new SecurePage(this.page)
    }

   
    onLoginPage() {
        return this.loginPage
    }

    onSecurePage() {
        return this.securePage
    }

}