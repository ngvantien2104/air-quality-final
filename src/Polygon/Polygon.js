import { polygonDaNang } from "./polygondanang";
import { Polygon,Marker, Popup, useMapEvents} from 'react-leaflet'
import {cityPoly} from "./cityPoly"
import { marker,map ,L} from "leaflet";

import React, {  useState } from "react";

import { point, polygon, booleanPointInPolygon, random } from '@turf/turf';
var properties= "không xác định";



//hàm kiểm trai xem 1 điểm có năm trong 1 vùng hay không
function isPointInsidePolygon(pointCoords, polygonCoords) {
    // Tạo đối tượng điểm từ tọa độ pointCoords
    const pointToCheck = point(pointCoords);
    // Tạo đối tượng polygon từ tọa độ polygonCoords
    const polygonFeature = polygon([polygonCoords]);
    // Kiểm tra xem điểm có nằm trong polygon không
    return booleanPointInPolygon(pointToCheck, polygonFeature);
}

function getPopupColorClass(trungbinhAir) {
    if (trungbinhAir < 12) {
      return "green"; // Lớp CSS cho màu xanh
    } else if (trungbinhAir >= 12.1 && trungbinhAir <= 35.4) {
      return "yellow"; // Lớp CSS cho màu vàng
    } else if(trungbinhAir >= 35.4){
      return "red"; // Lớp CSS cho màu đỏ
    } else  {
      return "yellow"; // Lớp CSS cho màu đỏ
    }
  }


  function getPopupStringClass(trungbinhAir) {
    if (trungbinhAir < 12) {
      return "Đây là mức bụi an toàn"; // Lớp CSS cho màu xanh
    } else if (trungbinhAir >= 12.1 && trungbinhAir <= 35.5) {
      return "Đây là mức bụi trung bình"; // Lớp CSS cho màu vàng
    } else if ( trungbinhAir<=35.5){
      return "Đây là mức bụi nguy hiểm"; // Lớp CSS cho màu đỏ
    } else {
      return "Đây là mức bụi chua xac dinh"; // Lớp CSS cho màu đỏ
    }
  }


function LocationPopup() {
    let trungbinhAir="chưa xác đinh";
    
    const [lat, setLat] = useState(16.66454);
    const [lng, setLng] = useState(108.55454);
    const map = useMapEvents({
    click(e) {
      
        setLat(e.latlng.lat);
        setLng(e.latlng.lng);
        let pointCoords = [e.latlng.lat,e.latlng.lng];
        const polygonCoords =  cityPoly.geometry.coordinates[0].map(coord => [coord[1], coord[0]])

        //   // Gọi hàm kiểm tra
        const isInside = isPointInsidePolygon(pointCoords, polygonCoords);
       
        if (!isInside===true){properties="không xác định"} 
        
    },
    })
    
        return (
            <div>
            { properties !== "không xác định" && (<Popup position={[lat,lng]} className={getPopupColorClass(trungbinhAir)} >
                
                <h2>
                Khu vưc {properties}
                </h2>
                <h3>
                Chỉ số không khí trung bình ở đây là {trungbinhAir}
                </h3>
                <h3>
                {getPopupStringClass(trungbinhAir)}
                </h3>
            </Popup>)}
        </div>
        )
    }


const PolygonDaNang = () => {

    return(
    <div>
        <Polygon
        positions={cityPoly.geometry.coordinates[0].map(coord => [coord[1], coord[0]])}
        color="white"
        />


        {polygonDaNang.features.map(state => {
        const coordinates = state.geometry.coordinates[0].map((item)=> [item[1], item[0]]);
        return (<Polygon
        pathOptions={{
            fillColor: 'white',
            weight: 2,
            opacity: 1,
            dashArray: 3,
            color: 'white'
        }}
        positions={coordinates}
        eventHandlers={{
            mouseover: (e)=> {
            const layer = e.target;
            layer.setStyle({
                fillOpacity: 0.12,
                weight:2,
                dashArray:"3",
                color:'white',
                fillColor: '#Facdcc'
            })
            },
            mouseout : (e) => {
            const layer = e.target;
            layer.setStyle({
                fillOpacity: 0,
                weight:2,
                dashArray:"3",
                color:'white',
                fillColor: 'white'
            })
            },
            click: (e) => {
                
                properties = state.properties["NAME_3"];
                return ;
            }
        }}
        /> 
        )
    }
    ) 
    }   


         <LocationPopup/> 
        
        </div>
    )
}

export default PolygonDaNang
