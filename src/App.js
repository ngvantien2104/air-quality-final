import logo from './logo.svg';
import './App.css';
import { MapContainer, TileLayer, useMap,Popup,Marker, Polygon,useMapEvents } from 'react-leaflet'
import {map} from 'leaflet'
import React, {  useState } from "react";
import PolygonDaNang from './Polygon/Polygon';
import Heatmap from './heatmap/Heatmap';



function App() {

  const [popupPosition, setPopupPosition] = useState(null);
  
  return (
    
    <div className="App">
      <div className='sildebar'> <br/><br/>Thông tin thêm<br/>ẢNH<br/><br/>MÀU MÈ<br/><br/>THÔNG TIN CHỈ SỐ BỤI<br/><br/>LINK BÀI VIẾT</div>   
      <MapContainer center={[16.048650404008928, 108.16870209934272]} zoom={11} scrollWheelZoom={false}
        
        >

       
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />


  <PolygonDaNang/>
  <Heatmap/>
  
</MapContainer>
   

  
    </div>
  );
}

export default App;
