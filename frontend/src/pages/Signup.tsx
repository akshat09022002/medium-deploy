import { Authfields } from "../components/Authfields"
import { Quote } from "../components/Quote"
import { BlinkingLogo } from "../components/BlinkingLogo"


export const Signup = () => {
    return <div className="grid lg:grid-cols-2">

        <div className="h-screen bg-[#3aafa9]">
            <BlinkingLogo></BlinkingLogo>
            <div className="h-5/6 flex flex-col justify-center">
                <Authfields></Authfields>
            </div>
        </div>
        <Quote></Quote>

    </div>
}