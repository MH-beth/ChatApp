import React from 'react'
import { Button, TextField } from '@material-ui/core';

const UsernameRegister = ({username , setUsername , setUsernameSet, addUser, log}) => {
    const handleSubmit = () => {
        setUsernameSet(true);
        log();  
        addUser();
    }
    if(sessionStorage.getItem("username") ===null){
        return (
            <div>
            <h1>ChatApp</h1>
            <br/>
            <TextField id = "standart-basic" label = "Username" onChange = {(e) => setUsername(e.target.value)}/>
            {(username.length !== 0) ? <Button variant = "contained" color = "primary" onClick = {() => handleSubmit()}>Sign Up </Button> : <Button variant = "contained" color = "primary" disabled>Sign Up</Button>}
            
            </div>
        )
    }else{
        setUsername(sessionStorage.getItem("username"));
        setUsernameSet(true);
        addUser()
        return(
            <div>
                <h1>ChatAPP</h1>
            </div>
        )
    }
}

export default UsernameRegister
