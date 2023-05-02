import Panel from '../../UI/Panel';
import ObjectTable from '../../UI/ObjectTable';
import ToolTipDecorator from "../../UI/ToolTipDecorator.js";
import Action from "../../UI/Actions";
import API from "../../api/API";
import Modal from "../../UI/Modal";
import { useState } from 'react';


export default function AttendancePanels({attendances, reloadAttendances}){
    const deleteAttendanceEndpoint = '/attendance';
    const [search, setSearch] = useState('');
const {handleModal} = Modal.useModal();

const handleDelete = async (id) => {
    dismissModal();
    const response = await API.delete(`${deleteAttendanceEndpoint}/${id}`);
    response.isSuccess
      ? reloadAttendances()
      : showErrorModal("Delete Failed", response.message);
  };

    const showDeleteModal = (id) =>
    handleModal({
      show: true,
      title: "Alert!",
      content: <p>Are you sure you want to delete this attendance?</p>,
      actions: [
        <Action.Delete
          showText
          onClick={() => handleDelete(id)}
        />,
        <Action.Cancel showText onClick={dismissModal} />,
      ],
    });
    const dismissModal = () => handleModal({ show: false });
    const showErrorModal = (title, message) =>
    handleModal({
      show: true,
      title: title,
      content: <p>{message}</p>,
      actions: [<Action.Close showText onClick={dismissModal} />],
    });
    const attributes=[
        { key: 'firstName', label: 'Student Name:'},
        { key: 'lastName', label: 'Student Surname:'},
        { key: 'moduleName', label: 'Module:'},
        { key: 'classTypesNames', label: 'Lecture Type:'},
        { key: 'classRoomNumber', label: 'Room:'},
        { key: 'date', label: 'Date:'},
        { key: 'time', label: 'Time:'},
    ]
      return (
        <div >
    <Panel.Container>
     
      <h1>Attendance Records</h1>
      <h3>Filters:</h3>
      <div className="filters">
      <p style={{ fontWeight: 'bold' }}>Filter by date:</p>
        <input 
        className='input'
            onChange={(e) => setSearch(e.target.value)}
            type="text" 
            placeholder="Filter By Date       (yyyy-mm-dd)"/>
            <p style={{ fontWeight: 'bold' }}>Filter by Student ID:</p>
            <input
            className='input' 
            onChange={(e) => setSearch(e.target.value)}
            type="text" 
            placeholder="Filter By Student ID      "/>
            <p style={{ fontWeight: 'bold' }}>Filter by Module Name:</p>
            <input
            className='input' 
            onChange={(e) => setSearch(e.target.value)}
            type="text" 
            placeholder="Filter By Module Name      "/>
      </div>
    {
        !attendances
        ?<p>Loading Attendance List</p>
        :
        attendances.filter((item) => {
            return search.toLowerCase() === '' 
            ? item 
            : item.date.toLowerCase().includes(search); 
        }).map((attendance) =>
            <Panel 
            key={attendance.attendanceTableID}
            title={`Student ID ( ${attendance.userID} ) ${attendance.moduleName}  (${attendance.date})`}
            >
                <Panel.Static level={4}>
                <ObjectTable object={attendance}attributes={attributes}/>
                </Panel.Static >
            <Action.Tray>
                <ToolTipDecorator message="Delete this attendance">
                    <Action.Delete showText  onClick={() => showDeleteModal(attendance.attendanceTableID)}/>
                    </ToolTipDecorator>
                </Action.Tray>



            </Panel>
        )
    }
    </Panel.Container>
    </div> 
      )
      
}