import { BlinkingLogo } from "./BlinkingLogo"
import { IsLoggedIn } from "./IsLoggedIn"

export const Navbar=()=>{
    
    return <div className="w-full p-1 bg-[#3AAFA9] flex justify-between mb-10 fixed">
    <BlinkingLogo></BlinkingLogo>
    <div className="flex flex-col justify-center my-4 ml-4 mr-6">
        <IsLoggedIn></IsLoggedIn>
    </div>
</div>
}