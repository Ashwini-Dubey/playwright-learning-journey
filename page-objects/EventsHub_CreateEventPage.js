class CreateEventsPage {
  constructor(page) {
    // Store the Playwright page instance for use throughout this Page Object.
    this.page = page;

    // Locate the event title input field using its unique ID.
    this.eventNameField = page.locator("#event-title-input");

    // Locate the event description textarea within the admin event form.
    this.eventDescriptionField = page.locator("#admin-event-form textarea");

    // Locate the category dropdown used to select the event category.
    this.categorySelector = page.locator("#category");

    // Locate the city input field using its associated label.
    this.cityField = page.getByLabel("City");

    // Locate the venue input field using its associated label.
    this.venueField = page.getByLabel("Venue");

    // Locate the event date and time input using its accessible role and name.
    this.eventDateTimeField = page.getByRole("textbox", {
      name: "Event Date & Time*",
    });

    // Locate the price input field using its associated label.
    this.priceField = page.getByLabel("Price ($)");

    // Locate the total seats input field using its associated label.
    this.totalSeatsField = page.getByLabel("Total Seats");

    // Locate the button that submits the event creation form.
    this.addEventButton = page.locator("#add-event-btn");

    // Locate the success message displayed after an event is created.
    this.eventCreationSuccessMessage = page.getByText("Event created!");
  }

  // Fill in the event creation form and submit it using the supplied test data.
  async validEventCreation(
    eventName,
    category,
    city,
    venue,
    dateTime,
    price,
    totalSeats,
  ) {
    // Enter the event title.
    await this.eventNameField.fill(eventName);

    // Use the event name as the event description.
    await this.eventDescriptionField.fill(eventName);

    // Select the event category from the dropdown.
    await this.categorySelector.selectOption(category);

    // Enter the city where the event will take place.
    await this.cityField.fill(city);

    // Enter the event venue.
    await this.venueField.fill(venue);

    // Enter the event date and time.
    await this.eventDateTimeField.fill(dateTime);

    // Enter the event price.
    await this.priceField.fill(price);

    // Enter the total number of seats available.
    await this.totalSeatsField.fill(totalSeats);

    // Submit the form to create the event.
    await this.addEventButton.click();
  }
}

// Export the CreateEventsPage class so it can be imported into test files.
export { CreateEventsPage };
