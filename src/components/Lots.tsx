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
  AppBar,
  Toolbar,
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Modal } from "@mui/material";
import { Container } from "@mui/system";
import { render } from "@testing-library/react";
import { type } from "os";
import React, { Fragment, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { arrayBuffer } from "stream/consumers";
import ArrowBack from "@mui/icons-material/ArrowBack";

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
   
  useEffect(()=>{
    showRemoveModal && 
    calculateHrsAmt()
  },[showRemoveModal]);

  useEffect(() => {
    setFreeLotsList(allLots.filter((lot) => lot.free));
  }, [allLots]);

  function drawLots(): void {
    if (allLots.length < numberOfVehicles) {
      for (let i = 1; i < numberOfVehicles; i++) {
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
  }
  function getRandom() {
    const randomNum = Math.floor(Math.random() * freeLotsList.length);
  }

  function handleAdd(random: boolean) {
    console.log("shslksh");
    console.log(freeLotsList);
    console.log(showAddModal);
    console.log(currentLot);
    setShowAddModal(true);
    setReg("");
    if (freeLotsList.lenght > 0) {
      // if (random) {
      //   getRandom();
      // }
      if (currentLot >= 0) {
        console.log(currentLot);
        setShowAddModal(true);
      }
    } else {
      setShowSnack(true);
      setTimeout(() => {
        setShowSnack(false);
      }, 2000);
    }
    console.log(showAddModal);
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
      <AppBar
        position="static"
        sx={{backgroundColor:'white', color:'black', borderBottom:1}}
      >
        <div style={{display:'flex'}}>
        <Button
        onClick={()=>navigate('/')}
      ><ArrowBackIcon 
      sx={{color:'black', }}/></Button>
        <Typography>Lots</Typography>
        </div>
      </AppBar>
      <Container>
        <Modal
          sx={{
            backgroundColor: "white",
            width: "30vw",
            height: "40vh",
            m: "100px auto",
          }}
          open={showAddModal}
          onClose={() => {
            setShowAddModal(false);
          }}
        >
          <>
            <Typography variant="h5"> Add Vehicle to P{currentLot}</Typography>
            <input
              placeholder="Enter Vehicle reg. numner"
              onChange={(e: any) => setReg(e.target.value)}
            />
            <br />
            <Button
              sx={{ m: 2 }}
              disabled={reg.length == 0}
              onClick={() => {
                if (reg.length) {
                  setAllLots(
                    allLots.map((lot) => {
                      return lot.id == currentLot
                        ? {
                            ...lot,
                            free: false,
                            reg: reg,
                            start: new Date(),
                          }
                        : lot;
                    })
                  );
                  setShowAddModal(false);
                }
              }}
              variant="contained"
            >
              Add
            </Button>
            <Button
              sx={{ m: 2, backgroundColor: "yellow", color: "black" }}
              onClick={() => {
                setShowAddModal(false);
              }}
              variant="contained"
            >
              Cancel
            </Button>
          </>
        </Modal>
        <Modal
          
          open={showRemoveModal}
          onClose={() => setShowRemoveModal(false)}
          sx={{
            backgroundColor: "white",
            width: "30vw",
            height: "40vh",
            m: "100px auto",
          }}
        >
          <>
            <p>Pay and Remove Vehicle from P{currentLot}</p>
            <p>Total hours: {hrs}</p>
            <p>Total Amount : {amnt}</p>

            <Button
              sx={{ m: 2, backgroundColor: "red" }}
              onClick={() => {
                setAllLots(
                  allLots.map((lot) => {
                    return lot.id == currentLot
                      ? {
                          ...lot,
                          free: true,
                          reg: "",
                          start: new Date(0, 0, 0),
                        }
                      : lot;
                  })
                );
                setAmnt(0);
                setHrs(0);
                setShowRemoveModal(false);
              }}
              variant="contained"
            >
              Remove
            </Button>
            <Button
              sx={{ m: 2, backgroundColor: "yellow", color: "black" }}
              onClick={() => {
                setAmnt(0);
                setHrs(0);
                setShowRemoveModal(false);
              }}
              variant="contained"
            >
              Cancel
            </Button>
          </>
        </Modal>

        <Snackbar open={showSnack} onClose={() => setShowSnack(false)}>
          <p>The parking is full</p>
        </Snackbar>

        {/* <Typography variant="h5">Select Slots to enter vahicles</Typography> */}
        
        <List>
          {allLots.map((item: any, idx: any) => {
            return (
              <ListItem
                onClick={() => {
                  setCurrentLot(item.id);
                  item.free ? handleAdd(true) : handleRemove();
                }}
                style={
                  item.free
                    ? { backgroundColor: "green" }
                    : { backgroundColor: "red" }
                }
                sx={{ m: 2 }}
              >
                P{item.id}<br></br>
                {item.free ? "Free" : `Occupied by ${item.reg}`}
              </ListItem>
            );
          })}
        </List>
      </Container>
    </>
  );
};

export default Lots;