import React, {useState} from "react";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
const App = () => {
  const [date,setDate] = useState(new Date());
  return (
    <div id="main">
      <Calendar onChange = {(date) => {setDate(date); console.log(date)}} value = {date}/>
      <div>
        
      </div>
    </div>

  )
}

export default App;
