import React from 'react';
import { StyleSheet, Text, TextInput, View, StatusBar, ScrollView} from 'react-native';

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      data: [],
      base: '',
      inputBorderColor: '#888'
    };

    this.updateRows = this.updateRows.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }

  updateRows() {
    const base = parseFloat(this.state.base);
    this.setState({base: base.toFixed(2)});
    if (!isNaN(base)){
      var rows = [];
      var initial = base + (base * .1);
      initial = Math.floor(initial);
      var tip = initial - base;
      var percent = tip / base;
      rows.push({initial, tip, percent});
      while(percent < .15){
        initial += 1;
        tip = initial - base;
        percent = tip / base;
        rows.push({initial, tip, percent});
      }
      this.setState({
        data: rows,
      });
    }
  }

  onChangeText(text) {
    this.setState({base: text});
  }

  render() {
    source = {borderColor: this.state.inputBorderColor};
    inputStyle = StyleSheet.flatten([styles.input, source]);
    return (
      <View style={styles.container}>
        <StatusBar
          hidden={true}
          translucent={true}
          />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Round Tip Calculator</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
          style = {inputStyle}
          editable = {true}
          keyboardType = {'numeric'}
          maxLength = {40}
          underlineColorAndroid = {'transparent'}
          selectionColor = {'#888'}
          onChangeText = {this.onChangeText}
          onSubmitEditing = {this.updateRows}
          value = {this.state.base}
          />
        </View>

        <View style= {styles.outputContainer}>
          <View style={styles.listHeader}>
            <View style = {styles.row}>
              <Text style = {styles.item}>Percent</Text>
              <Text style = {styles.item}>Tip</Text>
              <Text style = {styles.item}>Total</Text>
            </View>
          </View>
          <ScrollView style = {styles.itemList}>
          {
            this.state.data.map((item, index) =>
              <View key={index} style={styles.row}>
                <Text style = {styles.item}>{Math.round(item.percent*100)}</Text>
                <Text style = {styles.item}>{item.tip.toFixed(2)}</Text>
                <Text style = {styles.item}>{item.initial.toFixed(2)}</Text>
              </View>
            )
          }
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: '#fff',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outputContainer: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 40,
    color: '#888',
  },
  input: {
    color: '#888',
    width: '80%',
    textAlign: 'center',
    fontSize: 40,
    borderWidth: 1,
  },
  item: {
    flex: 1,
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
  },
  listHeader: {
    width: '80%',
  },
  itemList: {
    width: '80%',
    flex: 1,
    height: '100%',
  },
  row: {
    flexDirection: 'row',
  }
});
