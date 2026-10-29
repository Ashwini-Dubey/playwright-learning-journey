import { test as base, expect } from "@playwright/test";

const test = base.extend({
  testDataForEventCreation: {
    password: "Password@123",
    category: "Workshop",
    city: "Chandigarh",
    venue: "Chandigarh",
    dateTime: "2027-12-01T11:00",
    price: "1250",
    totalSeats: "150",
  },
});

export { test };
