import {  useState  } from "react";
import API from "../../api/API";
import { ActionDelete, ActionModify, ActionTray, Yes, No, ActionClose } from "../../UI/Actions";
import ObjectTable from "../../UI/ObjectTable.js";
import Panel from "../../UI/Panel.js";
import ToolTipDecorator from "../../UI/ToolTipDecorator.js";
import LectureForm from "../LectureForm.js";
import Modal from "../../UI/Modal.js";

export default function LecturesPanels ({lectures , reloadLectures}){
//Initialisation-------------------------------------------------------
    const putLecturesEndpoint = `/Class`;
    const deleteLecturesEndpoint = `/Class`;
    const [selectedForm, setSelectedForm] = useState(0);

//Methods--------------------------------------------------------------
    const handleModify = (id) => setSelectedForm(id === selectedForm ? 0 : id);

//State----------------------------------------------------------------
const { handleModal } = Modal.useModal();

//Methods--------------------------------------------------------------
    const handleDelete = async (id) => {
      dismissModal();
      const response = await API.delete(`${deleteLecturesEndpoint}/${id}`);
      response.isSuccess 
      ? reloadLectures()
      : showErrorModal("Delete Failed",response.message);
    };
    
    const handleCancel = () => setSelectedForm(0);

    const handleSubmit =  async (lecture) => {
      const response = await API.put(`${putLecturesEndpoint}/${lecture.classScheduleID}`, lecture);
      if (response.isSuccess){
        setSelectedForm(0);
        reloadLectures();
      }
    };

    const showDeleteModal = (id) => handleModal({
      show: true,
      title: "Alert!",
      content: <p>Are you sure you want to delete this lecture?</p>,
      actions: [
        <Yes showText onClick={() => handleDelete(id)} />,
        <No showText onClick={dismissModal}/>
      ]

});
const dismissModal = () => handleModal({show: false});

const showErrorModal = (title, message) => handleModal({
  show: true,
  tittle: title,
  content: <p>{message}</p>,
  actions: [
  <ActionClose showText onClick={dismissModal}/>
  ]
})
    
//View --------------------------------------------------------------
const displayebleAttributes =[
    { key: 'classRoomID', label: 'Class Room ID' },
    { key:'modulesID', label: 'Module ID' },
    { key: 'classTypesID', label: 'Class Type ID' },
    { key: 'date', label: 'Date' },
    { key: 'time', label: 'Time' },
];
return (
  <Panel.Container>
    {
      lectures.map((lecture) => (
             <Panel 
                  key={lecture.classScheduleID}                
                  title={`Class ID - ${lecture.classScheduleID}) ${lecture.date}`} 
                  level={2}
              >
                  <Panel.Static level={4}>
                    <ObjectTable object={lecture} attributes={displayebleAttributes} />
                  </Panel.Static>

                  <ActionTray>
                    <ToolTipDecorator message="Modify this lecture">
                      <ActionModify showText  onClick={() => handleModify(lecture.classScheduleID)}/>
                      </ToolTipDecorator>
                      <ToolTipDecorator message="Delete this lecture">
                      <ActionDelete showText  onClick={() => showDeleteModal(lecture.classScheduleID)}/>
                    </ToolTipDecorator>
                  </ActionTray>
                {
                  (selectedForm  === lecture.classScheduleID) && 
                    <LectureForm 
                    onCancel={handleCancel} 
                    onSubmit={handleSubmit} 
                    initialRecord={lecture} 
                    />
                }
            </Panel>
    ))}
    
  </Panel.Container>
)}