import React from 'react'
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import { addressPoints } from './realworld.10000';




const Heatmap = ({ dataIn }) => { // Sử dụng dataIn như một đối số đầu vào

  const data = dataIn.map((item) => ({
    latitude: item.objectJSON.data.Location.latitude,
    longitude: item.objectJSON.data.Location.longitude,
    intensity: parseFloat(item.objectJSON.data.Dust['pm25_ug/m3']), // Sửa tên thuộc tính cho đúng
  }));

  return (
    <div>
      <HeatmapLayer
  fitBoundsOnLoad={false}
  fitBoundsOnUpdate={false}
  points={data}
  longitudeExtractor={(m) => m.longitude}
  latitudeExtractor={(m) => m.latitude}
  intensityExtractor={(m) => m.intensity}
  radius={20} // Đặt giá trị bán kính cố định
  blur={25} // Đặt giá trị độ mờ cố định
/>
    </div>
  );
};
export default Heatmap
