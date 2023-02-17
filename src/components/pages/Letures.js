import React from 'react'
import { useState} from "react";
import API from "../api/API.js";
import Button from "../UI/Button";
import '../UI/Card.css';
import Collapsible from '../UI/Collapsible.js';
import LectureForm from '../entities/LectureForm.js';
import useLoad from '../api/useLoad.js';



const Lectures = () => {


    //Initialisation====================== 
    //const classID = 358; 
    const postEndpoint = `/Class`;
    const getEndpoint = `/Class/1`;
    

    //State======================== 
    const [lectures, , loadingMessage, loadLectures] = useLoad(getEndpoint);
    const [showAddClassForm, setShowAddClassForm] = useState(false);
    //Context======================
    //Methods====================== 
    const toggleAddForm = () => setShowAddClassForm(!showAddClassForm);
    const cancelAddForm = () => setShowAddClassForm(!showAddClassForm);
   

    const handleAddSubmit = async (lecture) => {
        console.log(JSON.stringify(lecture))
        const response = await API.post(postEndpoint,lecture);
        return response.isSuccess
        ? loadLectures(postEndpoint) || true
        : false;
    }

  return (
    <section >
       <h1>Admin Lectures</h1>
      <Collapsible>
       <Collapsible >
            {
                !lectures
                    ?<p>{loadingMessage}</p>
                    : lectures.length === 0
                        ? <p>No Lectures Today</p>
                        : 
                        
                        lectures.map((lectures) =>
                        <div  key={lectures.classScheduleID}  title= {lectures.classScheduleID}>
                        <h2> Class Schedule</h2>
                        <h4>Lecture Name: {lectures.classScheduleID}</h4>
                        <h4>Class Room Name: {lectures.classRoomID}</h4>
                        <h4>Module ID: {lectures.modulesID}</h4> 
                        <h4>Class Type: {lectures.classTypesID}</h4> 
                        <p>Date: {lectures.date}</p>
                        <p>Time: {lectures.time}</p>
                        <Button color='green' text='Edit Lecture' />                             
                      </div>
                        )                 
            }
           
            </Collapsible>
<Collapsible >
<Button color='green' text='Add new Lecture' onClick={toggleAddForm} /> 

{
    showAddClassForm && 
        <LectureForm onCancel={cancelAddForm}  onSubmit={handleAddSubmit}/>
}
</Collapsible>
</Collapsible>
</section>
  )
}
export default Lectures;