import { API_url } from "../app_config";
import { fetchWrapper } from "./fetchWrapper";



var swRegistration
var isSubscribedToServer = false

export default registerServiceWorkerAndSubscribeServer
export var isSubscribedToServer

async function registerServiceWorkerAndSubscribeServer(user_email) {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/sw.js").
            then(registration => {

                console.log("Service Worker registration successful with scope: ", registration.scope);

                swRegistration = registration
                getVAPIDPublicKey().
                    then(publicKey => {
                        subscribeBrowserPushService(registration, publicKey).
                            then((token) => {

                                console.log('subscribed browser push service!');

                                subscribeServer(user_email, JSON.stringify(token))
                            })
                            .catch(function (err) {
                                console.error('Failed to subscribe browser push service! ', err);
                            });
                    })
            }, function (err) {
                console.log("Service Worker registration failed: ", err);
            }
            );

    }
}

async function getVAPIDPublicKey() {
    return fetchWrapper.get(API_url.get_VAPID_public_key).then(resPayload => {
        const data = resPayload.data
        const publicKey = data.public_key
        return publicKey
    }).catch(err => { throw err })
}

async function subscribeBrowserPushService(registration, publicKey) {
    return registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicKey
    })
}

async function unsubscribeBrowserPushService() {
    swRegistration.pushManager.getSubscription()
        .then(function (subscription) {
            if (subscription) {
                return subscription.unsubscribe();
            }
        })
        .catch(function (error) {
            console.log('Error unsubscribing', error);
        })
        .then(function () {
            console.log('User is unsubscribed.');
            isSubscribedToServer = false
        });
}

async function subscribeServer(user_email, token) {
    return fetchWrapper.post(API_url.subscribe, { user_email, token }).
        then((resData) => {
            console.log(resData.message)
            isSubscribedToServer = true
        }).catch(err => { throw err })
}

async function unsubscribeServer(user_email){
    fetchWrapper.post(API_url.unsubscribe,{user_email}).
    then((resData) => {
        console.log(resData.message)
        isSubscribedToServer = false
        unsubscribeBrowserPushService()
    }).catch(err => console.err(err))
}