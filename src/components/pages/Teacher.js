import React from 'react'
import './Teacher.css'
import AttendancePanels from '../entities/attendances/AttendancePanels';
import useLoad from '../api/useLoad';

export default function Teacher(){
const endpoint = `/attendance`;
const  [attendances, ,loadingMessage, loadAttendances] = useLoad(endpoint);
  return (
    <div className='Row'>
    <section className='screen'>
        {
            !attendances
                ? <p>{loadingMessage}</p>
                : attendances.length === 0
                    ? <p> No attendance found</p>
                    : <AttendancePanels attendances={attendances} reloadAttendances={() => loadAttendances(endpoint)} />
        }
    </section> 

    <div className='item2'>

    </div>
    </div>
  )
}

