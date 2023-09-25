import React from 'react'
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import { addressPoints } from './realworld.10000';

const Heatmap = () => {
     
      
      const coordinatesArray = addressPoints.features.map(feature => {
        const [lng, lat] = feature.geometry.coordinates;
        const randomNumber = Math.floor(Math.random() * 150); // Số ngẫu nhiên từ 0 đến 150
        return [lat, lng, randomNumber];
      });
      
      console.log(coordinatesArray);
    return (
    <div>
        <HeatmapLayer
          fitBoundsOnLoad
          fitBoundsOnUpdate
          points={coordinatesArray}
          longitudeExtractor={m => m[1]}
          latitudeExtractor={m => m[0]}
          intensityExtractor={m => parseFloat(m[0])}
          radius={20} // Đặt giá trị bán kính cố định
          blur={30} // Đặt giá trị độ mờ cố định
        />
    </div>
 )
}

export default Heatmap