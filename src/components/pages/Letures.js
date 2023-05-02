import React,{ useState} from 'react'
import API from "../api/API.js";
import Button from "../UI/Button";
import '../UI/Card.css';
import LectureForm from '../entities/LectureForm.js';
import useLoad from '../api/useLoad.js';
import './Lecture.css';
import LecturesPanels from '../entities/lectures/LecturesPanels.js';
import { useModal } from '../UI/Modal.js';
import Action from '../UI/Actions.js';


const Lectures = () => {


    //Initialisation====================== 
    //const classID = 358; 
 
    const postEndpoint = `/Class`;
    const userID = 10;
    const getLecturesEndpoint = `/Class/user/${userID}`;
    

    //State======================== 
    const [lectures, , loadingMessage, loadLectures] = useLoad(getLecturesEndpoint);
    const [showAddClassForm, setShowAddClassForm] = useState(false);
    const { handleModal } = useModal();
    const [search,setSearch] = useState('');
    console.log(search)
    //Context======================
    //Methods====================== 
    const toggleAddForm = () => setShowAddClassForm(!showAddClassForm);
    const cancelAddForm = () => setShowAddClassForm(!showAddClassForm);
   

    const handleAddSubmit = async (lecture) => {

        const response = await API.post(postEndpoint,lecture);
        return response.isSuccess
        ? loadLectures(postEndpoint)/showDeleteModal() || true
        : showErrorModal() || false;
    }
    const showDeleteModal = (id) =>
    handleModal({
      show: true,
      title: "Alert!",
      content: <p>Lecture successfully added</p>,
      actions: [
        <Action.Close showText onClick={dismissModal} />,
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

  return (
  <div className='Row'>
    <div className='item'>
       
       <div className='text'>
       <h1 >Item List</h1>
       </div>
            {
                !lectures
                    ?<p>{loadingMessage}</p>
                    : lectures.filter((item) => {
                      return search.toLowerCase() === '' 
                      ? item 
                      : item.classTypesNames.toLowerCase().includes(search); 
                  }).map === 0
                        ? <p>No Lectures found</p>
                        : <LecturesPanels 
                        lectures={lectures} 
                        reloadLectures={() => loadLectures(getLecturesEndpoint)}/>               
            }
     </div>
      <div className='item2'>
      <h1 >Control Panel </h1>
      <Button  text='Add new Class Room' onClick={toggleAddForm} /> 
      <Button  text='Add new User' onClick={toggleAddForm} /> 
      <Button  text='Add new Module' onClick={toggleAddForm} /> 
      <Button  text='Add new Lecture' onClick={toggleAddForm} /> 
      {
          showAddClassForm && 
              <LectureForm onCancel={cancelAddForm}  onSubmit={handleAddSubmit}/>
      }
      </div>
  </div>

  )
}
export default Lectures;