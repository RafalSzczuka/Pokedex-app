import React, {useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {fetchList} from '../apiService';
import {berriesUrl} from '../apiService';

import {useDebounce} from '../hooks/useDebounce';
import {useAsyncStorage} from '../hooks/useAsyncStorage';
import {ListHeader} from '../components/ListHeader';
import {BerriesListItem} from '../components/BerriesListItem';

const BerriesScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [source, setSource] = useAsyncStorage('@berriesList');

  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    (async () => {
      const list = await AsyncStorage.getItem('@berriesList');

      if (list == null) {
        const response = await fetchList(berriesUrl);
        setSource(response.results);
      }
      setData(source);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshBerriesList = async () => {
    setIsRefreshing(true);
    const response = await fetchList(berriesUrl);
    await setSource(response.results);
    setData(source);
    setIsRefreshing(false);
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const filterBerries = useCallback(
    term =>
      source.filter(item =>
        item.name.toLowerCase().includes(term.toLowerCase()),
      ),
    [source],
  );

  useEffect(() => {
    if (debouncedSearchTerm) {
      const filteredBerries = filterBerries(debouncedSearchTerm);
      setData(filteredBerries);
    } else {
      setData(source);
    }
  }, [debouncedSearchTerm, source, filterBerries]);

  const barStyle = Platform.OS === 'ios' ? 'default' : 'light-content';
  const isLoading = data == null;

  return (
    <>
      <StatusBar barStyle={barStyle} backgroundColor="black" />
      <SafeAreaView style={styles.appContainer}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            onRefresh={refreshBerriesList}
            refreshing={isRefreshing}
            ListHeaderComponent={<ListHeader onChange={setSearchTerm} />}
            data={data}
            scrollEnabled={!isRefreshing}
            keyExtractor={(item, index) => item.name + index}
            windowSize={2}
            renderItem={({item, index}) => {
              return (
                <BerriesListItem
                  isRefreshing={isRefreshing}
                  name={item.name}
                  index={index}
                  url={item.url}
                  navigation={navigation}
                />
              );
            }}
          />
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  container: {
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: '100',
  },
  itemContainer: {
    padding: 8,
  },
  disableItemContainer: {
    backgroundColor: '#eee',
  },
});

export default BerriesScreen;
