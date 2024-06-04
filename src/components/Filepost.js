import React, { forwardRef, useEffect, useRef, useState } from 'react'
import Modal from 'react-modal';
import { Button, TextField } from '@mui/material';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { auth, database } from '../firebase/setup';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'grey',
    },
};
function Filepost(props,ref) {
   
    const fileRef=useRef(null)

    const [file,setFile] = useState([])

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
  
    function openModal() {
        setTimeout(()=>{
            fileRef.current.click()
        },1000)
       
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
    }
  
    function closeModal() {
      setIsOpen(false);
    }
      
   
    const [userData,setUserData] = useState([])

    const getUser = ()=>{
        setTimeout(async()=>{
          try{
            const userDocument = doc(database,"Users",`${auth.currentUser?.uid}`)
            const data = await getDoc(userDocument)
            setUserData(data)
          }catch(err){
            console.log(err)
          }
        },1000)
        
      }

      useEffect(()=>{
       getUser()
      },[])

   

   


    
    const addPost = async () => {
      // const postDocument = doc(database,`User-${auth.currentUser?.uid}`, `${auth.currentUser?.uid}`)
      const postDocument = doc(database,"Users", `${auth.currentUser?.uid}`)
      const postRef = doc(postDocument, "Posts",`${Math.random()}`)
      try {
          await setDoc(postRef,{
            username:userData._document?.data?.value.mapValue.fields.username.stringValue,
            designation:userData._document?.data?.value.mapValue.fields.designation.stringValue,
            profile_image:userData._document?.data?.value.mapValue.fields.profile_image.stringValue,
              filePost:file
          })
          setFile([])
      } catch (err) {
          console.error(err)
      }
  }



      
        return (
            <div>
            {/* this button is invoked when we clivked the textfield in middle section*/}
            <button ref={ref} onClick={openModal} style={{ display: "none" }}>Open Modal</button>
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
>
           <Button onClick={()=>  fileRef.current.click()} sx={{borderRadius:"30px"}} variant='contained'>Upload from computer</Button>
           <h3 style={{fontWeight:"500"}}>Select files here</h3>
              <h6>Share your images or videos</h6>

              <input onChange={(e)=> setFile(URL.createObjectURL(e.target.files[0]))}    style={{display:"none"}}  type='file' accept='image/*,video/*'  ref={fileRef} />
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{color:"black"}}></h2>
                 <img style={{width:"100px"}} src={file}/>
               <br></br>
                <Button sx={{ mt: "10px" }} variant='outlined' size='small' onClick={closeModal}>Cancel</Button>
                <Button sx={{ ml: "10px", mt: "10px" }} variant='contained' size='small' onClick={addPost}>Done</Button>
                
              </Modal>
            </div>
          );
}
///give forward because in middle when clicked in textfield post should be invoked
export default forwardRef(Filepost)
