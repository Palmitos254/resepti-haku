import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, FlatList, Image } from 'react-native';

export default function App() {

  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);

  const fetchRespeti = () => {
    fetch("https://www.themealdb.com/api/json/v1/1/filter.php?i=" + keyword)
    .then(response => response.json())
    .then(data => setData(data.meals))
    .catch(err => Alert.alert("Error", err))
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => 
          <View style={{margin: 10}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{item.strMeal}</Text>
            <Image
              style={{width:200, height:200}}
              source={{uri: item.strMealThumb}}
            />
          </View>
        }
        ItemSeparatorComponent={listSeparator}
      />
      <TextInput
        style={{fontSize: 18, width: 200}}
        placeholder='Keyword'
        onChangeText={text => setKeyword(text)}
      />
      <Button title='FIND' onPress={fetchRespeti} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
