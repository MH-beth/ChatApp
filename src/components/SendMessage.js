import { Button, TextareaAutosize, TextField } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const SendMessage = ({setFriend , setMessage, sendMessage , message , friend, allUsers}) => {
    const classes = useStyles();
    const handleSubmit = () => {
        sendMessage();
    }
    return (
        <div>
            <h1>Send A Message</h1>
            <br/>
            <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">Users</InputLabel>
        <Select
          native
          value={friend}
          onChange={e => setFriend(e.target.value)}
        >
        <option aria-label="None" value="" />
          {(allUsers.length !== 0) ? allUsers.map(user => <option value = {user.username}>{user.username}</option>) : <p>No User is currently logged in !</p>}
        </Select>
      </FormControl>
            <br/>
            <TextareaAutosize onChange = {e => setMessage(e.target.value)}/>
            <br/><br/><br/>
            {(message.length !== 0 && friend.length !== 0) ? <Button variant = "contained" color = "primary" onClick = {() => handleSubmit()}>Send</Button> : <Button variant = "contained" color = "primary" disabled>Send</Button>}
        </div>
    )
}

export default SendMessage
