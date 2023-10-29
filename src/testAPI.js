import React from 'react'

const testAPI = () => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZFVUkiOiI2NDVjMmY0ODNkNjUwZGM2IiwiYXBwSUQiOiIzIiwiZW1haWwiOiJuZ3ZhbnRpZW4yMTA0QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoidGllbjA5NzY3MjAyMjUiLCJpYXQiOjE2OTg1NTI1NzN9._upRx8YbpZT8Y_0XuDtw6vdNtpgK_xtcsZC0assw4UM");
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "limit": 30
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
      } else {
        console.log("Không tìm thấy dữ liệu hoặc cấu trúc JSON không phù hợp.");
      }
    })
    .catch(error => console.error('Lỗi:', error));
    
}

export default testAPI
