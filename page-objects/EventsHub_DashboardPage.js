class DashboardPage {
  constructor(page) {
    this.page = page;
    this.browseEventsButton = page.getByText("Browse Events →");
  }
  async browseEvents() {
    await this.browseEventsButton.click();
  }
}
export { DashboardPage };
