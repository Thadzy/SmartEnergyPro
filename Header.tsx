import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function Header() {
    const styles = StyleSheet.create({
        HeaderText: {
            color: 'black',
            fontSize: 24,
            fontWeight: 'bold',
            backgroundColor: 'rgba(0, 216, 190, 0.91) 99.91%',
            borderRadius: 40,
            marginRight: 30,
            marginLeft: 30,
            paddingBottom: 20,
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
        },
        HeaderContainer: {
            paddingTop: 10,
            backgroundColor: '#19253D',

        },
        tinyLogo: {
            width: 70,
            height: 50,

        },
        linearGradient: {
            flex: 1,
            paddingLeft: 15,
            paddingRight: 15,
            borderRadius: 5
        },
        buttonText: {
            fontSize: 18,
            fontFamily: 'Gill Sans',
            textAlign: 'center',
            margin: 10,
            color: '#ffffff',
            backgroundColor: 'transparent',
        },
    });

    return (
        <View style={styles.HeaderContainer}>
            <Text style={styles.HeaderText}> <Image
                style={styles.tinyLogo}
                source={{
                    uri: 'https://s3-alpha-sig.figma.com/img/5955/9597/2c6a7b0151c1c705b097e593285fc3e7?Expires=1697414400&Signature=Iizz1ZgqvSEG8S4qiy~foRC6PRH3ozGMp70xDXAC-tZLUYheyWZqZk1Z--zNtsz8xNYkz13tH9R8lu9aa3Dhvn7FRPoGcf3ZaI9JcR-QzwSNheKer~a0EAPw2~ydj4pgnZjGreRP15oJGr5JNne81pAKr2kP1XSvuEOGMYZY5j~zyTm7w~bCFj8bK9uiXfT706yBWUz6D9YLnkRkmwHguVKVcd4L6owVqgiPMzct8etUokwmPA8df1fi5-~DCgViooORfOMt7Fuka77pL1pj4T0OFXbmqn0G6eEXAL87i22gaEReHsa8~Hg3QMHb2J74xsB06vIW-l5GAjxt8O47xQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
                }}
            /> SMART ENERGY PRO</Text>
        </View>
    );
}

export default Header;
