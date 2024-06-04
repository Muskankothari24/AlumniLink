import React, { useEffect, useState } from 'react'
import { addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore'
import { Avatar, Button, List, ListItem, ListItemText, Paper } from '@mui/material'
import { auth, database } from '../firebase/setup'
import { useLocation } from 'react-router-dom'
function Connection() {
  
    const location = useLocation()
    const [userData,setUserData] = useState([])

    const getUsers = async()=>{
        const userRef = collection(database,"Users")
        try{
           const data =  await getDocs(userRef)
           const filteredData = data.docs.map((doc)=>({
            ...doc.data(),
            id:doc.id
           }))
           setUserData(filteredData)
        }catch(err){
            console.error(err)
        }
    }



//send request show the invitation in interface
const sendRequest = async(userId)=>{
    const requestDoc = doc(database,"Users" ,`${userId}`)
   
    const connectRef = collection(requestDoc,"RequestIn")
    // ,`${auth.currentUser?.uid}`
    try{
        await addDoc(connectRef,{
            username:location.state.username,
            designation:location.state.designation,
            profile_image:location.state.profile_img,
            id:auth.currentUser?.uid,
            status:"pending"  
        })
    }catch(err){
        console.log(err)
    }
}








    useEffect(()=>{
        getUsers()
       },[])

console.log(userData)


return (
    <div style={{padding:"20px",backgroundColor:"#F6F7F3",height:"100vh"}}>
        {userData.filter(user => user.id !== auth.currentUser?.uid).map((otherUser)=>{
            return (
                <>
                <Paper>
                    <List>
                        <ListItem>
                            <Avatar src={otherUser.profile_image}/>
                            <ListItemText primary={otherUser.username} secondary={otherUser.designation}/>
                            <Button  onClick={()=>sendRequest(otherUser.id)}   variant='outlined' size="small">Connect</Button>
                           
                        </ListItem>
                    </List>
                </Paper>
                </>
               )
        })}
    </div>
  )
}
export default Connection
