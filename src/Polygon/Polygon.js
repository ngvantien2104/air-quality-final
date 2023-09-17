import { polygonDaNang } from "./polygondanang";
import { Polygon,Marker, Popup, useMapEvents} from 'react-leaflet'

import { marker,map ,L} from "leaflet";

import React, {  useState } from "react";

var properties;
function LocationPopup() {
    const [lat, setLat] = useState(16.66454);
    const [lng, setLng] = useState(108.55454);
        const map = useMapEvents({
    click(e) {
        setLat(e.latlng.lat);
        setLng(e.latlng.lng);
        map.flyTo([lat,lng]);
    },
    })
        return (
            <Popup position={[lat,lng]}>BẠN ĐANG Ở<br/>
                {properties}<br/> CHỈ SỐ BỤI TẠI ĐÂY LÀ
            </Popup>
        )
}
const PolygonDaNang = () => {
    
    return(
    <div>
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
                fillOpacity: 0.5,
                weight:2,
                dashArray:"3",
                color:'white',
                fillColor: '#Facdcc'
            })
            },
            mouseout : (e) => {
            const layer = e.target;
            layer.setStyle({
                fillOpacity: 0.2,
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