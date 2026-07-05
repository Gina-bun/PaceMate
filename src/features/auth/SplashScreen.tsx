import { Button } from "../../components/Button";
import logo from "../../assets/logo.png"




export function SplashScreen(){

    return (
       <div className="flex flex-col gap-3.5 sm:gap-5.5 h-screen items-center justify-center bg-amber-50" >
        <img src={logo} alt="PaceMate logo" className="w-55 md:w-60 lg:w-75"/>
        <div className="flex flex-col lg:flex-row md:justify-center gap-2 w-[75vw] sm:w-[50vw]">
              <Button type="button" onClick={() => {}} styles="bg-orange-400 text-amber-50 lg:w-40">
            LOGIN
        </Button>
         <Button type="button" onClick={() => {}} styles="bg-orange-400 text-amber-50 lg:w-40">
            SIGNUP
        </Button>
        </div>
       </div>
    )
}