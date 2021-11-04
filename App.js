import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { saveChallenge, getChallenges, updateChallenge, resetChallenges } from './Store';
import { v4 as uuid } from 'uuid';

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
  let bouncyCheckboxRef = null;
  const { done } = styles;
  return (
    <View style={styles.item}>
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  }
});
