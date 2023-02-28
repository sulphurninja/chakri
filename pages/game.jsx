import HeaderText from '@/components/HeaderText';
import { DataContext } from '@/store/GlobalState';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import HandleResults from '../components/HandleResults';
import Wheel from '../components/Wheel'
import axios from 'axios';
import Timer from '../components/Timer'
import Timerleft from '../components/Timerleft'

function game() {
  const { state, dispatch } = useContext(DataContext)
  const { auth } = state
  const router = useRouter()
  const [time, setTime] = useState(new Date());
  const [couponNum, setCouponNum] = useState(1);
  const [mustSpin, setMustSpin] = useState(false);
  const [open, setOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [message, setMessage] = useState('')


  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const nextToDraw = new Date(
    time.getFullYear(),
    time.getMonth(),
    time.getDate(),
    time.getHours(),
    time.getMinutes() + 1,
    0,
    0
  );

  const timeDiff = Math.floor((nextToDraw - time) / 1000);
  const seconds = timeDiff % 60;
  const timeToDraw = `${seconds.toString().padStart(2, "0")}`;
  const nextToDrawtime = nextToDraw.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // useEffect(() => {

  //     const fetchWinningNumber = async () => {
  //       try {
  //         const response = await axios.get(`/api/getWinningNumber/?drawTime=${nextToDrawtime}`);
  //         setCouponNum(response.data.couponNum);
  //       } catch (err) {
  //         console.log('Error fetching winning number:', err);
  //       }
  //     };
  //     fetchWinningNumber();
  //     console.log(winningNumber)
  //   }
  // );


  useEffect(() => {
    const fetchWinningNumber = async () => {
      if (timeToDraw <= 30) { // Only fetch data when there are 5 seconds or less until the next draw
        try {
          const response = await axios.get(`/api/getWinningNumber/?drawTime=${nextToDrawtime}`);
          setCouponNum(response.data.couponNum);
          console.log(response.data.couponNum, 'this is fetched result');
        } catch (err) {
          console.log('Error fetching winning number:', err);
        }
      }
    };

    const timer = setInterval(() => {
      fetchWinningNumber();
    }, 1000);

    return () => clearInterval(timer);
  }, [nextToDrawtime, timeToDraw]);

  const handleChange = () => {

    if (!spinning) {
      setSpinning(true);
      console.log(couponNum, 'this is client side result');
      setMustSpin(true);
    }


  };
  function run() {
    if (timeToDraw == 0) {
      handleChange()
    }
  }
  run();

  
  return (
    <body className=' overflow-hidden  '>
      <video src='/video.mp4' className='absolute  w-screen' autoPlay={true} muted loop />
      <div className='h-screen w-screen absolute opacity-95 bg-black'>
      </div>
      <div className='absolute w-full mt-[3%]'>
        <HeaderText />
      </div>
      <div className='h-screen mt-[10%] w-screen absolute'>
        <Head>
          <title>Chakri - Game</title>
        </Head>

        <div className='flex w-full absolute'>
          <Timer />
          <div className='ml-[0%] w-full '>
            <Timerleft />
          </div>
        </div>
        <div className='wheelcontainer w-[30%] h-[33vw] relative top-[5px] left-[35.8%] object-contain'>
          {/* madhale circle kaate */}
          <img
            src="https://res.cloudinary.com/dxcer6hbg/image/upload/v1675103735/uxo6d30fdtolymvu27kt.png"
            alt="button"

            onClick={() => handleChange()}
            style={{
              cursor: "pointer",
              position: "absolute",
              width: "33%",
              height: "33%",
              left: "33%",
              top: "33%",
              margin: "0 auto",

              zIndex: 3
            }}
          />
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={couponNum}
            onClick={() => handleChange()}
            onStopSpinning={() => {
              setSpinning(false);
              setMustSpin(false);

            }}
          />
          {/** bahercha circle */}
          <img src='https://res.cloudinary.com/dxcer6hbg/image/upload/v1675103737/lbxnxhwmktwln0fgowwv.png'
            style={{
              width: "100%",
              height: "100%",
              left: "0%",
              top: "-3%",


              position: "absolute",

            }} />
        </div>
        <div style={{
          width: "100px",
          height: "100px",
          left: "1000px",
          top: "290px",
          position: "fixed",

        }}>


        </div>
      </div>
    </body>
  )
}

export default game
