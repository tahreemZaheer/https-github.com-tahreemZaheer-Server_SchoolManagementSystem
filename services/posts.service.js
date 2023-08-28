import axios from "axios"
const apiURL = "https://localhost:8080/"
export const getPosts = async()=>{
    try{
        let response = await axios.get(apiURL+"course");
        return response.data;
    }
    catch(e){
        console.error(e);
    }
    

};