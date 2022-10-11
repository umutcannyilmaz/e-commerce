import axios from "axios";

export const fetchLogin = async (input)=>{
    console.log(input)
const {data} = await axios.post("http://localhost:5000/api/auth/login",input)
return data
}

