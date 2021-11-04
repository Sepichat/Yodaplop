import AsyncStorage from '@react-native-async-storage/async-storage';
import { challenge } from "./consts";

const getAllData = () => {
    AsyncStorage.getAllKeys().then((keys) => {
        return AsyncStorage.multiGet(keys)
            .then((result) => {
                console.log(result);
            }).catch((e) => {
                console.log(e);
            });
    });
};

const getItem = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)
      if (value !== null) {
        return JSON.parse(value);
      }
      return [];
    } catch(e) {
      console.log("issue in getItem, retrieving key:", key);
    }
};

const getChallenges = () => {
    return getItem(challenge);
};

const resetChallenges = async () => {
    await AsyncStorage.setItem(challenge, "[]");
    console.log("RESET");
};

const saveNewItem = async (key, value) => {
    try {
        const itemList =  await getItem(key);
        itemList.push(value);
        const jsonValue = JSON.stringify(itemList);
        await AsyncStorage.setItem(key, jsonValue);
        console.log("SAVED");
    } catch (e) {
        console.log(e);
    }
};

const updateItem = async (key, item) => {
    const itemList =  await getItem(key);
    const itemIndex = itemList.findIndex(elem => elem.id === item.id);
    itemList[itemIndex] = item;
    const jsonValue = JSON.stringify(itemList);
    await AsyncStorage.setItem(key, jsonValue);
    console.log("UPDATED");
};

const updateChallenge = async (item) => {
    try {
        updateItem(challenge, item);
    } catch (e) {
        
    }
};

const saveChallenge = async (value) => {
    try {
        saveNewItem(challenge, value);
    } catch (e) {
        
    }
};

export { getChallenges, saveChallenge, updateChallenge, resetChallenges };