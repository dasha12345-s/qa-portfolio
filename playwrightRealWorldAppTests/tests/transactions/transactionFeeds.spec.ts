import {test,expect} from "../../fixtures";
import { HomePage } from "../pages/HomePage";

test.describe("Transaction Feeds", () => {

    let homePage: HomePage;

    test.beforeEach( async ({loggedInPage}) => {
        homePage = new HomePage(loggedInPage);
    });

    test("should display public transactions feed by default", async () => {});
    
    test("should navigate to contacts transactions feed when clicking on contacts tab", async () => {});
    
    test("should navigate to personal transactions feed when clicking on personal tab", async () => {});

    test("should open new transaction form when clicking on new transaction button", async () => {});
    
    test("should open notifications panel when clicking on notification button", async () => {});

    test("should open navigation menu when clicking on nav toggle", async () => {});

    test("should filter transactions by date range when using date filter", async () => {});

    test("should filter transactions by amount range when using amount filter", async () => {});        
});