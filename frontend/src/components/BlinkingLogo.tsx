import {useEffect, useState} from "react"

export const BlinkingLogo=()=>{
    const [color,setcolor]=useState("black");
    useEffect(()=>{
        const intervalId=setInterval(()=>{
                setcolor((e)=>{
        
                    return e = (color=="black" ? "white" : "black");
                })
            },1000);
        return () => clearInterval(intervalId);
        },[color])
    return <div className="h-1/6 p-7">
    <h1 className={`text-4xl text-${color} font-mono overline`}>blogster</h1>
</div>
}