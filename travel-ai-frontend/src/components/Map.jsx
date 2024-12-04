import React, { useEffect, useState } from 'react';
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  DirectionsRenderer,
  InfoWindow,
} from '@react-google-maps/api';
import { motion } from 'framer-motion';

const mapContainerStyle = {
  width: '100%',
  height: '90vh',
};

export default function Map({ activities }) {
  const [mapCenter, setMapCenter] = useState({ lat: 48.853307, lng: 2.335956 }); // Default center
  const [directions, setDirections] = useState(null);
  const [activeActivity, setActiveActivity] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (activities.length > 0) {
      setMapCenter({
        lat: activities[0].latitude,
        lng: activities[0].longitude,
      });
    }
  }, [activities]);

  const calculateRoute = async (activities) => {
    if (!activities || activities.length < 2 || !isLoaded) return;

    const directionsService = new google.maps.DirectionsService();

    try {
      const origin = activities[0];
      const destination = activities[activities.length - 1];

      const request = {
        origin: { lat: parseFloat(origin.latitude), lng: parseFloat(origin.longitude) },
        destination: { lat: parseFloat(destination.latitude), lng: parseFloat(destination.longitude) },
        waypoints: activities.slice(1, -1).map((activity) => ({
          location: { lat: parseFloat(activity.latitude), lng: parseFloat(activity.longitude) },
          stopover: true,
        })),
        travelMode: google.maps.TravelMode.DRIVING,
      };

      directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirections(result);
        } else {
          console.error('Directions request failed:', status);
        }
      });
    } catch (error) {
      console.error('Error calculating route:', error);
    }
  };

  useEffect(() => {
    if (activities.length >= 2 && isLoaded) {
      calculateRoute(activities);
    }
  }, [activities, isLoaded]);

  const handleMarkerClick = (activity) => {
    setActiveActivity(activity);
    setMapCenter({ lat: activity.latitude, lng: activity.longitude });
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-screen"
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={mapCenter}
        options={{
          styles: [
            {
              featureType: 'all',
              elementType: 'geometry',
              stylers: [{ color: '#242f3e' }],
            },
            {
              featureType: 'all',
              elementType: 'labels.text.stroke',
              stylers: [{ color: '#242f3e' }],
            },
            {
              featureType: 'all',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#746855' }],
            },
          ],
        }}
      >
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              suppressMarkers: true,
            }}
          />
        )}
       
        {activities?.map((activity, index) => (
         <MarkerF
         key={index}
         position={{ lat: parseFloat(activity.latitude), lng: parseFloat(activity.longitude) }}
         onClick={() => handleMarkerClick(activity)}
       />
       
        ))}

        {activeActivity && (
          <InfoWindow
            position={{
              lat: parseFloat(activeActivity.latitude),
              lng: parseFloat(activeActivity.longitude),
            }}
            onCloseClick={() => setActiveActivity(null)}
            options={{ zIndex: 1000 }}
          >
            <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg" style={{ minWidth: '200px', minHeight: '150px' }}>
              <h2 className="font-bold">{activeActivity.place}</h2>
              <p>{activeActivity.description}</p>
              <p>
                <strong>Time:</strong> {activeActivity.time}
              </p>
              <p>
                <strong>Budget:</strong> {activeActivity.budget}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </motion.div>
  );
}
