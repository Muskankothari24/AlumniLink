import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Avatar, Button, List, ListItem, ListItemText, Paper } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { auth, database } from '../firebase/setup'


function Invitation() {

    const location = useLocation()

    const [user,setUser] = useState([])

    const showrequest = async()=>{
        const requestRef = doc(database,"Users",`${auth.currentUser?.uid}`)
        const requestInRef = collection(requestRef,"RequestIn")
        try{
           const data = await getDocs(requestInRef)
           const filteredData = data.docs.map((doc)=>({
               ...doc.data(),
               id:doc.id
           }))
           setUser(filteredData)
        }catch(err){
            console.log(err)
        }
    }


    const deleteReq = async(user)=>{
        const userDoc = doc(database,"Users",`${auth.currentUser?.uid}`)
        const delDocument = doc(userDoc,"RequestIn",`${user.id}`)
        try{
            await deleteDoc(delDocument)
        }catch(err){
            console.error(err)
        } 
    }



    const addConnect = async(user)=>{
        const acceptDoc = doc(database,"Users",`${user.id}`)
        const connectionDoc = doc(acceptDoc,"RequestIn",`${auth.currentUser?.uid}`)
        try{
            await setDoc(connectionDoc,{
                designation:location.state.designation,
                username:location.state.username,
                profile_image:location.state.profile_img,
              
                status:"connected"
            })
            // addConnect(user)
        }catch(err){
            console.eroor(err)
        }
    }


    const acceptReq = async(user)=>{
        const acceptDoc = doc(database,"Users",`${auth.currentUser?.uid}`)
        const connectionDoc = doc(acceptDoc,"RequestIn",`${user.id}`)
        try{
            await setDoc(connectionDoc,{
                designation:user.designation,
                username:user.username,
                profile_image:user.profile_image,
                id:user.id,
                status:"connected"
            })
            // addConnect(user)
        }catch(err){
            console.eroor(err)
        }
    }

    useEffect(()=>{
        showrequest()
      },[user])



  return (
    <div style={{padding:"20px",backgroundColor:"#F6F7F3",height:"100vh"}}>
    
    {user.filter(user => user.status === "pending").map((eachUser)=>(
       <Paper>
                    <List>
                        <ListItem>
                            <Avatar   src={eachUser.profile_image}/>
                           
                            <ListItemText   primary={eachUser.username} secondary={eachUser.designation}/>
                           
                            <Button onClick={()=>deleteReq(eachUser)}  sx={{color:"grey"}} variant="outlined" size="small">Ignore</Button>
                            
                     <Button  onClick={()=>acceptReq(eachUser)} sx={{ml:"5px"}} variant='contained' size="small">Accept</Button>
                     {/* onClick={()=>acceptReq(eachUser)} sx={{ml:"5px"}} */}
                           
                        </ListItem>
                    </List>
                </Paper>
    ))
    }
    </div>
    
  )
}

export default Invitation
