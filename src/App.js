import logo from './logo.svg';
import './App.css';
import { MapContainer, TileLayer, useMap,Popup,Marker, Polygon,useMapEvents } from 'react-leaflet'

import React, {  useState } from "react";
import PolygonDaNang from './Polygon/Polygon';

function App() {

  const [popupPosition, setPopupPosition] = useState(null);
  return (
    <div className="App">

      <MapContainer center={[16.048650404008928, 108.16870209934272]} zoom={11} scrollWheelZoom={false}
        
        >
        
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />


 <PolygonDaNang/>
</MapContainer>
    

  
    </div>
  );
}

export default App;
