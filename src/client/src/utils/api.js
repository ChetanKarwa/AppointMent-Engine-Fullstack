const URL = '/api/events/';

export const getTodaysDetails = async(date,setData) => {
  await fetch(URL+`${date}`, {
    method: 'GET',
    type: 'cors',
    headers: { 'Content-Type': 'application/json' },
  }).then(response => response.json())
    .then((result) => {
        if(result[0])
        setData(Object.values(result[0]).slice(2,16))
        else
        setData([null,null,null,null,null,null,null,null,null,null,null,null,null,null])
      }
    )
}

export const getNames = async(setNames) => {
  await fetch(`/api/names`, {
    method: 'GET',
    type: 'cors',
    headers: { 'Content-Type': 'application/json' },
  }).then(response => response.json())
    .then((result) => {
        setNames(result);
      }
    )
}
export const addName = async(names) => {
  await fetch(`/api/names`, {
    method: 'POST',
    type: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body : JSON.stringify({name : names[names.length -1]})
  }).then(response => response.json())
    .then((result) => {
        console.log(result);
      }
    )
}

export const addAppointment = async(slots,date) => {
  await fetch(`/api/events/${date}`, {
    method: 'POST',
    type: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body : JSON.stringify({slots})
  }).then(response => response.json())
    .then((result) => {
        console.log(result);
      }
    )
}