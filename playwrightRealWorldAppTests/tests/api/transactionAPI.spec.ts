import { APIRequestContext } from "@playwright/test";
import { expect, test } from "../../fixtures";
import { getUserId } from "../helpers";

test.describe("Transaction API tests", () => {
  let apiContext: APIRequestContext;
  let apiContext2: APIRequestContext;
  let user1Id: string;
  let user2Id: string;

  test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
      baseURL: "http://localhost:3001",
      storageState: ".auth/user1.json",
    });
    user1Id = await getUserId(apiContext);

    apiContext2 = await playwright.request.newContext({
      baseURL: "http://localhost:3001",
      storageState: ".auth/user2.json",
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

  test.describe("API transaction flow - send payment", () => {
    test("POST /transactions - should create a payment and return status complete", async () => {
      const response = await apiContext.post("/transactions", {
        data: {
          transactionType: "payment",
          senderId: user1Id,
          receiverId: user2Id,
          amount: 10,
          description: "Test payment",
        },
      });
      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.transaction.status).toBe("complete");
      expect(body.transaction.amount).toBe(1000);
      expect(body.transaction.senderId).toBe(user1Id);
      expect(body.transaction.receiverId).toBe(user2Id);
      expect(body.transaction.description).toBe("Test payment");
    });
    test("GET /transactions/:id - should return the transaction details", async () => {
      const response = await apiContext.post("/transactions", {
        data: {
          transactionType: "payment",
          senderId: user1Id,
          receiverId: user2Id,
          amount: 10,
          description: "Test payment",
        },
      });
      const body = await response.json();
      const transactionId = body.transaction.id;

      const getResponse = await apiContext.get(
        `/transactions/${transactionId}`,
      );
      const getBody = await getResponse.json();
      expect(getResponse.status()).toBe(200);
      expect(getBody.transaction.id).toBe(transactionId);
    });
  });

  test.describe("API transaction flow - request payment", () => {
    test("POST /transactions - should request a payment and return status pending", async () => {
      const response = await apiContext.post("/transactions", {
        data: {
          transactionType: "request",
          senderId: user1Id,
          receiverId: user2Id,
          amount: 10,
          description: "Test payment request",
        },
      });
      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.transaction.status).toBe("pending");
      expect(body.transaction.amount).toBe(1000);
      expect(body.transaction.senderId).toBe(user1Id);
      expect(body.transaction.receiverId).toBe(user2Id);
      expect(body.transaction.description).toBe("Test payment request");
    });
    test("PATCH /transactions/:id/accept - should accept the payment request and return status complete", async () => {
      const requestResponse = await apiContext.post("/transactions", {
        data: {
          transactionType: "request",
          senderId: user1Id,
          receiverId: user2Id,
          amount: 10,
          description: "Test payment request",
        },
      });
      const body = await requestResponse.json();
      const transactionId = body.transaction.id;

      const acceptResponse = await apiContext2.patch(
        `/transactions/${transactionId}`,
        {
          data: {
            requestStatus: "accepted",
          },
        },
      );
      expect(acceptResponse.status()).toBe(204);

      const getResponse = await apiContext.get(
        `/transactions/${transactionId}`,
      );
      const getBody = await getResponse.json();
      expect(getResponse.status()).toBe(200);
      expect(getBody.transaction.id).toBe(transactionId);
      expect(getBody.transaction.status).toBe("complete");
    });
    test("PATCH /transactions/:id/reject - should reject the payment request and return status rejected", async () => {
        test.fail(true, "Known bug: rejecting a request returns status 'complete' instead of 'rejected'");

        const requestResponse = await apiContext.post("/transactions", {
        data: {
          transactionType: "request",
          senderId: user1Id,
          receiverId: user2Id,
          amount: 10,
          description: "Test payment request",
        },
      });
      const body = await requestResponse.json();
      const transactionId = body.transaction.id;

      const rejectResponse = await apiContext2.patch(
        `/transactions/${transactionId}`,
        {
          data: {
            requestStatus: "rejected",
          },
        },
      );
      expect(rejectResponse.status()).toBe(204);

      const getResponse = await apiContext.get(
        `/transactions/${transactionId}`,
      );
      const getBody = await getResponse.json();
      expect(getResponse.status()).toBe(200);
      expect(getBody.transaction.id).toBe(transactionId);
      expect(getBody.transaction.status).toBe("rejected");
    });
  });

    test.describe("API transaction flow - Balance verification", () => {
    test("should verify balances are updated correctly after a payment", async () => {    });
    test("should verify balances are updated correctly after accepting a request", async () => {});
    });
});
