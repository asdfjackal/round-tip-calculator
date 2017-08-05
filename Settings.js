import React from 'react';
import { StyleSheet, Text, TextInput, View, StatusBar, ScrollView, ToolbarAndroid, Switch} from 'react-native';
import colors from './colors.js';

export default class Main extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Settings',
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          hidden={true}
          translucent={true}
          />

        <ToolbarAndroid
          style={styles.toolbar}
          title={'Settings'}
          titleColor={colors.Text}
          />

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
  toolbar: {
    backgroundColor: colors.Dark,
    height: 56,
  },
});
