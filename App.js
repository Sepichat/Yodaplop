import React from 'react';
import { Button, FlatList, SafeAreaView, Text, TextInput, View, Modal, Pressable } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import 'react-native-get-random-values'
import { v4 as uuid } from 'uuid';

import { saveChallenge, getChallenges, updateChallenge, resetChallenges } from './Store';
import { styles } from './styles';

export default function App() {
  const [challengeList, setChallengeList] = React.useState([]);
  //resetChallenges();
  React.useEffect(() => {
    getChallenges()
      .then(challengeList => {
        setChallengeList(challengeList);
      })
      .catch(errors => console.log("error retrieving challenges during app bootstrap:", errors));
  }, []);

  const addItem = (name) => {
    onChangeText('');
    const newChallenge = {
      id: uuid(),
      name,
      isDone: false
    };
    saveChallenge(newChallenge);
    setChallengeList(oldArray => [...oldArray, newChallenge]);
  };
  

  const [text, onChangeText] = React.useState("Some Item");
  const renderItem = ({ item }) => (
    <Item item={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Add Items to your todo list</Text>
      <Separator />
      <View>
        <TextInput 
          style={styles.input}
          value={text}
          onChangeText={onChangeText}
        />
      </View>
      <View style={styles.buttonAdd}>
        <Button 
          title="add Item"
          onPress={() => {addItem(text)}}
        >
          <Text>Hello World!</Text>
        </Button>
      </View>
      <Separator />
      <FlatList
        data={challengeList}
        // data={theArray.filter(item => !item.isDone)}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      {/* <StatusBar style="auto" />
      <FlatList
        data={theArray.filter(item => item.isDone)}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      /> */}
    </SafeAreaView>
  );
}

const Separator = () => {
  return (
    <View style={styles.separator}></View>
  )
}

const Item = ({item}) => {
  const [newItem, setNewItem] = React.useState(item);
  const [modalVisible, setModalVisible] = React.useState(false);
  let bouncyCheckboxRef = null;
  const { done } = styles;
 
  return (
    <View style={styles.item}>
      <MenuModal item={item} modalVisible={modalVisible} setModalVisible={setModalVisible}></MenuModal>
      <BouncyCheckbox
        style={{ marginTop: 0 }}
        ref={(ref) => (bouncyCheckboxRef = ref)}
        isChecked={newItem.isDone}
        text={newItem.name}
        disableBuiltInState
        iconStyle={ done }
        fillColor={ 'green' }
        onPress={() => {
          const updatedItem = {...newItem, isDone: !newItem.isDone};
          updateChallenge(updatedItem);
          setNewItem(updatedItem)
        }}
        onLongPress ={() => {
          setModalVisible(true);
        }}
        delayLongPress={500}
      />
    </View>
  );
}

const MenuModal = ({item, modalVisible, setModalVisible}) => {
  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.closeModal}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>X</Text>
                </Pressable>
              </View>
              <View style={styles.descriptionModal}>
                <Text style={styles.modalText}>Menu for {item.name}</Text>
              </View>
              {/* <View style={styles.actionModal}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Delete item</Text>
                </Pressable>
              </View> */}
            </View>
          </View>
      </Modal>
  );
}
