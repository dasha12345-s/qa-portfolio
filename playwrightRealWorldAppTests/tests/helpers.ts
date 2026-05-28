import { Page } from "@playwright/test";

export async function getBalance(page:Page): Promise<number> {
     const response = await page.request.get(
        "http://localhost:3001/checkAuth",
      );
      const { user } = await response.json();
      const userRes = await page.request.get(
        `http://localhost:3001/users/${user.id}`,
      );
      const body = await userRes.json();
      return body.user.balance;
}