class CreateEventsPage {
  constructor(page) {
    this.page = page;
    this.eventNameField = page.locator("#event-title-input");
    this.eventDescriptionField = page.locator("#admin-event-form textarea");
    this.categorySelector = page.locator("#category");
    this.cityField = page.getByLabel("City");
    this.venueField = page.getByLabel("Venue");
    this.eventDateTimeField = page.getByRole("textbox", {
      name: "Event Date & Time*",
    });
    this.priceField = page.getByLabel("Price ($)");
    this.totalSeatsField = page.getByLabel("Total Seats");
    this.addEventButton = page.locator("#add-event-btn");
    this.eventCreationSuccessMessage = page.getByText("Event created!");
  }

  async validEventCreation(
    eventName,
    category,
    city,
    venue,
    dateTime,
    price,
    totalSeats,
  ) {
    await this.eventNameField.fill(eventName);
    await this.eventDescriptionField.fill(eventName);
    await this.categorySelector.selectOption(category);
    await this.cityField.fill(city);
    await this.venueField.fill(venue);
    await this.eventDateTimeField.fill(dateTime);
    await this.priceField.fill(price);
    await this.totalSeatsField.fill(totalSeats);
    await this.addEventButton.click();
  }
}

export { CreateEventsPage };
