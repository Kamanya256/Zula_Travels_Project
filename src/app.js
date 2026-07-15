const express = require('express');
const app = express();

// =======================
// MIDDLEWARE
// =======================
app.use(express.json());

// =======================
// ROUTES IMPORT
// =======================
const hotelRoutes = require('./modules/hotels/hotel.routes');
const hotelRoomRoutes = require('./modules/hotel-room/hotel-room.routes');
const vendorRoutes = require('./modules/vendors/vendor.routes');
const bookingRoutes = require('./modules/bookings/booking.routes');
const usersRoutes = require('./modules/users/users.routes');
const carRoutes = require('./modules/cars/car.routes');
const tourRoutes = require('./modules/tours/tour.routes');
const flightRoutes = require('./modules/flights/flight.routes');
const destinationRoutes = require('./modules/destinations/destination.routes');
const bookingItemRoutes = require('./modules/booking-items/booking-item.routes');
const restaurantRoutes = require('./modules/restaurants/restaurant.routes');
const eventRoutes = require('./modules/events/event.routes');
const transferRoutes = require('./modules/transfers/transfer.routes');
const cartRoutes = require('./modules/cart/cart.routes');
const vendorHotelRoutes = require('./modules/vendors/vendor-hotel.routes');
const vendorCarRoutes = require('./modules/vendor-cars/vendor-car.routes');
const vendorTourRoutes = require('./modules/vendor-tours/vendor-tour.routes');
const vendorRestaurantRoutes = require('./modules/vendor-restaurants/vendor-restaurant.routes');
const vendorVenueRoutes = require('./modules/vendor-venues/vendor-venues.routes');
const vendorBookingRoutes = require('./modules/vendor-bookings/vendor-booking.routes');
const vendorReportRoutes = require('./modules/vendor-reports/vendor-report.routes');
const vendorRoomRoutes = require('./modules/vendor-rooms/vendor-room.routes');
const customerBookingRoutes = require('./modules/customer-bookings/customer-booking.routes');


// =======================
// ROUTES REGISTER
// =======================
app.use('/api/users', usersRoutes);
app.use('/api/hotcdels', hotelRoutes);
app.use('/api/hotel-rooms', hotelRoomRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/booking-items', bookingItemRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/transfers', transferRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/vendor-hotels', vendorHotelRoutes);
app.use('/api/vendor-cars', vendorCarRoutes);
app.use('/api/vendor-tours', vendorTourRoutes);
app.use('/api/vendor-restaurants', vendorRestaurantRoutes);
app.use('/api/vendor-venues', vendorVenueRoutes);
app.use('/api/vendor-bookings', vendorBookingRoutes);
app.use('/api/vendor-reports', vendorReportRoutes);
app.use('/api/vendor-rooms', vendorRoomRoutes);
app.use('/api/customer-bookings', customerBookingRoutes);
app.use('/api/payments', require('./modules/payments/payment.routes'));
app.use('/api/financial-documents', require('./modules/financial-documents/financial-document.routes'));
app.use('/api/vendor-finance', require('./modules/vendor-finance/vendor-finance.routes'));
app.use('/api/vendor-payouts', require('./modules/vendor-payouts/vendor-payout.routes'));
app.use('/api/admin/payouts', require('./modules/admin-payouts/admin-payout.routes'));
app.use('/api/admin', require('./modules/admin/admin.routes'));
app.use('/api/admin/payouts', require('./modules/admin/admin-payout.routes'));


// =======================
// HEALTH CHECK
// =======================
app.get('/', (req, res) => {
  res.json({
    message: 'Zula Travels API is running'
  });
});

// =======================
// 404
// =======================
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found'
  });
});

module.exports = app;