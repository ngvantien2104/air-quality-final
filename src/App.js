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
import thangdobui from './assets/thangdobui.png'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { random } from '@turf/turf';
import { io } from 'socket.io-client';

// const otherDb = mongoose.connection;


// otherDb.once('open', () => {
//   console.log('Kết nối đến cơ sở dữ liệu khác thành công');
// });

function App() {



  const customIcon = new L.Icon({
    iconUrl: require("./iconmarker.png"),
    iconSize: [20, 20], // Kích thước biểu tượng
    iconAnchor: [10,20],
    popupAnchor: [0,-20]
  });
  const busIcon = new L.Icon({
    iconUrl: require("./bus.png"),
    iconSize: [40, 40], // Kích thước biểu tượng
    iconAnchor: [20,40],
    popupAnchor: [0,-20]
  });
  const greenIcon = new L.Icon({
    iconUrl: require("./assets/green.png"),
    iconSize: [40, 40], // Kích thước biểu tượng
    iconAnchor: [20,40],
    popupAnchor: [0,-20]
  });
  const redIcon = new L.Icon({
    iconUrl: require("./assets/red.png"),
    iconSize: [40, 40], // Kích thước biểu tượng
    iconAnchor: [20,40],
    popupAnchor: [0,-20]
  });
  const orangeIcon = new L.Icon({
    iconUrl: require("./assets/orange.png"),
    iconSize: [40, 40], // Kích thước biểu tượng
    iconAnchor: [20,40],
    popupAnchor: [0,-20]
  });

  const yellowIcon = new L.Icon({
    iconUrl: require("./assets/yellow.png"),
    iconSize: [40, 40], // Kích thước biểu tượng
    iconAnchor: [20,40],
    popupAnchor: [0,-20]
  });


  function getIconColorClass(trungbinhAir) {
    if (trungbinhAir < 25) {
      return greenIcon; 
    } else if (trungbinhAir >= 25 && trungbinhAir <= 50) {
      return yellowIcon; 
    } else if (trungbinhAir >= 50 && trungbinhAir <= 80) {
      return orangeIcon; 
    }if (trungbinhAir >= 80 ) {
      return redIcon; 
    } else {
      return greenIcon
    }
  }
  function MapWithMarkers({ data }) {
    return (
      <div>
        {data.map((item, index) => (
          <Marker key={index} position={[item.objectJSON.data.Location.latitude, item.objectJSON.data.Location.longitude]} icon={getIconColorClass(item.objectJSON.data.Dust['pm25_ug/m3'])} >
            <Popup>
              
              <h3>Time: {item.timeSystem}</h3>
              <p>PM10: {item.objectJSON.data.Dust['pm10_ug/m3']} µg/m³</p>
              <p>PM1: {item.objectJSON.data.Dust['pm1_ug/m3']} µg/m³</p>
              <p>PM2.5: {item.objectJSON.data.Dust['pm25_ug/m3']} µg/m³</p> 
              
              <p>Location {item.objectJSON.data.Location.latitude}, {item.objectJSON.data.Location.longitude}</p>
              {item.rxInfo.map((tesstInfor, index) => (
                 <div>
                  <p>GatewayID: {tesstInfor.gatewayID} : rssi={tesstInfor.rssi} dBm</p> 
                 
               </div>
              ))}
            </Popup>
            
          </Marker>
        ))}
      </div>
    );
  }
  function oneMarker({ data }) {
  
    return (
      <div>
           {data && data.Location && data.Location.latitude && data.Location.longitude ? (
        <Marker
          position={[data.Location.latitude, data.Location.longitude]}
          icon= {busIcon}
          
        >
          <Popup>
            <p>PM10: {data.Dust['pm10_ug/m3']} µg/m³</p>
            <p>PM1: {data.Dust['pm1_ug/m3']} µg/m³</p>
            <p>PM2.5: {data.Dust['pm25_ug/m3']} µg/m³</p>
          </Popup>
        </Marker>
      ) : null}
      </div>
    );
  }

const [extractedData, setExtractedData] = useState([]); // Khởi tạo extractedData với useState

// useEffect(() => {
//   fetchData(); // Gọi fetchData khi component được tạo
// }, []); // Dấu [] đảm bảo fetchData chỉ chạy một lần khi component được render

   // Xóa timeout khi component bị hủy
 
const fetchData = () => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZFVUkiOiI2NDVjMmY0ODNkNjUwZGM2IiwiYXBwSUQiOiIzIiwiZW1haWwiOiJuZ3ZhbnRpZW4yMTA0QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoidGllbjA5NzY3MjAyMjUiLCJpYXQiOjE2OTg1NTI1NzN9._upRx8YbpZT8Y_0XuDtw6vdNtpgK_xtcsZC0assw4UM");
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "limit": 200

  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://api.vngalaxy.vn/api/uplink/", requestOptions)
    .then(response => response.json() )
    .then(data => {
    
      
      if (Array.isArray(data.data) && data.data.length > 0) {
        
        const temp = data.data.map(item => ({
          objectJSON: item.objectJSON,
          timeSystem: item.timeSystem,
           rssi:       item.rxInfo.rssi,
        
        }));
        setExtractedData(temp); // Cập nhật extractedData bằng useState
        
      } else {
        console.log("Không tìm thấy dữ liệu hoặc cấu trúc JSON không phù hợp.");
      }
    })
    .catch(error => console.error('Lỗi:', error));
};
  

// setInterval(() => {
//   // Hành động bạn muốn thực hiện sau 1 phút

//   fetchData();
// }, 60000); // 1 phút = 60,000 mili giây
const [message, setMessage] = useState({"data":{"Dust":{"pm10_ug/m3":14,"pm1_ug/m3":11,"pm25_ug/m3":23},"Location":{"latitude":16.074987,"longitude":108.153952}}}); // Khởi tạo message với giá trị ban đầu là chuỗi trống

useEffect(() => {
  const socket = io('http://localhost:3001');

  socket.on('welcome', (test) => {
    console.log(test);
  });

  socket.on('mqttData', (receivedMessage) => {
    const parsedMessage = JSON.parse(receivedMessage).object;
    setMessage(parsedMessage);
  });
}, []);
console.log(JSON.stringify(message))
const gialap = [{"objectJSON":{"data":{"Dust":{"pm10_ug/m3":13,"pm1_ug/m3":11,"pm25_ug/m3":23},"Location":{"latitude":16.108717,"longitude":108.130708}}},"timeSystem":"Tue, 07 Nov 2023 10:37:01 GMT"},{"objectJSON":{"data":{"Dust":{"pm10_ug/m3":12,"pm1_ug/m3":11,"pm25_ug/m3":24},"Location":{"latitude":16.107011,"longitude":108.131679}}},"timeSystem":"Tue, 07 Nov 2023 10:35:00 GMT"},{"objectJSON":{"data":{"Dust":{"pm10_ug/m3":14,"pm1_ug/m3":12,"pm25_ug/m3":30},"Location":{"latitude":16.102782194252498,"longitude":108.13396427601896}}},"timeSystem":"Tue, 07 Nov 2023 10:34:00 GMT"},{"objectJSON":{"data":{"Dust":{"pm10_ug/m3":18,"pm1_ug/m3":15,"pm25_ug/m3":27},"Location":{"latitude":16.100819272925932,"longitude":16.102782194252498}}},"timeSystem":"Tue, 07 Nov 2023 10:31:59 GMT"},{"objectJSON":{"data":{"Dust":{"pm10_ug/m3":21,"pm1_ug/m3":16,"pm25_ug/m3":30},"Location":{"latitude":16.09889408123105,"longitude":108.13573231742691}}},"timeSystem":"Tue, 07 Nov 2023 10:30:59 GMT"},{"objectJSON":{"data":{"Dust":{"pm10_ug/m3":15,"pm1_ug/m3":13,"pm25_ug/m3":25},"Location":{"latitude":16.097610609728022,"longitude":108.13647882379922}}},"timeSystem":"Tue, 07 Nov 2023 10:29:58 GMT"},{"objectJSON":{"data":{"Dust":{"pm10_ug/m3":19,"pm1_ug/m3":16,"pm25_ug/m3":58},"Location":{"latitude":16.09602513347592,"longitude":108.13757893845258}}},"timeSystem":"Tue, 07 Nov 2023 10:28:58 GMT"},{"objectJSON":{"data":{"Dust":{"pm10_ug/m3":19,"pm1_ug/m3":16,"pm25_ug/m3":29},"Location":{"latitude":16.094817143071452,"longitude":108.1385218938691}}},"timeSystem":"Tue, 07 Nov 2023 10:27:57 GMT"},{"objectJSON":{"data":{"Dust":{"pm10_ug/m3":21,"pm1_ug/m3":16,"pm25_ug/m3":59},"Location":{"latitude":16.093986645406204,"longitude":108.1395827187136}}},"timeSystem":"Tue, 07 Nov 2023 10:26:57 GMT"},{"objectJSON":{"data":{"Dust":{"pm10_ug/m3":21,"pm1_ug/m3":17,"pm25_ug/m3":39},"Location":{"latitude":16.092891893176272,"longitude":108.14052567413154}}},"timeSystem":"Tue, 07 Nov 2023 10:25:57 GMT"},{"objectJSON":{"data":{"Dust":{"pm10_ug/m3":19,"pm1_ug/m3":14,"pm25_ug/m3":27},"Location":{"latitude":16.091910386046507,"longitude":108.14190081744823}}},"timeSystem":"Tue, 07 Nov 2023 10:23:56 GMT"},{"objectJSON":{"data":{"Dust":{"pm10_ug/m3":14,"pm1_ug/m3":12,"pm25_ug/m3":50},"Location":{"latitude":16.090438116257943,"longitude":108.14272590343825}}},"timeSystem":"Tue, 07 Nov 2023 10:23:03 GMT"},{"objectJSON":{"data":{"Dust":{"pm10_ug/m3":14,"pm1_ug/m3":11,"pm25_ug/m3":23},"Location":{"latitude":16.088814831790216,"longitude":108.1434331200017}}},"timeSystem":"Tue, 07 Nov 2023 10:21:55 GMT"},{"objectJSON":{"data":{"Dust":{"pm10_ug/m3":15,"pm1_ug/m3":12,"pm25_ug/m3":24},"Location":{"latitude":16.086814021056142,"longitude":108.14433678560943}}},"timeSystem":"Tue, 07 Nov 2023 10:20:55 GMT"},{"objectJSON":{"data":{"Dust":{"pm10_ug/m3":13,"pm1_ug/m3":11,"pm25_ug/m3":23},"Location":{"latitude":16.08562280148655,"longitude":108.1450096279068}}},"timeSystem":"Tue, 07 Nov 2023 10:19:55 GMT"},{"objectJSON":{"data":{"Dust":{"pm10_ug/m3":16,"pm1_ug/m3":11,"pm25_ug/m3":36},"Location":{"latitude":16.083697462478412,"longitude":108.14583471389824}}},"timeSystem":"Tue, 07 Nov 2023 10:18:55 GMT"},{"objectJSON":{"data":{"Dust":{"pm10_ug/m3":13,"pm1_ug/m3":11,"pm25_ug/m3":60},"Location":{"latitude":16.081885361664717,"longitude":108.14618832217928}}},"timeSystem":"Tue, 07 Nov 2023 10:17:55 GMT"},{"objectJSON":{"data":{"Dust":{"pm10_ug/m3":17,"pm1_ug/m3":13,"pm25_ug/m3":27},"Location":{"latitude":16.080224254737956,"longitude":108.14689553874274}}},"timeSystem":"Tue, 07 Nov 2023 10:15:54 GMT"},{"objectJSON":{"data":{"Dust":{"pm10_ug/m3":14,"pm1_ug/m3":12,"pm25_ug/m3":29},"Location":{"latitude":16.078710768815526,"longitude":108.14746697296766}}},"timeSystem":"Tue, 07 Nov 2023 10:14:54 GMT"},{"objectJSON":{"data":{"Dust":{"pm10_ug/m3":14,"pm1_ug/m3":11,"pm25_ug/m3":29},"Location":{"latitude":16.077049635359003,"longitude":108.14837063857533}}},"timeSystem":"Tue, 07 Nov 2023 10:13:58 GMT"},{"objectJSON":{"data":{"Dust":{"pm10_ug/m3":10,"pm1_ug/m3":9,"pm25_ug/m3":39},"Location":{"latitude":16.075350734512924,"longitude":108.14927430418305}}},"timeSystem":"Tue, 07 Nov 2023 10:12:53 GMT"},{"objectJSON":{"data":{"Dust":{"pm10_ug/m3":16,"pm1_ug/m3":13,"pm25_ug/m3":36},"Location":{"latitude":16.07391609582602,"longitude":108.14958862265667}}},"timeSystem":"Tue, 07 Nov 2023 10:11:53 GMT"},{"objectJSON":{"data":{"Dust":{"pm10_ug/m3":14,"pm1_ug/m3":12,"pm25_ug/m3":24},"Location":{"latitude": 16.07202839757484,"longitude":108.15045299845553}}},"timeSystem":"Tue, 07 Nov 2023 10:10:52 GMT"},{"objectJSON":{"data":{"Dust":{"pm10_ug/m3":13,"pm1_ug/m3":10,"pm25_ug/m3":58},"Location":{"latitude":16.070133758454375,"longitude":108.15114580852548}}}}]




const [data, setData] = useState([]);
const [error, setError] = useState(null);
const [fetchURL, setFetchURL] = useState('http://localhost:3002/onehour');
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(fetchURL);
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      setData(responseData);
    } catch (err) {
      setError(err);
    }
  };

  fetchData();
}, [fetchURL]);
const handleFetchOneHour = () => {
  setFetchURL('http://localhost:3002/onehour');
  window.location.reload();
};

const handleFetchOneDay = () => {
  setFetchURL('http://localhost:3002/oneday');
 
};



// Bên ngoài useEffect
console.log(fetchURL);

const [isHeatmapMode, setIsHeatmapMode] = useState(false);

const toggleHeatmapMode = () => {
  setIsHeatmapMode(!isHeatmapMode);
};

  return (
    
    <div className="App">
         
       <div className='sildebar'>
        
         THÔNG TIN THÊM<br/>
       
       
        <br/>
        <button onClick={toggleHeatmapMode} 
        style={{
          backgroundColor: "#007BFF", // Màu nền
          color: "white", // Màu chữ
          padding: "10px 20px", // Kích thước nút
          border: "none", // Loại bỏ viền
          cursor: "pointer", // Biểu tượng con trỏ khi hover
          borderRadius: "5px", // Bo góc nút
          fontSize: "24px"
        }}>
         {"Chuyển trạng thái bản đồ"}
        </button>
        <br/>
        
        
         <button onClick={handleFetchOneHour}>Dữ liệu 1 giờ gần nhất</button>
        <button onClick={handleFetchOneDay}>Dữ liệu 1 ngày gần nhất</button>
       
      
         <br/><a href="https://duongkhi.vn/chi-so-bui-min-pm-2-5-pm1-0-bao-nhieu-la-an-toan-cho-suc-khoe" target="_blank">Bài viết  về chỉ số bụi mịn</a>
       <br/> Liên Hệ <br/>


      

       <div> 
        <img src={ngo} alt='ngo' className='member'/>
       <img src={tien} alt='tien' className='member'/>
        <img src={thang} alt='thang'className='member'/>
        </div>



     
       </div>   


       <div className='header'><img src={icon} alt='icon' className='icon'/>{isHeatmapMode ? "BẢN ĐỒ CHỈ SỐ CƯỜNG ĐỘ TÍNH HIỆU TRONG THÀNH PHỐ" : "BẢN ĐỒ CHỈ SỐ BỤI MỊN TRONG THÀNH PHỐ"}</div>   
       {isHeatmapMode ? null : (
        <img src={thangdobui} alt='thangdobui' className='thangdo' />
      )}
       
      <MapContainer center={[16.062895, 108.161310]} zoom={14} scrollWheelZoom={true}
        >
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

     
  {/* <PolygonDaNang/> */}
 
 <div>
   {/* Hiển thị extractedData tại đây */}
  
   
      <div>
  

      {isHeatmapMode ? (
        <Heatmap dataIn={data} />
      ) : (
        <>
          <h1>Map with Marker</h1>
          <MapWithMarkers data={data} />
        </>
      )}
    </div>
    </div>
    <Marker  position={[message.data.Location.latitude,message.data.Location.longitude]} icon={busIcon} >
            <Popup>
              {console.log(message.data.Dust['pm10_ug/m3'])}
               <p>Vị Trí Mới Nhất của xe bus</p>
            <p>PM10: {message.data.Dust['pm10_ug/m3']} µg/m³</p>
            <p>PM2.5: {message.data.Dust['pm25_ug/m3']} µg/m³</p>
            <p>PM1: {message.data.Dust['pm1_ug/m3']} µg/m³</p>
              
            </Popup>
          </Marker>
</MapContainer>   

    </div>
  );
}

export default App;
