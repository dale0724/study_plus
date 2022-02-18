import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import TimeAgo from 'javascript-time-ago'
import en_SG from 'javascript-time-ago/locale/en-SG.json'
import { useEffect } from "react"
import { fetchWrapper } from '../tools/fetchWrapper'
import { API_url } from '../app_config'
import { useLoggedUserData } from "../tools/helper";

TimeAgo.addDefaultLocale(en_SG)

function MyApp({ Component, pageProps }) {

  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
