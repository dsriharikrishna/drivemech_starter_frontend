# Location Slice Usage Guide

## Overview
The location slice handles all location-related API calls and state management for garage search, location data, and garage details.

## Integration Steps

### 1. Add to Store Configuration
In your `store.ts`, add the location slice:

```typescript
import locationReducer from './slicers/locationSlicer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    location: locationReducer, // Add this line
    // ... other reducers
  },
});
```

### 2. API Configuration
The location endpoints are already configured in `apiConfig.ts`:

```typescript
// These endpoints are available as LOCATION_ENDPOINTS
export const LOCATION_ENDPOINTS = {
  LOCATIONS: {
    ALL: '/locations',
    BY_ID: '/locations',
  },
  GARAGES: {
    SEARCH: '/garages/search',
    BY_ID: '/garages',
  },
} as const;

// Usage in components
import { LOCATION_ENDPOINTS } from '@/services/apiConfig';
```

## Usage Examples

### In LocationSearchSection Component

```typescript
import { useDispatch, useSelector } from 'react-redux';
import { searchGarages, selectGarages, selectSearchLoading, selectLocationError } from '@/store/slicers/locationSlicer';

export default function LocationSearchSection({ onSearch }: LocationSearchSectionProps) {
  const dispatch = useDispatch();
  const garages = useSelector(selectGarages);
  const loading = useSelector(selectSearchLoading);
  const error = useSelector(selectLocationError);

  const handleSearch = (data: LocationFormData) => {
    // Dispatch search action
    dispatch(searchGarages({
      city: data.city,
      pincode: data.pincode,
      page: 1,
      limit: 10,
      sortBy: 'name'
    }));
    
    // Call parent callback if needed
    onSearch(data);
  };

  return (
    // ... your JSX
    <form onSubmit={form.handleSubmit(handleSearch)}>
      {/* Your form fields */}
    </form>
  );
}
```

### In LocationGrid Component

```typescript
import { useSelector } from 'react-redux';
import { selectGarages, selectPagination, selectSearchLoading } from '@/store/slicers/locationSlicer';

export default function LocationGrid() {
  const garages = useSelector(selectGarages);
  const { currentPage, totalPages, totalResults } = useSelector(selectPagination);
  const loading = useSelector(selectSearchLoading);

  if (loading === 'pending') {
    return <div>Loading garages...</div>;
  }

  if (loading === 'failed') {
    return <div>Failed to load garages. Please try again.</div>;
  }

  return (
    <div>
      <p>Found {totalResults} garages</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {garages.map((garage) => (
          <GarageCard key={garage.id} garage={garage} />
        ))}
      </div>
      
      {/* Pagination component */}
      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages}
          onPageChange={(page) => dispatch(searchGarages({ ...lastSearch, page }))}
        />
      )}
    </div>
  );
}
```

### Advanced Usage Examples

#### 1. Load More Functionality
```typescript
const loadMoreGarages = () => {
  const nextPage = currentPage + 1;
  dispatch(searchGarages({
    ...lastSearch,
    page: nextPage
  }));
};
```

#### 2. Filter by Service
```typescript
const filterByService = (service: string) => {
  dispatch(searchGarages({
    city: 'Hyderabad',
    service: service,
    page: 1
  }));
};
```

#### 3. Sort Results
```typescript
const sortResults = (sortBy: 'name' | 'rating' | 'distance') => {
  dispatch(searchGarages({
    ...lastSearch,
    sortBy,
    page: 1
  }));
};
```

#### 4. Get Garage Details
```typescript
const viewGarageDetails = (garageId: string) => {
  dispatch(getGarageById(garageId));
};

// In component
const selectedGarage = useSelector(selectSelectedGarage);
```

#### 5. Get Available Cities
```typescript
useEffect(() => {
  dispatch(getLocations());
}, []);

const locations = useSelector(selectLocations);
```

## State Management

### Available State
```typescript
{
  garages: Garage[],           // Search results
  locations: Location[],        // Available cities/locations
  searchLoading: string,       // 'idle' | 'pending' | 'succeeded' | 'failed'
  locationsLoading: string,    // Loading state for locations
  currentPage: number,         // Current page in pagination
  totalPages: number,          // Total pages available
  totalResults: number,        // Total number of results
  error: string | null,        // Error message
  lastSearch: SearchParams,    // Last search parameters used
  lastFetched: number,         // Timestamp of last fetch
  selectedLocation: Location,  // Currently selected location
  selectedGarage: Garage,      // Currently selected garage
}
```

### Available Actions
```typescript
// Thunks (API calls)
dispatch(searchGarages(params));
dispatch(getLocations());
dispatch(getGarageById(id));
dispatch(getLocationById(id));

// Reducers (state updates)
dispatch(clearSearchResults());
dispatch(clearError());
dispatch(setSelectedGarage(garage));
dispatch(setSelectedLocation(location));
dispatch(updateSearchParams(params));
dispatch(resetLocationState());
```

## Best Practices

### 1. Error Handling
```typescript
const error = useSelector(selectLocationError);
if (error) {
  return <ErrorMessage message={error} />;
}
```

### 2. Loading States
```typescript
const loading = useSelector(selectSearchLoading);
return (
  <div>
    {loading === 'pending' && <LoadingSpinner />}
    {loading === 'succeeded' && <GarageList />}
    {loading === 'failed' && <ErrorRetry />}
  </div>
);
```

### 3. Debouncing Search
```typescript
const debouncedSearch = useMemo(
  () => debounce((searchParams) => {
    dispatch(searchGarages(searchParams));
  }, 500),
  []
);
```

### 4. Caching Strategy
The slice automatically handles caching with `lastFetched` timestamp. You can implement cache invalidation:

```typescript
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const shouldRefetch = (lastFetched: number) => {
  return Date.now() - lastFetched > CACHE_DURATION;
};
```

## Future Enhancements

### 1. Real-time Updates
```typescript
// Add WebSocket support for live garage availability
export const subscribeToGarageUpdates = createAsyncThunk(
  'location/subscribeToUpdates',
  async (garageId: string) => {
    // WebSocket implementation
  }
);
```

### 2. Geolocation Support
```typescript
// Add user's current location
export const searchNearbyGarages = createAsyncThunk(
  'location/searchNearby',
  async (params: { latitude: number; longitude: number; radius: number }) => {
    // Geolocation-based search
  }
);
```

### 3. Favorites
```typescript
// Add favorite garages functionality
export const toggleFavoriteGarage = createAsyncThunk(
  'location/toggleFavorite',
  async (garageId: string) => {
    // Toggle favorite status
  }
);
```

This slice provides a solid foundation for all location-related functionality in your DriveMech application.
