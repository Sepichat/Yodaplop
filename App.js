import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function App() {
  const items = [
    {
      id: '1',
      name: 'First Item',
    },
    {
      id: '2',
      name: 'Second Item',
      isDone: true
    }
  ];
  const [theArray, setTheArray] = React.useState(items);
  const addItem = (name) => {
    onChangeText('');
    setTheArray(oldArray => [...oldArray, {id: `${oldArray.length + 1}`, name}]);
  };
  

  const [text, onChangeText] = React.useState("Some Item");
  const renderItem = ({ item }) => (
    <Item name={item.name} isDone={item.isDone} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Add Items to your todo list</Text>
        <StatusBar style="auto" />
        <TextInput 
          style={styles.input}
          value={text}
          onChangeText={onChangeText}
        />
      </View>
      <View>
        <Button 
          title="add Item"
          onPress={() => {addItem(text)}}
        >
          <Text>Hello World!</Text>
        </Button>
      </View>
      <Separator />
      <FlatList
        data={theArray}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      /> 
    </SafeAreaView>
  );
}

const Separator = () => {
  return (
    <View style={styles.separator}></View>
  )
}

const Item = (item) => {
  const [newItem, setNewItem] = React.useState(item);
  let bouncyCheckboxRef = null;
  return (
    <View style={styles.item}>
      <BouncyCheckbox
        style={{ marginTop: 16 }}
        ref={(ref) => (bouncyCheckboxRef = ref)}
        isChecked={newItem.isDone}
        text={newItem.name}
        disableBuiltInState
        onPress={() => setNewItem({...newItem, isDone: !newItem.isDone})}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight || 50,
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
    marginVertical: 8,
    marginHorizontal: 16,
  },
  separator: {
    marginVertical: 10
  },
  done: {
    textDecorationLine: 'line-through',
    color: 'red'
  }
});
