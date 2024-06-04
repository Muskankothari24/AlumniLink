import React ,{useState}from 'react'
import { Button, Grid, TextField } from '@mui/material'
import linkedin from "../images/linkedin.png"
import developer from "../images/developer.png"
import { signInWithPopup } from 'firebase/auth'
import { auth, database, googleProvider } from '../firebase/setup'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import ab from "../images/i.svg"
import a from "../images/e4819fd3-f23f-436e-bd93-9603988fe0e3.svg"
function Ssignin() {
  const navigate = useNavigate()


    const [username,setUsername] = useState("")
    const [designation,setDesignation] = useState("")
    const addUser = async()=>{        
const userRef = doc(database,"Users",auth.currentUser?.uid)
        // const userRef=collection(database,"Users")
        try{
            await setDoc(userRef,{
                 username:username,
                 email:auth.currentUser?.email,
                 designation:designation,
                 profile_image:auth.currentUser?.photoURL
                //  email:auth.currentUser?.email,
                //  designation:designation,
                //  profile_image:auth.currentUser?.photoURL
            })
        }catch(err){
            console.error(err)
        }
      
    }


  //   const signInwithGoogle = async()=>{
  //       !username && 
  //       toast.warning("Please enter username")
  //      try{
  //          username &&
  //        await signInWithPopup(auth,googleProvider)
  //        username &&  
  //       addUser()
  //        navigate("/main")
  //      }catch(err){
  //          console.error(err)
  //      }
  //  }

  const signInwithGoogle = async () => {
    if (!username) {
      toast.warning("Please enter username");
      return;
    }
    if (!designation) {
      toast.warning("Please enter designation");
      return;
    }
    try {
      await signInWithPopup(auth, googleProvider);
      await addUser();
      navigate("/main");
    } catch (err) {
      console.error(err);
    }
  };





   console.log(auth)
    return (
    <div>
      <Grid container>
        <Grid item xs={6} sx={{paddingLeft:"80px",paddingTop:"15px"}} >
        <ToastContainer autoClose={2000} position='top-right'/>
            {/* Authentication */}
            <img style={{width:"130px"}} src={ab}/>
         
            <h2 style={{fontWeight:"100",fontSize:"60px",color:"#B26F28"}}>Unlock Your Networking Potential</h2>
            <label style={{color:"grey",fontSize:"10px"}}>Enter username</label>
            <br/>
            <TextField  onChange={(e)=> setUsername(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}  variant="outlined" label="Username" sx={{width:"400px",mt:"5px"}}/>
            <br/>
            <label style={{color:"grey",fontSize:"10px"}}>Enter Designation</label>
            <br/>
            <TextField  onChange={(e)=> setDesignation(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}  variant="outlined" label="Designation" sx={{width:"400px",mt:"5px"}}/>
            <Button  onClick={signInwithGoogle} size='large' variant='contained' sx={{width:"400px",borderRadius:"50px",mt:"25px",height:"50px"}}>Signin</Button>
         
        </Grid>
        <Grid item xs={6}>
             {/* developer images */}
             <img style={{width:"500px"}} src={developer}/>
        </Grid>
        </Grid>
    </div>
  )
}

export default Ssignin
