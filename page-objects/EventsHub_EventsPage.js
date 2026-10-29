class EventsPage {
  constructor(page, eventName) {
    // Store the Playwright page instance for use throughout this Page Object.
    this.page = page;

    // Locate the "Add New Event" button using its accessible role and name.
    this.addNewEventButton = page.getByRole("button", {
      name: "Add New Event",
    });

    // Locate the event by its name so it can be verified or interacted with later.
    this.searchEventText = page.getByText(eventName);
  }

  // Click the button to navigate to the event creation form.
  async addNewEvent() {
    await this.addNewEventButton.click();
  }
}

// Export the EventsPage class so it can be imported into test files.
export { EventsPage };
