import React,{useState} from 'react'
import { Button, Grid ,TextField} from '@mui/material'
import linked from "../images/linked-in.png"
import lens from "../images/lens.png"
import ab from "../images/i.svg"
import a from "../images/e4819fd3-f23f-436e-bd93-9603988fe0e3.svg"
import m from "../images/mecyndgop5jhpg5egzn0.webp";
import home from "../images/home.png"
import message from "../images/message.png"
import network from "../images/network.png"
import profile from "../images/profile.png"
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth, googleProvider } from '../firebase/setup'
import k from "../images/ii.svg"
function Navbar ({userData}) {

  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const logout = async()=>{
    try{
      await signOut(auth,googleProvider)
      navigate("/")
    }catch(err){
      console.error(err)
    }
  }






  console.log(userData)
  return (
    <div style={{paddingTop:"10px",borderBottom:"1px solid #D6D6D6"}}>
      <Grid container>
      <Grid item xs={5}>
     
        {/* <img  style={{width:"50px",marginLeft:"80px"}}  src={m}/> */}
        <img  style={{width:"60px",marginLeft:"60px"}}  src={ab}/>
        <img style={{width:"25px",marginLeft:"20px"}} src={lens}/>

        <TextField
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search"
            variant="outlined"
            size="small"
            style={{ marginLeft: "10px" }}
          />




      </Grid>
      <Grid item xs={6}>
   <img style={{width:"25px",marginLeft:"20px"}} src={home}/>
   <Link to="/network" state={{currentUserProImg:userData._document?.data?.value.mapValue.fields.profile_image.stringValue,
           currentUserName:userData._document?.data?.value.mapValue.fields.username.stringValue}}><img style={{width:"25px",marginLeft:"60px"}} src={network}/> Network</Link>
   {/* <Link to="/network"><img style={{width:"25px",marginLeft:"60px"}} src={message}/></Link> */}
   <Link to="/network" state={{currentUserProImg:userData._document?.data?.value.mapValue.fields.profile_image.stringValue,
           currentUserName:userData._document?.data?.value.mapValue.fields.username.stringValue}}><img style={{width:"25px",marginLeft:"50px"}} src={message}/></Link>
   <img style={{width:"25px",marginLeft:"50px",borderRadius:"40px"}} src={userData._document?.data?.value.mapValue.fields.profile_image.stringValue ?? profile} />
  
      </Grid>
      </Grid>
      <Grid item xs={1}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
  <Button onClick={logout} variant="contained" size="small" sx={{color:"black",backgroundColor:"white"}}>Logout</Button>
</div>
{/* <div style={{ position: 'relative' }}>
  <Button variant="contained" size="small" sx={{color:"black",backgroundColor:"white", position: 'absolute', top: "-10px", right: 10}}>Logout</Button>
</div> */}
{/* <div style={{ position: 'relative' }}>
  <Button variant="contained" size="small" sx={{color:"black",backgroundColor:"white", position: 'absolute', top: 0, right: 0}}>Logout</Button>
</div> */}
      {/* <Button variant="contained" size="small" sx={{color:"black",backgroundColor:"white", marginLeft:"200px"}}>Logout</Button> */}
      </Grid>
    </div>
  )
}

export default Navbar
