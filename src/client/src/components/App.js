import React, {useState,useEffect} from "react";
import Calendar from 'react-calendar'
import {getTodaysDetails,getNames,addName,addAppointment} from '../utils/api'
import Form from './Form'
import 'react-calendar/dist/Calendar.css';

const convertDate = (date) => {
  var str = "";
  str+=String(date.getFullYear());
  str+="-";
  if(Number(date.getMonth())+1<10)
  str+="0";
  str+=String(date.getMonth()+1);
  str+="-";
  if(Number(date.getDate())<10)
  str+="0";
  str+=String(date.getDate());
  console.log(str);
  return str;
}



const slots = ["10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00"]
const App = () => {
  const [dates,setDates] = useState([]);
  const [names,setNames] = useState([]);
  const [name,setName] = useState([]);
  const [date,setDate] = useState(new Date());
  const [data,setData] = useState([]);
  const [editDetails,setEditDetails] = useState({mode:false, date, slot:0});
  useEffect(()=>{
    getTodaysDetails(convertDate(date),setData);
  },[date]);
  useEffect(()=>{
    addName(names);
  },[names]);
  useEffect(()=>{
    getNames(setNames);
  },[])
  useEffect(()=>{
    console.log(names);
  },[names])

  const addNewAppointment = async(name_id) => {
    let newSlots = data;
    newSlots[editDetails.slot] = name_id;
    setData(newSlots);
    setEditDetails({...editDetails,mode:false,slot:-1})
    await addAppointment(data,convertDate(date));
    await getTodaysDetails(convertDate(date),setData);
  }
  
  return (
    <div id="main">
      <Calendar onChange = {(date) => {setDate(date)}} value = {date}/>
      <div>
        Available Slots:
      </div>
      <div>
        {data.map((slot,i) => {
          if(slot==null)
          return (<button onClick = {()=> setEditDetails({...editDetails,mode:true,slot:i,date})} key = {String(i)+String(slots[i])+String(date)}>{slots[i]}</button>)
        })}
      </div>
      {
        editDetails.mode ? <div>
        <h2>
          Fill the details and submit to Book Appointment for {slots[editDetails.slot]}
        </h2>
        <Form names = {names} setNames = {setNames} name = {name} setName = {setName} addNewAppointment = {addNewAppointment}/></div> : <></>
      }
    </div>
  )
}

export default App;
