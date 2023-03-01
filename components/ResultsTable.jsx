import { useState, useEffect } from 'react';

function ResultsTable() {
    const [drawTimes, setDrawTimes] = useState([]);
    const [results, setResults] = useState([]);

    useEffect(() => {
        const now = new Date();
        const currentMinutes = now.getMinutes();
        const nearestMultipleOfOne = Math.floor(currentMinutes / 1) * 1;
        const startDrawTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), nearestMultipleOfOne, 0);
        const drawTimes = Array(5).fill().map((_, index) => {
            const drawTime = new Date(startDrawTime.getTime() - index * 1 * 60 * 1000);
            return drawTime.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        });

        setDrawTimes(drawTimes);


        const intervalId = setInterval(() => {
            // Fetch the winning numbers for each draw time
            Promise.all(drawTimes.map(drawTime => (
                fetch(`/api/getPrior?drawTime=${drawTime}`).then(res => res.json())
            ))).then(results => {
                setResults(results.map(result => result.couponNum));
            });

        }, 1000);

        return () => clearInterval(intervalId);
    }, [results]);

   

    return (
        <div className=' bg-red-500 w-[3%] lg:w-[24%]'>
        <div className="flex flex-col  ">
            <div className=" flex flex-row">
            {drawTimes.map((drawTime, index) => (
        <div key={drawTime}  className="lg:w-[20%] w-[3%] text-white font-bold lg:text-2xl px-4 py-2 border-2 border-white -300">
        {results[index-1]}
        </div>
        ))}
      </div>
      <div className="flex flex-row text-white font-bold lg:text-2xl">
        <div className="lg:w-[20%] w-[3%] px-4 py-2 border-2 border-white -300">1x</div>
        <div className="lg:w-[20%] w-[3%] px-4 py-2 border-2 border-white -300">1x</div>
        <div className="lg:w-[20%] w-[3%] px-4 py-2 border-2 border-white -300">1x</div>
        <div className="lg:w-[20%] w-[3%] px-4 py-2 border-2 border-white -300">1x</div>
        <div className="lg:w-[20%] w-[3%] px-4 py-2 border-2 border-white -300">1x</div>
        </div>
        </div>
        </div>
    );
}

export default ResultsTable;
