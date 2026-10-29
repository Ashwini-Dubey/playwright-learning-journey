class DashboardPage {
  constructor(page) {
    // Store the Playwright page instance for use throughout this Page Object.
    this.page = page;

    // Locate the "Browse Events →" element using its visible text.
    this.browseEventsButton = page.getByRole("button", {
      name: "Browse Events →",
    });
  }

  // Click the "Browse Events" element to navigate to the events listing page.
  async browseEvents() {
    await this.browseEventsButton.click();
  }
}

// Export the DashboardPage class so it can be imported into test files.
export { DashboardPage };
