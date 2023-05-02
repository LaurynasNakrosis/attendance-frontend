import React, { useEffect, useState } from 'react';
import './Radar.css';
import API from "../api/API.js";

// This component is a functional component using the React Hooks API to fetch attendance data from an API.
export default function Radar (){
  // Initialize the user ID with a default value of 1.
  let loggedinUserID = 1; 
  // Define the endpoint for getting attendance data based on the user ID.
  let attendanceEndpoint = `/attendance/student/${loggedinUserID}`;

  // State variables to keep track of attendance data and a loading message.
  const [attendance, setAttendance] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState('Loading Attendance....');

  // A method to fetch attendance data from the API.
  const apiCall = async (attendanceEndpoint) => {
    // Make a GET request to the API using the attendanceEndpoint.
    const response = await API.get(attendanceEndpoint);
    // If the API call was successful, update the attendance data.
    if (response.isSuccess) {
      const attendanceValues = Object.values(response.result);
      setAttendance(attendanceValues);
    } else {
      // If the API call was unsuccessful, update the loading message.
      setLoadingMessage(response.message);
    }
  };

  // Use the useEffect hook to call the apiCall method when the component is mounted.
  useEffect(() => { apiCall(attendanceEndpoint) }, [attendanceEndpoint]);

  // Get the number element from the HTML.
  let number = document.getElementById("number");
  // Initialize a counter variable.
  let counter = 0;
  // Set an interval to increment the counter and update the number element.
  setInterval (() => {
    if(counter === 65){
      // Clear the interval when the counter reaches 65.
      clearInterval();
    }else{
      counter += 1;
      number.innerHTML = counter + "%";
    }
  },60)

  // Render the component.
  return (
    <div className='body'>
    <div className="skill">
      <div className='outer'>
        <div className='inner'>
          <div id='number' >
              99%
          </div>
        </div>
      </div>

      {/* Render a circle in a SVG element */}
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px">
         <defs>
            {/* Define a gradient for the circle */}
            <linearGradient id="GradientColor">
               <stop offset="0%" stopColor="green" />
               <stop offset="100%" stopColor="green" />
            </linearGradient>
         </defs>
         <circle cx="80" cy="80" r="70" strokeLinecap="round" />
      </svg>
    </div>
    </div>
  );
};
