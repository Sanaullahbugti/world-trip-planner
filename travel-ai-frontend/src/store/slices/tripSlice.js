import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTrips } from '../../api/tripApi';

// Async action to fetch trips
export const getTrips = createAsyncThunk('trips/getTrips', async () => {
  const trips = await fetchTrips();
  return trips;
});

// Trip slice definition
const tripSlice = createSlice({
  name: 'trips',
  initialState: {
    trips: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addTrip: (state, action) => {
      // Add the new trip at the start of the array
      state.trips.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTrips.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTrips.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.trips = action.payload; // Replace trips state with fetched trips
      })
      .addCase(getTrips.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export the actions and reducer
export const { addTrip } = tripSlice.actions;
export default tripSlice.reducer;
