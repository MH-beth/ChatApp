import { Button, TextField } from '@material-ui/core';
import React from 'react'
import UsernameRegister from './components/UsernameRegister';
import io from "socket.io-client"
import SendMessage from './components/SendMessage';
const socket = io.connect('http://localhost:5000')

const App = () => {
  const [username , setUsername] =  React.useState("");
  const [usernameSet , setUsernameSet] = React.useState(false);
  const [id , setId] = React.useState("");
  const [messages , setMessages] = React.useState([]);
  const [allUsers , setAllUsers] = React.useState([]);
  const [message , setMessage] = React.useState("");
  const [friend , setFriend] = React.useState("");
  const [statue , setStatue] = React.useState("");
  React.useEffect(() => {
    socket.on("me" ,id => setId(id));
    socket.on("receiveMessage", data => setMessages(messages.concat({username : data.username , message : data.message})))
    socket.on("errorMessage", data => setStatue(data.message))
    socket.on("usersOnline", (data) => setAllUsers(data.users))
  }, [messages , username , usernameSet])

  const sendMessage = () => {
    socket.emit("sendMessage", {username : friend , message :message, from : username })
    setMessages( messages.concat({username : "You", message : message}))
  }
  console.log(allUsers);
  const addUser = () => {
    socket.emit("addUser", {username : sessionStorage.getItem("username")});
  }
  const log = () => {
    sessionStorage.setItem("username",username)
  }
  return (
    <div>
      <h1>ChatApp</h1>
      <br/>
      <div className = "usernameRegister">
        {(!usernameSet) ? <UsernameRegister username = {username} setUsername = {setUsername} setUsernameSet = {setUsernameSet} addUser = {addUser} log = {log}/> : null}
      </div>
      <div className = "message">
        <p>Session Id : {id}</p>
        {(messages.length !==0) ? messages.map(message => <p>{message.username} : {message.message}</p>) : <p>No Message Avaialble</p>}
      </div>
      <div className = "sendSection">
        {(usernameSet) ? <SendMessage setFriend = {setFriend} setMessage = {setMessage} sendMessage = {sendMessage} message = {message} friend = {friend} allUsers = {allUsers}/> : null}
      </div>
      <p>{statue}</p>
    </div>
  )
}

export default App
