import React, {useEffect, useState} from 'react';

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only';

import {fetchDetails} from '../apiService';
import {useAsyncStorage} from '../hooks/useAsyncStorage';

const AbortController = window.AbortController;

export const ListItem = props => {
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [detailsSource, setDetailsSource] = useAsyncStorage(
    `@pokeDex_details_${props.name}`,
  );
  useEffect(() => {
    (async () => {
      const controller = new AbortController();
      const signal = controller.signal;
      setIsLoading(true);
      const pokemonDetails = await AsyncStorage.getItem(
        `@pokeDex_details_${props.name}`,
      );
      if (pokemonDetails == null) {
        const response = await fetchDetails(props.url, signal);
        setDetailsSource(response);
      }
      setDetails(detailsSource);
      setIsLoading(false);

      return () => controller.abort();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailsSource]);

  const isActive = !isLoading && details != null;

  const renderDetails = () => {
    if (!isActive) {
      return <ActivityIndicator size="small" />;
    }

    return (
      <>
        <Image
          source={{
            uri: details.sprites.front_default,
          }}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.id}>#00{details.id}</Text>
        </View>
      </>
    );
  };

  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('Details', {
          name: props.name,
        })
      }
      disabled={!isActive}
      key={props.index}
      style={[
        styles.itemContainer,
        props.isRefreshing && styles.disableItemContainer,
      ]}>
      {renderDetails()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 25,
    fontWeight: '300',
    textTransform: 'capitalize',
  },
  id: {
    fontSize: 15,
    fontWeight: '100',
    color: '#444950',
  },
  itemContainer: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    position: 'relative',
  },
  disableItemContainer: {
    backgroundColor: '#eee',
  },
  image: {
    width: 85,
    height: 85,
  },
  textContainer: {
    position: 'absolute',
    left: 110,
    top: 20,
    borderLeftWidth: 1,
    borderColor: '#ccc',
    paddingLeft: 20,
  },
});
