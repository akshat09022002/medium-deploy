
import { Quote } from "../components/Quote"
import { Authfields2 } from "../components/Authfields2"
import { BlinkingLogo } from "../components/BlinkingLogo"


export const Signin = () => {
    return <div className="grid lg:grid-cols-2">

        <div className="h-screen bg-[#3aafa9]">
            <BlinkingLogo></BlinkingLogo>
            <div className="h-5/6 flex flex-col justify-center">
                <Authfields2></Authfields2>
            </div>
        </div>
        <Quote></Quote>

    </div>
}