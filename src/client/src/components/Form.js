import React from 'react'

function Form(props) {
  // const [name,setName] = React.useState("");
  return (
    <div>
      <form>
      <h2>
        {/* Fill the details and submit to Book Appointment for {slots[editDetails.slot]} */}
      </h2>
      <label><strong>Name</strong></label>
      <input type = "text" placeholder = "John" value = {props.name} onChange = {(e)=>props.setName(e.target.value)} ></input>
      <br></br>
      <button>Submit</button>
      </form>
    </div>
  )
}

export default Form
