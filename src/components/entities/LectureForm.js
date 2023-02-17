import React from 'react'
import Form from '../UI/Form.js';
import useLoad from '../api/useLoad.js';
//import { useState } from 'react';

// Object containing default values
const emptyLecture = {
    classRoomID: 0,
    modulesID: 0,
    classTypesID: 0,
    date: "",
    time: "",  
};

export default function LectureForm  ({ onCancel, onSubmit, initialRecord=emptyLecture})  {
    // Initialisation
    // Object containing (objects,properties) that defines the validation rules
    const validation = {
    isValid:  {
        classRoomID: (id) => id !== 0,
        modulesID: (id) => id !== 0,
        classTypesID: (id) => id !== 0,
        date: (id) => id !== 0,
        time: (id) => id !== 0,
    },
    errorMessage: {
        classRoomID: "Room ID is invalid",
        modulesID: "Module ID is invalid",
        classTypesID: "Class Type ID is invalid",
        date: "No date was selected",
        time: "No time was selected",
    }
}

    // Array that defines the order in whichthe properties should be processed
    const conformance = ['classRoomID','modulesID','classTypesID']
    
    // States -----------------------------------------------------------------
    // Declares multiple variables using destructing and assigns returned values from useForm hook from the Form component
    const [lecture, errors, handleChange, handleSubmit] = Form.useForm(initialRecord,conformance,validation,onCancel, onSubmit);

    //  Declares multiple variables using destruct and returns values from useLoad
    const [rooms, , loadingRoomsMessage, ] = useLoad('/room');
    const [modules, ,loadingModulesMessage,] = useLoad('/modules');
    const [types, ,loadingTypesMessage,] = useLoad('/types');

    // Handlers--------------------------------------
    // View ------------------------------------------
  return ( 
    
    <Form onSubmit={handleSubmit} onCancel={onCancel}>
        <Form.Item
            label="Class Room Name"
            htmlFor="classRoomID"
            advice="Please enter class room"
            error={errors.classRoomID}
        >           
            {
            !rooms
                ? <p>{loadingRoomsMessage}</p>
                : rooms.length === 0
                ? <p>No Rooms Found</p>
                :
                <select
                    name="classRoomID" 
                    value={lecture.classRoomID}
                    onChange={handleChange}
                >
                    <option value="0" disabled>None selected</option>
                    {
                        rooms.map((room)=> <option key={room.classRoomID} 
                            value={room.classRoomID}>
                            {room.classRoomNumber}</option>)
                    }
                </select>}
        </Form.Item>
        
        <Form.Item
            label="Module"
            htmlFor="classModulesID"
            advice="Please enter Module" 
            error={errors.modulesID}      
        >
       { 
            !modules
                    ? <p>{loadingModulesMessage}</p>
                    : modules.length === 0
                    ? <p>No Modules Found</p>
                    :
                    <select
                            name="modulesID"
                            value={lecture.modulesID}
                            onChange={handleChange}
                        >
                                <option value="0" disabled>None selected</option>
                                {
                                    modules.map((module)=> <option key={module.modulesID} value={module.modulesID}>{module.moduleName}</option>)
                                }
                        </select>}
        </Form.Item>
        
        <Form.Item
            label="Class Type "
            htmlFor="classTypesID"
            advice="Please enter Class Type "
            error={errors.classTypesID}
        >
            {
            !types
                ? <p>{loadingTypesMessage}</p>
                : types.length === 0
                ? <p>No classes found</p>
                :
                <select
                    name="classTypesID"
                    value={lecture.classTypesID}
                    onChange={handleChange}
                >
                        <option value="0" disabled>None selected</option>
                    {
                        types.map((type)=> <option key={type.classTypesID} value={type.classTypesID}>{type.classTypesNames}</option>)
                    }
            </select>}
        </Form.Item>

        <Form.Item
            label="Date"
            htmlFor="date"
            advice="Please enter Date"
            error={errors.date}
        >
            <input
                type="date"
                name="date"
                value={lecture.date}
                onChange={handleChange}     
            />
        </Form.Item>
       
        <Form.Item
            label="Time"
            htmlFor="time"
            advice="Please enter time "
            error={errors.time}
        >
            <input
                type="time"
                name="time"
                value={lecture.time}
                onChange={handleChange}
            />  
        </Form.Item>

    </Form>
  ) 

}
