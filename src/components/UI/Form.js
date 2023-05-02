import React from 'react';
import './Form.scss';
import ToolTipDecorator from '../UI/ToolTipDecorator.js';
import Action from './Actions';
import { useState } from 'react';

// Functional component that returns form element. Receives two function call backs. 
export default function  Form ({children, onSubmit, onCancel}) {
  
    // Handlers -------------------
    const handleSubmit = () => { 
      //console.log("Form handle")   
      onSubmit();
    }

    const handleCancel = () => onCancel(); 
    // View -----------------------
  return(
    <div className='form'>
      <div  className="BorderedForm">
        <div className='FormTray'>
          {
            children
          }
        </div>
            <Action.Tray>
                <ToolTipDecorator message="Submit Record">
                  <Action.Add showText onClick={handleSubmit} buttonText="Submit"/> 
                  </ToolTipDecorator>
                <ToolTipDecorator message="Cancel form">
                  <Action.Cancel showText onClick={handleCancel} buttonText='Cancel' />   
                </ToolTipDecorator>
            </Action.Tray>  
        </div>
    </div>
  );

}


 function Item ({children, label, htmlFor, advice, error}) {

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

  // Handlers -------------------
  const handleChange = (event) => {
    const {name,value} = event.target;
    const newValue = conformance.includes(name) ? parseInt(value) : value;
    setRecords({...record, [name]: newValue });
    setErrors({ ...errors, [name]: isValid[name](newValue) ? null : errorMessage[name]});
    };

const isValidRecord = (record) => {
  let isRecordValid = true;
    Object.keys(isValid).forEach((key) => {
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
      isValidRecord(record) && onSubmit(record) && onCancel();
      setErrors({...errors});
  }


  // View -----------------------
return [record,errors,handleChange,handleSubmit];
}

// Composed form object
Form.Item = Item;
Form.useForm = useForm;
