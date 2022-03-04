import { JWT_SECRET } from "../app_config";
import jwt from 'jsonwebtoken';
import useSWR from "swr";
import Router  from "next/router";

export function generateToken(email, name, userType, expireInSeconds=30000){
    return jwt.sign(
        { email,name,userType},
        JWT_SECRET,
        {
            expiresIn: expireInSeconds, 
        },
    );
}

export function decodeToken(token){
    const decodedToken = jwt.verify(token, JWT_SECRET);
    return decodedToken
}

export function useLoggedUserData(){
    const fetcher = (...args) => fetch(...args).
    then((res) => {
        if(res.ok){
          return res.json()  
        }else{
            throw new Error('Fetch User Data Failed')
        }
    })
    const {data, error} = useSWR('/api/auth', fetcher);
    return {
    user: data,
    isLoading: !error && !data,
    isError: error,
    }
}


function getNow(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()+ ":" +today.getMilliseconds();
    var dateTime = date+' '+time;
    return dateTime
  }