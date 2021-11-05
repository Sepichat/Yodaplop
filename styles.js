
import { StyleSheet } from "react-native";
import { StatusBar } from 'expo-status-bar';

export const styles = StyleSheet.create({
    title: {
      fontSize: 24,
      fontWeight: '700'
    },
    container: {
      paddingTop: StatusBar.currentHeight || 70,
      flex: 1,
      backgroundColor: '#aaa',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      height: 40,
      width: 200,
      borderColor: 'black',
      borderWidth: 1,
      color: 'red'
    },
    item: {
      alignItems: 'flex-start',
      justifyContent: 'center',
      marginHorizontal: 16,
      marginVertical: 4
    },
    done: {
      borderColor: "red"
    },
    pending: {
      borderColor: "green"
    },
    separator: {
      marginVertical: 10
    },
    done: {
      textDecorationLine: 'line-through',
      color: 'red'
    },
    buttonAdd: {
      marginTop: 20
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 5,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      flexDirection: "column",
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    closeModal: {
        padding: 5,
        alignItems: "flex-end",
        // position: "absolute",
        // top: 5,
        // right: 5
    },
    descriptionModal :{
        padding: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
      width: "30%"
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });
  