import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { PlatformPressable } from '@react-navigation/elements';
import { StyleSheet } from 'react-native';
import { Home, Heart, Gamepad2, ShoppingBag, User } from "lucide-react-native";
import TabBarButton from './TabBarButton';
const TabBar = ({ state, descriptors, navigation }) => {


    const icons ={
        index: (props) => <Home name="Home" size={26} color={grayColor} {...props}/>,
        explore: (props) => <Heart name="Explore" size={26} color={grayColor} {...props}/>,
        fun_zone: (props) => <Gamepad2 name="Fun zone" size={26} color={grayColor} {...props}/>,
        favorite: (props) => <ShoppingBag name="Favorite" size={26} color={grayColor} {...props}/>,
        profile: (props) => <User name="Profile" size={26} color={grayColor} {...props}/>
       

    }
    const primColor = '#020f88';
    const grayColor = '#737373';


    
  return (

    <View  style={{display:'flex',justifyContent:'center',alignItems:'center', width:'100%'}}>
     <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return(
        <TabBarButton
             key={route.name}
            style={styles.tabbarItem}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused ? primColor : grayColor}
            label={label}
            
        />
    )

        // return (
        //   <TouchableOpacity
        //     // href={buildHref(route.name, route.params)}
        //     key={route.name}
        //     style={styles.tabbarItem}
        //     accessibilityState={isFocused ? { selected: true } : {}}
        //     accessibilityLabel={options.tabBarAccessibilityLabel}
        //     testID={options.tabBarButtonTestID}
        //     onPress={onPress}
        //     onLongPress={onLongPress}
            
        //   >{
        //         icons[route.name]({
        //             color: isFocused ? primColor : grayColor,
        //         })
        //   }
        //     <Text style={{ color: isFocused ? primColor : grayColor, fontSize:11 }}>
        //       {label}
        //     </Text>
        //   </TouchableOpacity>
        // );
      })}
    </View>

    </View>
  )
}

const styles = StyleSheet.create({
    tabbar:{
        //backgroundColor: 'black',
        position: 'absolute',
        bottom:25,
        display:'flex',
        flexDirection:'row',
        gap:20,
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor: 'white',
        marginHorizontal:20,
        paddingVertical:15,
        padding:25,
        borderRadius:50,
        borderCurve:'continuous',
        shadowColor:"black",
        shadowRadius:10,
        shadowOffset:{width:0,height:10},
        shadowOpacity:0.1 ,
        

    },
    tabbarItem:{
        flex:1,
        gap:5,
        justifyContent:"center",
        alignItems:"center",
    }
})

export default TabBar