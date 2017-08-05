import React from 'react';
import { StyleSheet, Text, TextInput, View, StatusBar, ScrollView, ToolbarAndroid} from 'react-native';
import colors from './colors.js';

export default class Main extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Calculator',
  };

  constructor(props){
    super(props);
    this.state = {
      data: [],
      base: '',
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
    return (
      <View style={styles.container}>
        <StatusBar
          hidden={true}
          translucent={true}
          />

        <ToolbarAndroid
          style={styles.toolbar}
          title={'Round Tip Calculator'}
          titleColor={colors.Text}
          />

        <View style={styles.inputContainer}>
          <TextInput
          style = {styles.input}
          editable = {true}
          keyboardType = {'numeric'}
          maxLength = {40}
          underlineColorAndroid = {'transparent'}
          selectionColor = {colors.Text}
          onChangeText = {this.onChangeText}
          onSubmitEditing = {this.updateRows}
          value = {this.state.base}
          placeholder = {'Bill Amount'}
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
    backgroundColor: colors.Primary,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.Dark,
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
  toolbar: {
    backgroundColor: colors.Dark,
    height: 56,
  },
  title: {
    fontSize: 40,
    color: colors.Text,
  },
  input: {
    color: colors.Text,
    width: '80%',
    textAlign: 'center',
    fontSize: 40,
    borderWidth: 1,
    borderColor: colors.Text,
  },
  item: {
    flex: 1,
    fontSize: 20,
    color: colors.Text,
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
