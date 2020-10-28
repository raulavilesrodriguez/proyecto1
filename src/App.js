import React, { useState, Fragment} from 'react'
import UserTable from './tables/UserTable'
import AddUserForm from './forms/AddUserForm'
import EditUserForm from './forms/EditUserForm'

const App = () => {
  const usersData = [
    { id: 1, name: 'Are', username: 'Parra' },
    { id: 2, name: 'Chito', username: 'Vera' },
    { id: 3, name: 'Venir', username: 'Caso' },
  ]

  //valores iniciales para el formulario de edición
  const initialFormState ={id:null, name:'', username:''}

  //setear el estado
  const [users, setUsers] = useState(usersData)
  const [currentUser, setCurrentUser] = useState(initialFormState)
  const [editing, setEditing]=useState(false)

//para añadir un usuario con el formulario de adición
const addUser = (user) => {
  user.id = users.length + 1
  setUsers([...users, user])
}

//Borrar un usuario
const deleteUser =(id) => {
  setEditing(false)
  setUsers(users.filter((user)=>user.id !==id))
}

//para enviar el usuario actualizado en el formulario de edición
const updateUser = (id, updateUser) =>{
  setEditing(false)
  setUsers(users.map((user)=>(user.id==id ? updateUser : user)))
}

//para editar al usuario seleccionado en el formulario de edición
const editRow = (user) => {
  setEditing(true)
  setCurrentUser({id:user.id, name:user.name, username:user.username})
}

  return (
    <div className="container">
      <h1>Clientes</h1>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <Fragment>
              <h2>Editar Usuario</h2>
              <EditUserForm 
              setEditing ={setEditing}
              currentUser ={currentUser}
              updateUser = {updateUser}
              />
            </Fragment>
          ): (
           <Fragment> 
              <h2>Añadir Usuario</h2>
          <AddUserForm addUser={addUser}/>
          </Fragment>
          )
          } 
        </div>
        <div className="flex-large">
          <h2>Ver Usuarios</h2>
          <UserTable users={users} deleteUser={deleteUser} editRow={editRow}/>
        </div>
      </div>
    </div>
  )
}

export default App

