
import { Home, Heart, Gamepad2, ShoppingBag, User } from "lucide-react-native";

export const icons ={
        index: (props) => <Home name="Home" size={26}  {...props}/>,
        explore: (props) => <ShoppingBag name="Explore" size={26}  {...props}/>,
        fun_zone: (props) => <Gamepad2 name="Fun zone" size={26} {...props}/>,
        favorite: (props) => <Heart name="Favorite" size={26}  {...props}/>,
        profile: (props) => <User name="Profile" size={26}  {...props}/>
       

    }