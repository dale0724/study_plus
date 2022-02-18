import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import TimeAgo from 'javascript-time-ago'
import en_SG from 'javascript-time-ago/locale/en-SG.json'
import { useEffect } from "react"

TimeAgo.addDefaultLocale(en_SG)


function MyApp({ Component, pageProps }) {

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            console.log("Service Worker registration successful with scope: ", registration.scope);
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }
  }, [])
  useEffect(()=>{
    if(Notification.permission != 'granted'){
      Notification.requestPermission(()=>{})
    }
  })
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
