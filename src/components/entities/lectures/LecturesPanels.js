import { useState } from "react";
import API from "../../api/API";
import Action from "../../UI/Actions";
import ObjectTable from "../../UI/ObjectTable.js";
import Panel from "../../UI/Panel.js";
import ToolTipDecorator from "../../UI/ToolTipDecorator.js";
import LectureForm from "../LectureForm.js";
import { useModal } from "../../UI/Modal";
import "./LecturePanels.css";

export default function LecturesPanels({ lectures, reloadLectures }) {
  //Initialisation-------------------------------------------------------
  const putLecturesEndpoint = `/Class`;
  const deleteLecturesEndpoint = `/Class`;
  const [selectedForm, setSelectedForm] = useState(0);

  //State----------------------------------------------------------------
  const { handleModal } = useModal();
  const [search, setSearch] = useState('');
  console.log(search)
  //Methods--------------------------------------------------------------
  const handleModify = (id) => setSelectedForm(id === selectedForm ? 0 : id);

  const handleDelete = async (id) => {
    dismissModal();
    const response = await API.delete(`${deleteLecturesEndpoint}/${id}`);
    response.isSuccess
      ? reloadLectures()
      : showErrorModal("Delete Failed", response.message);
  };

  const handleCancel = () => setSelectedForm(0);

  const handleSubmit = async (lecture) => {
    const response = await API.put(
      `${putLecturesEndpoint}/${lecture.classScheduleID}`,
      lecture
    );
    if (response.isSuccess) {
      setSelectedForm(0);
      reloadLectures();
    }
  };

  const showDeleteModal = (id) =>
    handleModal({
      show: true,
      title: "Alert!",
      content: <p>Are you sure you want to delete this lecture?</p>,
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

  //View --------------------------------------------------------------
  const displayebleAttributes = [
    { key: "classRoomID", label: "Class Room ID" },
    { key: "modulesID", label: "Module ID" },
    { key: "moduleName", label: "Module Name" },
    { key: "classTypesID", label: "Class Type ID" },
    { key: "classTypesNames", label: "Class Type Name" },
    { key: "date", label: "Date" },
    { key: "time", label: "Time" },
  ];
return (
  
  <Panel.Container >
    <div className="filters">
      <h1>Filters</h1>
      <p style={{ fontWeight: 'bold' }}>Search by date:</p>
      <input 
        className="input"
        onChange={(e) => setSearch(e.target.value)}
        type="text" 
        placeholder="Enter date in this format yyyy-mm-dd"/>
      <p style={{ fontWeight: 'bold' }}>Search by Module Name:</p>
      <input 
      className="input"
        onChange={(e) => setSearch(e.target.value)}
        type="text" 
        placeholder=" Enter Module Name Here"/>
</div>
    {
      lectures.filter((item) => {
        return search.toLowerCase() === '' 
        ? item 
        : item.date.toLowerCase().includes(search)/item.date.toLowerCase().includes(search);
    }).map((lecture) => (
             <Panel
                  key={lecture.classScheduleID}                
                  title={`Class ID - ${lecture.classScheduleID}) ${lecture.moduleName} ${lecture.date}`} 
                  level={3}
              >
                  <Panel.Static level={4}>
                    <ObjectTable object={lecture} attributes={displayebleAttributes} />
                  </Panel.Static>

                  <Action.Tray>
                    <ToolTipDecorator message="Modify this lecture">
                      <Action.Modify showText  onClick={() => handleModify(lecture.classScheduleID)}/>
                      </ToolTipDecorator>
                      <ToolTipDecorator message="Delete this lecture">
                      <Action.Delete showText  onClick={() => showDeleteModal(lecture.classScheduleID)}/>
                    </ToolTipDecorator>
                  </Action.Tray>
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