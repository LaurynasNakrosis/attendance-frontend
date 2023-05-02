import { useState } from "react";

const emptyAttendance = {
    userID: '',
    classScheduleID: "",
}

export default function AttendanceForm ({initialAttendance=emptyAttendance}) {
//state--------------------------------
const [attendance, setAttendance] = useState(initialAttendance);

    return(
        <form>
            <label htmlFor="userID" >User ID</label>
            <input type ='number' 
            name="userID" 
            placeholder="please enter Student ID"
            value={attendance.userID}
            />
            <label htmlFor="classScheduleID" >User ID</label>
            <input type ='number' 
            name="userID" 
            placeholder="Please enter Lecture ID"
            value={attendance.classScheduleID}
            />
        </form>
    );
}