// Note: The RWA does not enforce authentication or cross-user access control on most API endpoints.
// Unauthenticated requests and cross-user access attempts are not consistently rejected with 401/403.
// This is a known limitation of the demo app — in a production application these endpoints
// would require authentication and return 403 Forbidden for unauthorized cross-user access.
// Security testing here focuses on input validation behavior.

import { APIRequestContext } from "@playwright/test";
import { expect, test } from "../../fixtures";
import { getUserId } from "../helpers";

test.describe("Security API tests", () => {
  let apiContext: APIRequestContext;
  let apiContext2: APIRequestContext;
  let unauthorizedApiContext: APIRequestContext;
  let user2Id: string;
  let user1Id: string;

  test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
      baseURL: "http://localhost:3001",
      storageState: ".auth/user1.json",
    });
    apiContext2 = await playwright.request.newContext({
      baseURL: "http://localhost:3001",
      storageState: ".auth/user2.json",
    });
    unauthorizedApiContext = await playwright.request.newContext({
      baseURL: "http://localhost:3001",
    });
    user2Id = await getUserId(apiContext2);
    user1Id = await getUserId(apiContext);
  });

  test.afterAll(async () => {
    await apiContext.dispose();
    await unauthorizedApiContext.dispose();
    await apiContext2.dispose();
  });

  test.describe("Cross-user access", () => {
    test("should return 401 for unauthenticated request to GET /users/:id",  { tag: "@smoke" }, async () => {
      const response = await unauthorizedApiContext.get(
        `http://localhost:3001/users/${user2Id}`,
      );
      expect(response.status()).toBe(401);
    });

    test.describe("Invalid data handling", () => {
      test("should return 422 for negative amount in POST /transactions", { tag: "@regression" }, async () => {
        const response = await apiContext.post("/transactions", {
          data: {
            transactionType: "payment",
            senderId: user1Id,
            recipientId: user2Id,
            amount: -100,
            description: "Invalid negative amount test",
          },
        });
        expect(response.status()).toBe(422);
      });
      test("should return 422 for non-numeric amount in POST /transactions", { tag: "@regression" }, async () => {
        const response = await apiContext.post("/transactions", {
          data: {
            transactionType: "payment",
            senderId: user1Id,
            recipientId: user2Id,
            amount: "invalid_amount",
            description: "Invalid non-numeric amount test",
          },
        });
        expect(response.status()).toBe(422);
      });
      test("should return 422 for zero amount in POST /transactions", { tag: "@regression" }, async () => {
        const response = await apiContext.post("/transactions", {
          data: {
            transactionType: "payment",
            senderId: user1Id,
            recipientId: user2Id,
            amount: 0,
            description: "Invalid zero amount test",
          },
        });
        expect(response.status()).toBe(422);
      });
      test("should return 422 when description is missing", { tag: "@regression" }, async () => {
        const response = await apiContext.post("/transactions", {
          data: {
            transactionType: "payment",
            senderId: user1Id,
            recipientId: user2Id,
            amount: 100,
          },
        });
        expect(response.status()).toBe(422);
      });
      test("should return 422 for bank account with short routing number", { tag: "@regression" }, async () => {
        test.fail(
          true,
          "Known bug: RWA does not validate routing number length, returns 200 instead of 422",
        );
        const response = await apiContext.post("/bankaccounts", {
          data: {
            bankName: "Test Bank",
            routingNumber: "12345",
            accountNumber: "123456789",
          },
        });
        expect(response.status()).toBe(422);
      });
    });
  });
});
