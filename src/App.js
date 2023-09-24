import logo from './logo.svg';
import './App.css';
import { MapContainer, TileLayer, useMap,Popup,Marker, Polygon,useMapEvents } from 'react-leaflet'
import {map} from 'leaflet'
import React, {  useEffect, useState } from "react";
import PolygonDaNang from './Polygon/Polygon';
import Heatmap from './heatmap/Heatmap';



function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.10.54.110:3001/api/uplink', {
          method: 'POST',
          headers: {
            'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZFVUkiOiI2NDVjMmY0ODNkNjUwZGM2IiwiYXBwSUQiOiIzIiwiZW1haWwiOiJuZ29odXluaDA3MDdAZ21haWwuY29tIiwicGFzc3dvcmQiOiJuZ28xMjM0NTY3NyIsImlhdCI6MTY5NTA5MzI1NX0.dOaf1yMjYXqKkNAgHhOMWYNpuIiSB26dhUTyyAHWmjQ',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({"limit": 1000}),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const newData = await response.json();
        setData((prevData) => [...prevData, newData]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
},[]);
  return (
    

    <div className="App">
      {console.log(JSON.stringify(data))}
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
