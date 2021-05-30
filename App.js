import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, Button, View, Platform} from 'react-native';

import IAP from 'react-native-iap';
import {Picker} from '@react-native-picker/picker';

const items = Platform.select({
  ios: [],
  android: [],
});

export default function App() {
  const [pickerValue, setPickerValue] = useState(false);
  const [purchased, setPurchased] = useState(false);

  const productId = useRef('');
  const products = useRef([]);
  const item1 = [
    '1products',
    '2products',
    '3products',
    '4products',
    '5products',
  ];
  const item2 = ['06products'];

  useEffect(() => {
    IAP.initConnection()
      .catch(() => {
        console.log('error connecting to store...');
      })
      .then(() => {
        IAP.getProducts(item1)
          .catch(err => {
            console.log(err);
            console.log('error finding items');
          })
          .then(res => {
            IAP.getProducts(item2).then(res => {
              console.log(res);
            });
            console.log(res);
            products.current = res;
            console.log(products);
          });
      });
  }, []);

  return (
    <View style={{flex: 1}}>
      <Text style={{alignSelf: 'center', marginTop: 40, fontSize: 30}}>
        Buy Online Classess
      </Text>
      <View style={styles.container}>
        <Picker
          style={styles.picker}
          selectedValue={pickerValue}
          onValueChange={itemValue => setPickerValue(itemValue)}>
          <Picker.Item label="Yoga class   149 INR" value="1products" />
          <Picker.Item label="Art class   199 INR" value="2products" />
          <Picker.Item label="Music class   249 INR" value="3products" />
          <Picker.Item label="Physio class   301 INR" value="4products" />
          <Picker.Item label="Gaming class  349 INR" value="5products" />
          <Picker.Item label="Learning class   401 INR" value="06products" />
        </Picker>

        <Button
          key={['productId']}
          title={'Purchase'}
          onPress={() => {
            console.log(['productId']);
            console.log(productId.current);
            IAP.requestPurchase(productId.current);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  picker: {
    width: 240,
    height: 40,
    backgroundColor: 'blue',
  },
});

{
}
