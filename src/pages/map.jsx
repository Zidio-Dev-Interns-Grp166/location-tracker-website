import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


const MapWithTracking = () => {
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(null);
  const [history, setHistory] = useState([]);
  const [isTrackingPaused, setIsTrackingPaused] = useState(false);
  const watchIdRef = useRef(null);

  // Initialize the map
  useEffect(() => {
    const leafletMap = L.map('map').setView([0, 0], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(leafletMap);

    setMap(leafletMap);

    return () => {
      leafletMap.remove();
    };
  }, []);

  // Update map and history when position changes
  useEffect(() => {
    if (map && position) {
      const { latitude, longitude } = position;
      const marker = L.marker([latitude, longitude]).addTo(map);

      // Add current position to history
      setHistory(prevHistory => [...prevHistory, { latitude, longitude, timestamp: new Date() }]);

      // Check if tracking is paused
      if (!isTrackingPaused) {
        map.setView([latitude, longitude], 13);
      }

      return () => {
        map.removeLayer(marker);
      };
    }
  }, [map, position, isTrackingPaused]);

  // Start tracking user's position
  const startTracking = () => {
    if (!watchIdRef.current) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition({ latitude, longitude });
        },
        (err) => console.error(err),
        { enableHighAccuracy: true, maximumAge: 0 }
      );
    }
  };

  // Stop tracking user's position
  const stopTracking = () => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  };

  // Toggle tracking pause
  const togglePauseTracking = () => {
    setIsTrackingPaused(prevState => !prevState);
  };

  return (
    <div className='map-content'>
      <div id="map" style={{ width: '100%', height: '400px' }} />
      <div className='tracking-content'>
        <button className='tracking-btn' onClick={startTracking}>Start Tracking</button>
        <button className='tracking-btn' onClick={stopTracking}>Stop Tracking</button>
        <button className='tracking-btn' onClick={togglePauseTracking}>
          {isTrackingPaused ? 'Resume Tracking' : 'Pause Tracking'}
        </button>
      </div>
      <div className='previous-locations'> 
        view history
        <div className='inner-content'>
                <h2>Location History</h2>
                <ul>
                    {history.map((item, index) => (
                        <li key={index}>
                        Latitude: {item.latitude}, Longitude: {item.longitude}, Timestamp: {item.timestamp.toLocaleString()}
                        </li>
                    ))}
                </ul>
            </div>
      </div>
    </div>
  );
};

export default MapWithTracking;
