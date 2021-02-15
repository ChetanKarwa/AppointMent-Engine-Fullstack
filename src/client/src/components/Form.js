import React from 'react'

function Form(props) {
  const [newNameForm,setNewNameForm] = React.useState(false);
  const [newName,setNewName] = React.useState("");
  return (
    <div>
      <form onSubmit = {(e) => {e.preventDefault(); 
        let name_id = -1;

        props.names.forEach(namee => {
          if(namee.name === e.target.elements[0].value)
          {
            name_id = namee.id;
          }
        });
        if(name_id>0)
        {
          props.addNewAppointment(name_id);
          props.setName("");
        }
      }}>
      <datalist id="names">
        {
          props.names.map((user,index) => (<option key = {index*1007}>{user.name}</option>))
        }
      </datalist>
      <label><strong>Name</strong></label>
      <input autoComplete="on" list="names" value = {props.name} onChange = {(e) => props.setName(e.target.value)} required/> 
      <br></br>
      <button>Submit</button>
      </form>
      <div>
          <input type = "text" placeholder="New Name" value = {newName} onChange = {(e) => {setNewName(e.target.value)}}/>
          <button onClick = {()=>{props.setNames([...props.names, newName]);props.setName(newName);setNewName("")}}>Add New Name</button>
      </div>
    </div>
  )
}

export default Form
