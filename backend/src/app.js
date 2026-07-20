const express = require("express");
const cors = require("cors");

const app = express();

// =======================
// MIDDLEWARE
// =======================
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

// =======================
// ROUTES IMPORT
// =======================

const hotelRoutes = require("./modules/hotels/hotel.routes");
const hotelRoomRoutes = require("./modules/hotel-room/hotel-room.routes");
const vendorRoutes = require("./modules/vendors/vendor.routes");
const bookingRoutes = require("./modules/bookings/booking.routes");
const usersRoutes = require("./modules/users/users.routes");
const carRoutes = require("./modules/cars/car.routes");
const tourRoutes = require("./modules/tours/tour.routes");
const flightRoutes = require("./modules/flights/flight.routes");
const destinationRoutes = require("./modules/destinations/destination.routes");
const bookingItemRoutes = require("./modules/booking-items/booking-item.routes");
const restaurantRoutes = require("./modules/restaurants/restaurant.routes");
const eventRoutes = require("./modules/events/event.routes");
const transferRoutes = require("./modules/transfers/transfer.routes");
const cartRoutes = require("./modules/cart/cart.routes");
const vendorHotelRoutes = require("./modules/vendors/vendor-hotel.routes");
const vendorCarRoutes = require("./modules/vendor-cars/vendor-car.routes");
const vendorTourRoutes = require("./modules/vendor-tours/vendor-tour.routes");
const vendorRestaurantRoutes = require("./modules/vendor-restaurants/vendor-restaurant.routes");
const vendorVenueRoutes = require("./modules/vendor-venues/vendor-venues.routes");
const vendorBookingRoutes = require("./modules/vendor-bookings/vendor-booking.routes");
const vendorReportRoutes = require("./modules/vendor-reports/vendor-report.routes");
const vendorRoomRoutes = require("./modules/vendor-rooms/vendor-room.routes");
const customerBookingRoutes = require("./modules/customer-bookings/customer-booking.routes");
const adminRoutes = require("./modules/admin/admin.routes");
const payoutRoutes = require("./modules/admin-payouts/admin-payout.routes");
const paymentRoutes = require("./modules/payments/payment.routes");
const financialRoutes = require("./modules/financial-documents/financial-document.routes");
const vendorFinanceRoutes = require("./modules/vendor-finance/vendor-finance.routes");
const vendorPayoutRoutes = require("./modules/vendor-payouts/vendor-payout.routes");
const analyticsRoutes = require("./modules/analytics/analytics.routes");
const authRoutes = require("./modules/auth/auth.routes");
const dashboardRoutes = require("./modules/dashboard/dashboard.routes");
const vendorWalletRoutes = require("./modules/vendor-wallet/vendor-wallet.routes");
const websiteRoutes = require("./modules/website/website.routes");
const templateRoutes = require("./modules/website/template.routes");
const generatorRoutes = require("./modules/website/generator.routes");
const pageRoutes = require("./modules/website/page.routes");
const sectionRoutes = require("./modules/website/section.routes");
const publicWebsiteRoutes = require("./modules/public-website/public-website.routes");
const previewRoutes = require("./modules/website-preview/website-preview.routes");
const vendorWebsiteRoutes = require("./modules/vendor-website/vendor-website.routes");
console.log("✓ Auth routes loaded");



// =======================
// ROUTES REGISTER
// =======================
app.use("/api/users", usersRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/hotel-rooms", hotelRoomRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/booking-items", bookingItemRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/flights", flightRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/transfers", transferRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/vendor-hotels", vendorHotelRoutes);
app.use("/api/vendor-cars", vendorCarRoutes);
app.use("/api/vendor-tours", vendorTourRoutes);
app.use("/api/vendor-restaurants", vendorRestaurantRoutes);
app.use("/api/vendor-venues", vendorVenueRoutes);
app.use("/api/vendor-bookings", vendorBookingRoutes);
app.use("/api/vendor-reports", vendorReportRoutes);
app.use("/api/vendor-rooms", vendorRoomRoutes);
app.use("/api/customer-bookings", customerBookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/financial-documents", financialRoutes);
app.use("/api/vendor-finance", vendorFinanceRoutes);
app.use("/api/vendor-payouts", vendorPayoutRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/payouts", payoutRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/vendor-wallet", vendorWalletRoutes);
app.use("/api/websites", websiteRoutes);
app.use("/api/website-templates", templateRoutes);
app.use("/api/websites", generatorRoutes);
app.use("/api/websites", pageRoutes);
app.use("/api/websites", sectionRoutes);
app.use("/api/public", publicWebsiteRoutes);
app.use("/api/preview", previewRoutes);
app.use("/api/vendor/website", vendorWebsiteRoutes);
console.log("✓ /api/website-templates registered");


// =======================
// HEALTH CHECK
// =======================
app.get("/", (req, res) => {
  res.json({
    message: "Zula Travels API is running",
  });
});

// =======================
// 404 HANDLER
// =======================
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

module.exports = app;