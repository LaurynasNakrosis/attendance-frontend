import React from 'react';

import './Form.scss';
import ToolTipDecorator from '../UI/ToolTipDecorator.js';
import { ActionAdd, ActionCancel, ActionTray} from '../UI/Actions.js';
import { useState } from 'react';

// Functional component that returns form element. Receives two function call backs. 
export default function  Form ({children, onSubmit, onCancel}) {
    // Initialisation -------------
    // Hooks ----------------------
    // State ----------------------
    // Context --------------------
    // Handlers -------------------
    const handleSubmit = () => { 
      console.log("Form handle")   
      onSubmit();
    }

    const handleCancel = () => onCancel(); 
    // View -----------------------
  return(
  <div  className="BorderedForm">
    <div className='FormTray'>
      {
        children
      }
    </div>
      <ActionTray>
          <ToolTipDecorator message="Submit Record">
            <ActionAdd showText onClick={handleSubmit} buttonText="Submit"/> 
            </ToolTipDecorator>
          <ToolTipDecorator message="Cancel form">
            <ActionCancel showText onClick={handleCancel} buttonText='Cancel' />   
          </ToolTipDecorator>
      </ActionTray>  
  </div>
  );
}


 function Item ({children, label, htmlFor, advice, error}) {
    // Initialisation -------------
    // Hooks ----------------------
    // State ----------------------
    // Context --------------------
    // Handlers -------------------
    // View -----------------------

  return (
    <div className="FormItem">
        <label className="FormLabel" htmlFor={htmlFor}>{label}</label>
        {advice && <p className="FormAdvice">{advice}</p>}
        {children}
        {error && <p className="FormError">{error}</p>}
    </div>
  );
}

function useForm (initialRecord,conformance,{isValid,errorMessage},onCancel, onSubmit) {
  // Initialisation -------------
  // State ----------------------
  const [record, setRecords] = useState(initialRecord);
  const [errors, setErrors] = useState(
      Object.keys(initialRecord).reduce((accum, key) => ({ ...accum, [key]: null }), {})
      );
  // Context --------------------

  // Handlers -------------------
  const handleChange = (event) => {
    const {name,value} = event.target;
    const newValue = conformance.includes(name) ? parseInt(value) : value;
    setRecords({...record, [name]: newValue });
    setErrors({ ...errors, [name]: isValid[name](newValue) ? null : errorMessage[name]});
    };

    const isValidRecord = (record) => {
      console.log(" is valid")
      let isRecordValid = true;
      Object.keys(record).forEach((key) => {
          if (isValid[key](record[key])){
              errors[key] = null;
          }else{
              errors[key] = errorMessage[key];
              isRecordValid = false;
          }
      });
      return isRecordValid; 
  }
  const handleSubmit = (event) => {
    console.log("handleSubmit 2000")
      //event.preventDefault();
      console.log("handleSubmit 3000")
      isValidRecord(record) && onSubmit(record) && onCancel();
      setErrors({...errors});
  }


  // View -----------------------
return [record,errors,handleChange,handleSubmit];
}

// Composed form object
Form.Item = Item;
Form.useForm = useForm;