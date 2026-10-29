class EventsPage {
  constructor(page, eventName) {
    this.page = page;
    this.addNewEventButton = page.getByRole("button", {
      name: "Add New Event",
    });
    this.searchEventText = page.getByText(eventName);
  }

  async addNewEvent() {
    await this.addNewEventButton.click();
  }
}

export { EventsPage };
