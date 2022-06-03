import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import { useState } from "react";


import { useNavigate } from "react-router-dom";

// type Props = {
//     navigate:any
// }

const Home=() => {
    const [number, setNumber]:any = useState("");

    const navigate = useNavigate()

    const handleNumber = (event:any) => {
        setNumber(event.target.value)
    }

    const handleSubmit = (event:any) => {
        event.preventDefault();
        setNumber('');
       navigate('/lots', {state:number})
    }
   
return (
    <div>
        
        <AppBar position='static'>
           <Toolbar sx={{backgroundColor:'white', color:'black', borderBottom:1}}>Home</Toolbar>
        </AppBar>
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>
    
            <Toolbar>
            <form action ="" onSubmit={handleSubmit}>
                <input 
                    placeholder="Enter the number of spaces"
                    type="number"
                    value={number}
                    onChange={handleNumber}
                    style={{height:'2rem', margin:'10px', width:'39vh', borderRadius:'0.5rem'}}

                    
                   
                />
                <button
                style={{height:'2.4rem', marginTop:'5px', borderRadius:'0.5rem'}}
                disabled={!number}
                
                >
                    Submit</button>
            </form>
            </Toolbar>
    </div>
        </div>
    
)
}
export default Home