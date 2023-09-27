import logo from './logo.svg';
import './App.css';
import { MapContainer, TileLayer, useMap,Popup,Marker, Polygon,useMapEvents } from 'react-leaflet'
import {map} from 'leaflet'
import React, {  useEffect, useState } from "react";
import PolygonDaNang from './Polygon/Polygon';
import Heatmap from './heatmap/Heatmap';
import ngo from './assets/ngo.png'
import tien from './assets/tien.jpg'
import thang from './assets/thang.jpg'
import icon from './assets/icon.png'
import io from 'socket.io-client'


function App() {

  useEffect(() => {
    const socket = io('http://localhost:30010'); // Thay thế URL bằng URL thực tế của máy chủ socket của bạn

    socket.on('test', () => {
              var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZFVUkiOiI5YzMyMDI2OWU1ZmVhNTBiIiwiYXBwSUQiOiIzIiwiZW1haWwiOiJuZ3ZhbnRpZW4yMTA0QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoidGllbjA5NzY3MjAyMjUiLCJpYXQiOjE2OTU2MjQ0MDR9.4b5XGSHtiItP70ckCTYSnu3wy-rqcNmEVF-KwfuaKIs");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          "limit": 1
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("https://api.vngalaxy.vn/api/uplink/", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
    });
    return () => {
      socket.disconnect(); // Ngắt kết nối khi component bị unmounted
    };
  }, []);


  return (
    

    <div className="App">
       
       <div className='sildebar'> <br/><br/>Thông tin thêm<br/><br/><br/><br/>THÔNG TIN CHỈ SỐ BỤI<br/><br/><a href="https://duongkhi.vn/chi-so-bui-min-pm-2-5-pm1-0-bao-nhieu-la-an-toan-cho-suc-khoe" target="_blank">Bài viết về chỉ số bụi mịn</a>
       <br/><br/>
       <br/><br/><br/> Liên Hệ
       <div> <img src={ngo} alt='ngo' className='member'/>
       <img src={tien} alt='tien' className='member'/>
        <img src={thang} alt='thang'className='member'/></div>
       </div>   
       <div className='header'><img src={icon} alt='icon' className='icon'/>Bản Đồ chỉ số không khí (bụi mịn) trong thành phố</div>   
      <MapContainer center={[16.048650404008928, 108.16870209934272]} zoom={10} scrollWheelZoom={true}
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
