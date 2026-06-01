import {APIRequestContext} from "@playwright/test";
import {expect, test} from "../../fixtures";
import {getUserId} from "../helpers";

test.describe('Transaction API tests', () => {
    let apiContext: APIRequestContext;
    let apiContext2: APIRequestContext;
    let user1Id: string;
    let user2Id: string;

    test.beforeAll(async ({playwright}) => {
        apiContext = await playwright.request.newContext({
            baseURL: "http://localhost:3001",
            storageState: '.auth/user1.json'
        });
        user1Id = await getUserId(apiContext);
        
        apiContext2 = await playwright.request.newContext({
            baseURL: "http://localhost:3001",
            storageState: '.auth/user2.json'
        });
        user2Id = await getUserId(apiContext2);
});

    test.beforeEach(async () => {
        await apiContext.post("/testData/seed");
    });

    test.afterAll(async () => {
        await apiContext.dispose();
        await apiContext2.dispose();
     });

     test.describe('Transaction flow - send payment', () => {});
     
     test.describe('Transaction flow - request payment', () => {});
});