import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: "phase-a-preview.spec.js",
  fullyParallel: false,
  workers: 1,
  reporter: "line",
  use: {
    baseURL: "http://127.0.0.1:3100",
    channel: process.env.PLAYWRIGHT_CHANNEL || "chrome",
    screenshot: "only-on-failure",
    trace: "retain-on-failure"
  }
});
