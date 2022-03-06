import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import TimeAgo from 'javascript-time-ago'
import en_SG from 'javascript-time-ago/locale/en-SG.json'
import { useEffect, useState } from "react"
import { fetchWrapper } from '../tools/fetchWrapper'
import { API_url } from '../app_config'
import { useLoggedUserData } from "../tools/helper";
import { useRouter } from 'next/router'

TimeAgo.addDefaultLocale(en_SG)

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const host = "http://localhost:3000"

  useEffect(() => {

    // on initial load - run auth check 
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false  
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    // on route change complete - run auth check 
    router.events.on('routeChangeComplete', authCheck)

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function authCheck(url) {
    const publicPaths = ['/sign_in', '/sign_up', '/test'];
    const path = url.split('?')[0];
    if (publicPaths.includes(path)) {
      setAuthorized(true);
      return
    }
    var authed_user
    try {
      authed_user = await auth()
    } catch (error) {
      authed_user = null
    }

    console.log("get user:" + authed_user)

    if (!authed_user) {
      setAuthorized(false);

      console.log("not logged in. route to sign in page")
      router.push('sign_in')
    } else {
      setAuthorized(true);
    }
  }

  async function auth() {
    return new Promise((resolve, reject) => {
      fetchWrapper.get(host+"/api/auth").then(userData => { resolve(userData) }).catch(err => reject(err))
    });
  }

  return (

    <>
      {authorized && <Component {...pageProps} />}
    </>
  )
}

export default MyApp
