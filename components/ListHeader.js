import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

export const ListHeader = props => {
  return (
    <View style={styles.viewBg}>
      <TextInput
        style={styles.searchInput}
        placeholder="search"
        onChangeText={props.onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    borderRadius: 18,
    height: 36,
    width: 343,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 20,
  },
  viewBg: {
    backgroundColor: '#e8faea',
  },
});
