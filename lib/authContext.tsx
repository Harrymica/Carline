import { SplashScreen, useRouter } from "expo-router";
import { createContext, PropsWithChildren, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
type AuthState = {
    isLoggedIn : boolean;
    isReady:boolean;
    logIn : () => void;
    logOut : () => void;
}

SplashScreen.preventAutoHideAsync();

export const AuthContext = createContext<AuthState>({
    isLoggedIn: false,
    isReady:false,
    logIn: () => {},
    logOut: () => {},

});


export function AuthProvider({children}:PropsWithChildren){
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const router = useRouter();
   const authStorageKey = "auth-key";
   const [isReady, setIsReady] = useState(false);
   const storeAuthState = async (newState: {isLoggedIn:boolean})=>{

    try{
        const jsonValue =JSON.stringify(newState);
        await AsyncStorage.setItem(authStorageKey, jsonValue);
    }
    catch(error){
            console.log("Error saving ", error);
    }
   };
   const logIn = () =>{
    setIsLoggedIn(true);
    storeAuthState({isLoggedIn:true});
    router.replace("/");
   };

   const logOut = () =>{
    setIsLoggedIn(false);
    storeAuthState({isLoggedIn:false});
    router.replace("/onboard");
   };

   useState(()=>{
        const getAuthFromStorage = async () =>{
            await new Promise((res) => setTimeout(() => res(null), 1000));
                try{
                    const value = await AsyncStorage.getItem(authStorageKey);
                    if(value !== null){
                         const auth = JSON.parse(value);
                         setIsLoggedIn(auth.isLoggedIn);
                    }
                }
                catch(error){
                        console.log("Error fetching from storage")
                }
                setIsReady(true);
        }
        getAuthFromStorage();
   }, []);

   useState(() => {

    if(isReady){
        SplashScreen.hideAsync();
    }
   }, [isReady]);

    return(
        <AuthContext.Provider value={{isLoggedIn, isReady, logIn, logOut}}>
                {children}
        </AuthContext.Provider>
    )
}