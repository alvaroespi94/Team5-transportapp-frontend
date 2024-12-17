const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock data for testing
let riders = [
  {
    id: 1,
    fullName: 'John Doe',
    phoneNumber: '800-588-2300',
    emailAddress: 'test@example.com',
    otp: '123456',
    address: {
      street: '123 Main St',
      city: 'South Bend',
      state: 'IN',
      zipCode: '46614',
      country: 'USA',
    },
  },
];

let issuedTokens = [];
let addresses = [
  {
    addressInfo: {
      street: '123 Main St',
      city: 'South Bend',
      state: 'IN',
      zipCode: '46614',
      country: 'USA',
    },
    id: 1,
  },
];
let rideRequests = [];
let rideHistory = [];

// Login endpoint
app.post('/api/Authentication/login', (req, res) => {
  const { emailAddress, password } = req.body;
  const rider = riders.find(
    (rider) => rider.emailAddress === emailAddress && rider.password === password
  );
  if (rider) {
    res.status(200).json({ token: 'mock-token', rider });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// OTP Verification endpoint
app.post('/api/Authentication/otp_verification', (req, res) => {
  const { emailAddress } = req.body;
  const rider = riders.find((r) => r.emailAddress === emailAddress);

  if (!rider) {
    return res.status(404).json({ message: 'Rider not found' });
  }

  rider.otp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(`Generated OTP for ${emailAddress}: ${rider.otp}`);
  res.status(200).json({ message: 'OTP sent successfully' });
});

// Authenticate Rider endpoint
app.post('/api/Authentication/auth_rider', (req, res) => {
  const { emailAddress, otp } = req.body;
  const rider = riders.find((r) => r.emailAddress === emailAddress && r.otp === otp);

  if (!rider) {
    return res.status(401).json({ message: 'Invalid OTP or email' });
  }

  const token = {
    refreshToken: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    token: `token-${Math.random().toString(36).substring(7)}`,
    expires: Date.now() + 3600000,
    tokenType: 'Bearer',
  };
  issuedTokens.push(token);
  res.status(200).json(token);
});

/*
//Rider Sign-Up endpoint
app.post('/api/Authentication/rider_sign_up', (req, res) => {
  const { fullName, emailAddress } = req.body;
  const newRider = { id: riders.length + 1, fullName, emailAddress, otp: '' };
  riders.push(newRider);
  res.status(201).json(newRider);
});*/

// Rider Sign-Up endpoint
app.post('/api/Authentication/rider_sign_up', (req, res) => {
  const { fullName, phoneNumber, emailAddress, address } = req.body;

  // Validate required fields
  if (!fullName || !phoneNumber || !emailAddress || !address || 
      !address.street || !address.city || !address.state || 
      !address.zipCode || !address.country) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Create a new rider object
  const newRider = {
    id: riders.length + 1,
    fullName,
    phoneNumber,
    emailAddress,
    address: {
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
    },
    otp: '',
  };

  riders.push(newRider);

  res.status(201).json({
    message: 'Rider registered successfully',
    rider: newRider,
  });
});

app.get('/api/Authentication/get_profile_info', (req, res) => {
  const rider = riders[0]; // Assume the first rider is logged in
  if (rider) {
    res.status(200).json(rider);
  } else {
    res.status(404).json({ message: 'Profile not found' });
  }
});

// Fetch ride history
app.get('/api/Rider/riderHistory', (req, res) => {
  res.status(200).json(rideHistory);
});

// Ride request
app.post('/api/Rider/requestForRider', (req, res) => {
  const { pickUpDateTime, pickUpAddressID, additionalInformation } = req.body;
  const newRideRequest = {
    requestID: `${rideRequests.length + 1}`,
    pickUpDateTime,
    pickUpLocation: pickUpAddressID,
    additionalInformation,
    status: 'Requested',
  };
  rideRequests.push(newRideRequest);
  rideHistory.unshift(newRideRequest);
  res.status(201).json(newRideRequest);
});

// Fetch rider addresses
app.get('/api/Rider/riderAddresses', (req, res) => {
  res.status(200).json(addresses);
});

// Add address
app.post('/api/Rider/addAddress', (req, res) => {
  const { street, city, state, zipCode, country } = req.body;

  if (!street || !city || !state || !zipCode || !country) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newAddress = {
    id: addresses.length + 1,
    addressInfo: {
      street,
      city,
      state,
      zipCode,
      country,
    },
  };

  addresses.push(newAddress);
  res.status(201).json(newAddress);
});

// Remove address
app.delete('/api/Rider/removeAddress', (req, res) => {
  const { addressId } = req.body;

  addresses = addresses.filter((address) => address.id !== addressId);
  res.status(200).json({ message: 'Address removed successfully', addressId });
});

/*
app.post('/api/Rider/cancelRideRequest', (req, res) => {
  const { requestID } = req.body;
  const rideIndex = rideRequests.findIndex((ride) => ride.requestID === requestID);
  
  if (rideIndex === -1) {
    return res.status(404).json({ message: 'Ride request not found' });
  }

  rideRequests.splice(rideIndex, 1);
  rideHistory = rideHistory.filter((ride) => ride.requestID !== requestID);
  res.status(200).json({ message: 'Ride cancelled successfully' });
});*/

app.get('/api/Rider/cancelRideRequest', (req, res) => {
  const { requestID } = req.query; // Read requestID from query parameters
  const rideIndex = rideRequests.findIndex((ride) => ride.requestID === requestID);

  if (rideIndex === -1) {
    return res.status(404).json({ message: 'Ride request not found' });
  }

  rideRequests.splice(rideIndex, 1);
  rideHistory = rideHistory.filter((ride) => ride.requestID !== requestID);
  res.status(200).json({ message: 'Ride cancelled successfully' });
});

// Update rider profile
app.post('/api/Rider/updateRiderProfile', (req, res) => {
  const { fullName, phoneNumber, emailAddress, address } = req.body;

  // Validate required fields
  if (
    !fullName ||
    !phoneNumber ||
    !emailAddress ||
    !address ||
    !address.street ||
    !address.city ||
    !address.state ||
    !address.zipCode ||
    !address.country
  ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Assume the first rider is the one logged in
  const rider = riders[0];

  if (!rider) {
    return res.status(404).json({ message: 'Rider not found' });
  }

  // Update rider profile
  rider.fullName = fullName;
  rider.phoneNumber = phoneNumber;
  rider.emailAddress = emailAddress;
  rider.address = {
    street: address.street,
    city: address.city,
    state: address.state,
    zipCode: address.zipCode,
    country: address.country,
  };

  res.status(200).json({ message: 'Profile updated successfully', rider });
});


// Set up the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Mock API running on http://localhost:${PORT}`);
});
