import { test, expect } from "@playwright/test";
import { DataTestIds } from "../../common/const/data-testid.js";

test("Google sign in", async ({ page }) => {
  await page.goto("http://localhost:5173/sign-in");

  const googleButton = page.getByTestId(DataTestIds.GoogleAuthButton);

  await expect(googleButton).toBeVisible();
});
