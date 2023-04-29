import { Image, StyleSheet } from 'react-native'

const RenderFooterIcon = (props) => {

    if(props.tabName === "browse" && props.active === "browse") {
        return(<Image resizeMode='contain' style={styles.footerIcon} source={require('../assets/active-browse-icon.png')}/>)
    }

    if(props.tabName === "browse" && props.active === "favorites") {
       return(<Image resizeMode='contain' style={styles.footerIcon} source={require('../assets/inactive-browse-icon.png')}/>)
    }

    if(props.tabName === "favorites" && props.active === "favorites") {
        return(<Image resizeMode='contain' style={styles.footerIcon} source={require('../assets/active-favorites-icon.png')}/>)
    }

    if(props.tabName === "favorites" && props.active === "browse") {
        return(<Image resizeMode='contain' style={styles.footerIcon} source={require('../assets/inactive-favorites-icon.png')}/>)
    }
}

const styles = StyleSheet.create({
    footerIcon: {
        height: "50%",
        marginBottom: 5    
    }
})

export default RenderFooterIcon