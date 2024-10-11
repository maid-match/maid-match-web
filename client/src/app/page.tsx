import Image from "next/image";
import Search from "@/app/search/page";
import Navbar from "@/app/components/navbar";
import MaidProfile from "./maidprofile/page";

export default function Home() {
  return (
    
    // <Search/>
    <MaidProfile
    first_name= "Kwame"
    last_name="Bol"
    number= "8787878787"
    email= "ilovefufu@gmail.com"
    pfp="/maid_imgs/kwame.jpg"
    city="Akra, Ghana"
    reviews= "1/5"
    services= {["full house clean", "bathroom cleaning"]}
    prices = {["90", "160"]}
    review_string_list = {["great", "wonderful"]}
    reviewer_list = {["bob", "joe"]}
    
    
    />
  );
}
