import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rides: [],
  requests: []
};

const rideSlice = createSlice({
  name: "rides",
  initialState,
  reducers: {
    addRide: (state, action) => {
      state.rides.push(action.payload);
    },

    deleteRide: (state, action) => {
      state.rides = state.rides.filter((ride) => ride.id !== action.payload);
    },
    bookRide: (state, action) => {
      const { rideId, userId } = action.payload;
      const ride = state.rides.find((r) => r.id === rideId);
      if (ride && ride.seats > 0) {
        ride.seats -= 1;
        ride.bookedBy = ride.bookedBy || [];
        ride.bookedBy.push(userId);
      }
    },
    requestRide: (state, action) => {
      state.requests.push(action.payload);
    }
  }
});

export const { addRide, bookRide, deleteRide, requestRide } = rideSlice.actions;
export default rideSlice.reducer;
