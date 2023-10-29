import logo from './logo.svg';
import './App.css';
import { MapContainer, TileLayer, useMap,Popup,Marker, Polygon,useMapEvents } from 'react-leaflet'
import {map} from 'leaflet'
import React, {  useEffect, useState } from "react";
import PolygonDaNang from './Polygon/Polygon';
import Heatmap from './heatmap/Heatmap';
import ngo from './assets/ngo.jpg'
import tien from './assets/tien.jpg'
import thang from './assets/thang.jpg'
import icon from './assets/icon.png'
import thangdobui from './assets/thangdobui.jpg'
import io from 'socket.io-client'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customIcon = new L.Icon({
  iconUrl: require("./iconmarker.png"),
  iconSize: [32, 32], // Kích thước biểu tượng
  iconAnchor: [16,37],
  popupAnchor: [0,-20]
});

function MapWithMarkers({ data }) {
  return (
    <div>
      {data.map((item, index) => (
        <Marker key={index} position={[item.objectJSON.data.Location.latitude, item.objectJSON.data.Location.longitude]} icon={customIcon} >
          <Popup>
            <h3>Time: {item.timeSystem}</h3>
            <p>PM10: {item.objectJSON.data.Dust['pm10_ug/m3']} µg/m³</p>
            <p>PM1: {item.objectJSON.data.Dust['pm1_ug/m3']} µg/m³</p>
            <p>PM2.5: {item.objectJSON.data.Dust['pm25_ug/m3']} µg/m³</p> 
           
          </Popup>
        </Marker>
      ))}
    </div>
  );
}



function App() {

const [extractedData, setExtractedData] = useState([]); // Khởi tạo extractedData với useState

useEffect(() => {
  fetchData(); // Gọi fetchData khi component được tạo
}, []); // Dấu [] đảm bảo fetchData chỉ chạy một lần khi component được render

const fetchData = () => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZFVUkiOiI2NDVjMmY0ODNkNjUwZGM2IiwiYXBwSUQiOiIzIiwiZW1haWwiOiJuZ3ZhbnRpZW4yMTA0QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoidGllbjA5NzY3MjAyMjUiLCJpYXQiOjE2OTg1NTI1NzN9._upRx8YbpZT8Y_0XuDtw6vdNtpgK_xtcsZC0assw4UM");
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "limit": 150
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://api.vngalaxy.vn/api/uplink/", requestOptions)
    .then(response => response.json())
    .then(data => {
      if (Array.isArray(data.data) && data.data.length > 0) {
        const extractedData = data.data.map(item => ({
          objectJSON: item.objectJSON,
          timeSystem: item.timeSystem
        }));
        setExtractedData(extractedData); // Cập nhật extractedData bằng useState
      } else {
        console.log("Không tìm thấy dữ liệu hoặc cấu trúc JSON không phù hợp.");
      }
    })
    .catch(error => console.error('Lỗi:', error));
};
  



  return (
    
    <div className="App">
       
       <div className='sildebar'> THÔNG TIN THÊM<br/><br/>Thông tin chỉ số bụi<br/><img src={thangdobui} alt='thangdobui' className='thangdo'/><br/><a href="https://duongkhi.vn/chi-so-bui-min-pm-2-5-pm1-0-bao-nhieu-la-an-toan-cho-suc-khoe" target="_blank">Bài viết về chỉ số bụi mịn</a>
       <br/> Liên Hệ
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
 <div>
   {/* Hiển thị extractedData tại đây */}
  {console.log(extractedData)}
      <h1>Map with Marker</h1>
      <MapWithMarkers data={extractedData} />
    </div>
</MapContainer>   

    </div>
  );
}

export default App;
