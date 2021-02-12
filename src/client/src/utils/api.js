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

// export const addTodo = async(currentTodo, todos, setTodos) => {  
//   await fetch(URL, {
//     method: 'POST',
//     body: JSON.stringify({
//       task: currentTodo,
//       done: false
//     }),
//     headers: { 'Content-Type': 'application/json' },
//   })
//   .then(response => response.json())
//   .catch(e => console.log(e))
// }

// export const deleteTodo = async(id) => {
//   await fetch(URL+String(id), {
//     method: 'DELETE',
//     headers: { 'Content-Type': 'application/json' },
//   })
//   .then(response => response.json())
//   .catch(e => console.log(e))
// }

// export const editTodo = async(id, done,task) => {
//   await fetch(URL+String(id), {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       task: task,
//       done: done
//     }),
//   })
//   .then(response => response.json())
//   .catch(e => console.log(e))
// }