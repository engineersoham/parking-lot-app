import { List, ListItem, Box, Table, Input, Typography } from "@mui/material";
import { render } from "@testing-library/react";
import React, {useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { arrayBuffer } from "stream/consumers";



const VehicleDetails = () => {
    const numberOfVehicles = useLocation().state as number;
    const [allLots, setAllLots] = useState<any[]>([]);
    const [currentLot, setCurrentLot] = useState<number>(0);
    const [freeLotsList, setFreeLotsList] = useState<any>([]);
    const [tempLots, settempLots] = useState<any>([]);
    const [showSnack, setShowSnack] = useState<boolean>(false);
  
    const [reg, setReg] = useState<string>("");
    const [add, setAdd] = useState<boolean>(false);
    const [remove, setRemove] = useState<boolean>(false);
  
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
      setReg("");
      if (freeLotsList.lenght > 0) {
        if (random) {
          getRandom();
        }
        if (currentLot >= 0) {
          setAdd(true);
        }
      } else {
        setShowSnack(true);
        setTimeout(() => {
          setShowSnack(false);
        }, 2000);
      }
    }
  
    function handleRemove() {
      !allLots[currentLot].free && setRemove(true);
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

    return(
        <>
            
        </>
    )
}

export default VehicleDetails