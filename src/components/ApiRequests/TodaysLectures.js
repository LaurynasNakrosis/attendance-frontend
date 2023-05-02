import { useState, useEffect } from "react";
import API from "../api/API.js";

//import RenderCount from "../UI/RenderCount";
//import Moment from 'moment'; 

import Button from "../UI/Button";
import './TodaysLectures.css';
//import Collapsible from '../UI/Collapsible.js';
import Radar from '../UI/Radar.js'
import Panel from "../UI/Panel.js";
import Action from "../UI/Actions.js";
import { useModal } from "../UI/Modal.js";


export default function TodaysLectures() {

    //const formatDate = Moment().format('YYYY-MM-DD')
    //const todaysDate = `${formatDate}`;

    //console.log(todaysDate)

    //Initialisation====================== 
    const loggedinUserID = 26; 
  

    const dailyClassEndpoint = `/class/user/${loggedinUserID}`;
    

    //State====================== 
    const [lectures, setLectures] = useState([]);
    const [loadingMessage, setLoadingMessage] = useState('Loading Todays Lectures....');
    const { handleModal } = useModal();
    const [state, setState] = useState(false);
    const [search, setSearch] = useState('');
    console.log(search)
    //Methods====================== 
    const apiCall = async (dailyClassEndpoint) => {
        const response = await API.get(dailyClassEndpoint);
        response.isSuccess 
        ? setLectures(response.result) 
        : setLoadingMessage(response.message);
    //console.log(result);
    }
    //apiCall(dailyClassEndpoint);
    useEffect(() => { apiCall(dailyClassEndpoint) }, [dailyClassEndpoint]);


    const handleCheckIn = () =>{
        setState(!state);
    }


    const showConfirmationModal = (lecture) =>
    handleModal({
      show: true,
      title: "Alert!",
      content: <p>Successfully checked in the lecture! `{lecture.moduleName}`</p>,
      actions: [
        <Action.Close showText onClick={dismissModal} />,
      ],
    });
    const dismissModal = () => handleModal({ show: false });
    //View====================== 
    return (
        
        <div className="row">
           
            {/*<RenderCount background="Yellow" fontColor="Black"/>*/}
           
            <div className="item">
                <h1 className="text">Todays Lectures </h1>
                <input 
                    onChange={(e) => setSearch(e.target.value)}
                    type="text" 
                    placeholder="Search Classses"/>
            {
                !lectures
                    ?<p>{loadingMessage}</p>
                    : lectures.map === 0
                        ? <p>No Lectures Today</p>
                        : 
                        lectures.filter((item) => {
                            return search.toLowerCase() === '' 
                            ? item 
                            : item.date.toLowerCase().includes(search); 
                        }).map((lecture) =>(
                        <Panel 
                        key={lecture.classScheduleID}       
                        title={`${lecture.moduleName} ${lecture.date}`} 
                        >
                            <h2 > Module Name: {lecture.moduleName} </h2>
                             <h3> Lecture Type: {lecture.classTypesNames}   </h3> 
                             <h4>Module ID: {lecture.modulesID}</h4>
                             <h4>Class room Number: {lecture.classRoomNumber}</h4>
                            <p>Date: {lecture.date}  </p>
                            <p>Time: {lecture.time}</p>
                            <button  className={'toggle--button ' + (state ? 'toggle--close':'')} 
                            onClick={event => {showConfirmationModal(lecture); handleCheckIn();}} >
                                {state ? 'Successfuly Checked' : 'Check In'}
                                </button>                                   
                        </Panel>
                        ))
                    
            }
            </div>
                <div className="item2">
                <h1>Attendance</h1>
                <div className="radar">
                    <Radar/>
                </div>
                <div className="filterPanel">
                    <Button text='Past 7 Days' aria-label="Seven Days"/>
                    <Button text='Past 14 Days'/>
                    
                    <Button text='Academic Year'/>
                </div>
            <div>
   
           </div>
            </div>

        </div>
    );
}