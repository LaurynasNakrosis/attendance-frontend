import { useState, useEffect } from "react";
import Moment from 'moment'; 

//import RenderCount from "../UI/RenderCount";
import API from "../api/API.js";
import Button from "../UI/Button";
import './TodaysLectures.css';
import Collapsible from '../UI/Collapsible.js';


export default function TodaysLectures() {
    const onClick =() =>{
        console.log('Click')
    }
   

    //const formatDate = Moment().format('YYYY-MM-DD')
    //const todaysDate = `${formatDate}`;

    //console.log(todaysDate)

    //Initialisation====================== 
    const loggedinUserID = 25; 
    const endpoint = `/Class/user/${loggedinUserID}`;

    //State====================== 
    const [lectures, setLectures] = useState(null);
    const [loadingMessage, setLoadingMessage] = useState('Loading Todays Lectures....');

    //Methods====================== 
    const apiCall = async (endpoint) => {
        const response = await API.get(endpoint);
        response.isSuccess 
        ? setLectures(response.result) 
        : setLoadingMessage(response.message);
    //console.log(result);
    }
    
    //apiCall(endpoint);
    useEffect(() => { apiCall(endpoint) }, [endpoint]);

    //View====================== 
    return (
        <section>
            {/*<RenderCount background="Yellow" fontColor="Black"/>*/}
           
            <div>
            {
                !lectures
                    ?<p>{loadingMessage}</p>
                    : lectures.lenght === 0
                        ? <p>No Lectures Today</p>
                        : 
                        
                        lectures.map((schedule) =>
                        <Collapsible key={schedule.classScheduleID} className="container">
                            <h2 > Module Name: {schedule.moduleName} </h2>
                             <h3> Lecture Name: {schedule.classTypesNames}   </h3> 
                             <h4>Module ID: {schedule.modulesID}</h4>
                             <h4>Class room Number: {schedule.classRoomNumber}</h4>
                            <p>Date: {schedule.date}  </p>
                            <p>Time: {schedule.time}</p>
                            <Button color='green' text='Check In' onClick={onClick} />                                   
                        </Collapsible>)
                    
            }
            </div>

        </section>
    );
}