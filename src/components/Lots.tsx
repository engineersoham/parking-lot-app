import {
  List,
  ListItem,
  Box,
  Table,
  Input,
  Typography,
  Button,
  Snackbar,
  CardContent,
  CardActionArea,
  Stack,

  

} from "@mui/material";
import { Modal } from "@mui/material";
import { Container } from "@mui/system";
import { render } from "@testing-library/react";
import { type } from "os";
import React, { Fragment, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { arrayBuffer } from "stream/consumers";

const Lots = () => {
  const numberOfVehicles = useLocation().state as number;
  const [allLots, setAllLots] = useState<any[]>([]);
  const [currentLot, setCurrentLot] = useState<number>(0);
  const [freeLotsList, setFreeLotsList] = useState<any>([]);
  const [tempLots, settempLots] = useState<any>([]);
  const [showSnack, setShowSnack] = useState<boolean>(false);

  const [reg, setReg] = useState<string>("");
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false);
  

  const [hrs, setHrs] = useState<number>(0);
  const [amnt, setAmnt] = useState<number>(0);

  const navigate = useNavigate();
  useEffect(() => {
    drawLots();
  }, []);

  useEffect(() => {
    setFreeLotsList(allLots.filter((lot) => lot.free));
  }, [allLots]);

  function drawLots(): void {
    for (let i = 0; i < numberOfVehicles; i++) {
      console.log("hello");
      console.log(tempLots);
      tempLots.push({
        id: i,
        reg: "",
        startTime: new Date(0, 0, 0),
        free: true,
      });
    }
    setAllLots(tempLots);
  }
  function getRandom() {
    const randomNum = Math.floor(Math.random() * freeLotsList.length);
  }

  function handleAdd(random: boolean) {
    console.log("shslksh")
    console.log(freeLotsList)
    console.log(showAddModal)
    console.log(currentLot)
    setShowAddModal(true);
    setReg("");
    if (freeLotsList.lenght > 0) {
      // if (random) {
      //   getRandom();
      // }
      if (currentLot >= 0) {
        console.log(currentLot)
        setShowAddModal(true);
      }
    } else {
      setShowSnack(true);
      setTimeout(() => {
        setShowSnack(false);
      }, 2000);
    }
    console.log(showAddModal)
  }

  function handleRemove() {
    !allLots[currentLot].free && setShowRemoveModal(true);
  }

  function calculateHrsAmt() {
    const timeDiffms = Math.abs(
      allLots[currentLot].start.getTime() - new Date().getTime()
    );
    const timeDiffHrs = Math.floor(timeDiffms / (1000 * 60 * 60));
    setHrs(timeDiffHrs);

    if (timeDiffHrs <= 2) {
      setAmnt(10);
    } else {
      setAmnt(10 + (timeDiffHrs - 2) * 10);
    }
  }

  return (
    <>
       <Container>
         <Modal
         open={showAddModal}
         onClose={()=>{
           setShowAddModal(false)
         }}
         >
         <>
           
         Add Vehicle to P{currentLot} 
           <input
            placeholder="Enter Vehicle reg. numner"
            onChange={(p:any) => {
              return setReg(p);
            }}
           />
           <Button
            disabled={reg.length == 0}
            
            onClick={()=>{
              if (reg.length) {
                setAllLots(
                  allLots.map((lot)=>{
                    return lot.id == currentLot
                      ?{
                          ...lot,
                          free: false,
                          reg: reg,
                          start: new Date(),
                      }
                      :lot;
                  })
                );
                setShowAddModal(false);
              }
            }}
          >Add</Button>
            <Button
              
              onClick={()=>{
                setShowAddModal(false);
              }}
            >Cancel</Button>
            </>
         </Modal>
       <Modal
        open={showRemoveModal}
        >
        <>
        
            <p>Pay and Remove Vehicle from P{currentLot}</p>
            <p>Total hours: {hrs}</p>
            <p>Total Amount : {amnt}</p>

            
                <Button
                  title="Remove"
                  onClick={()=>{
                    setAllLots(
                      allLots.map((lot)=>{
                        return lot.id == currentLot
                        ? {
                            ...lot,
                            free: true, 
                            reg:"",
                            start: new Date(0, 0, 0),
                        }
                        : lot;
                      })
                    );
                    setAmnt(0);
                    setHrs(0);
                    setShowRemoveModal(false);
                  }}
                />
                <Button
                  title="Cancel"
                  onClick={()=>{
                    setAmnt(0);
                    setHrs(0);
                    setShowRemoveModal(false);
                  }}
                />
              
              </>
       </Modal>
         
        <Snackbar
          open={showSnack}
          onClose={()=>setShowSnack(false)}
        >
          <p>The parking is full</p>
        </Snackbar>
         
            <List>
                  {allLots.map((item:any, idx:any)=>
                    {
                      return(
                        <ListItem 
                        onClick={() => {
                          setCurrentLot(item.id);
                          item.free ? handleAdd(true) : handleRemove();
                        }}
                        style={item.free ? {backgroundColor: 'green'} : {backgroundColor:'red'} }
                        sx={{m:2}}
                        > 
                          P{item.id}
                          {item.free ? "Free" : `Occupied by ${item.reg}`}
                          
                        </ListItem>
                      )
                    }
                  )}
            </List>

          

            
              
       </Container>
           

          
        
    </>
  )
  }


export default Lots;
