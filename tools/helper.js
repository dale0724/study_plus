import {JWT_SECRET} from "../app_config";
import jwt from 'jsonwebtoken';
import useSWR from "swr";

export function generateToken(email, name, userType, expireInSeconds = 30000) {
    return jwt.sign(
        {email, name, userType},
        JWT_SECRET,
        {
            expiresIn: expireInSeconds,
        },
    );
}

export function decodeToken(token) {
    return jwt.verify(token, JWT_SECRET)
}

export function useLoggedUserData() {
    const fetcher = (...args) => fetch(...args).then((res) => {
        if (res.ok) {
            return res.json()
        } else {
            throw new Error('Fetch User Data Failed')
        }
    })
    const {data, error} = useSWR('/api/auth', fetcher);
    if(data){
        console.debug("current user email: " + data.email)
        console.debug("current user name: "+ data.name)
        console.debug("current user type: " + data.user_type)
    }
    return {
        user: data,
        isLoading: !error && !data,
        isError: error,
    }
}


export function getNow() {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
    return date + ' ' + time
}


export function getCurrentDateTimeLocal(){
    const date = new Date();
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = date.getFullYear();
    const hours = date.getHours()
    const minutes = date.getMinutes()
    return yyyy + '-' + mm + '-' + dd + 'T' + hours + ":" + minutes
}

export function getTodayFirstMinuteDateTimeLocal(){
    const date = new Date();
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = date.getFullYear();
    return yyyy + '-' + mm + '-' + dd + 'T00:00';
}

export function getTodayLastMinuteDateTimeLocal(){
    const date = new Date();
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = date.getFullYear();
    return yyyy + '-' + mm + '-' + dd + 'T23:59';
}

export function constructUrlWithParams(url, params){
        const new_url = new URL(url)
        new_url.search = new URLSearchParams(params).toString()
        return new_url.toString()
}