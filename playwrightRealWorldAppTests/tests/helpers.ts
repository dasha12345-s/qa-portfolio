import { Page } from "@playwright/test";
import {APIRequestContext} from "@playwright/test";

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

export async function getBalanceViaAPI(ctx: APIRequestContext): Promise<number> {
    const response = await ctx.get(
       "http://localhost:3001/checkAuth",
     );
     const { user } = await response.json();
     const userRes = await ctx.get(
       `http://localhost:3001/users/${user.id}`,
     );
     const body = await userRes.json();
     return body.user.balance;
}

export async function getUserId(ctx: APIRequestContext): Promise<string> {
  const response = await ctx.get("http://localhost:3001/checkAuth");
  const { user } = await response.json();
  return user.id;
}