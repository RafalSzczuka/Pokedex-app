import * as React from 'react';
import {View, Text, ActivityIndicator, Image, StyleSheet} from 'react-native';
import {useAsyncStorage} from '../hooks/useAsyncStorage';
import AnimatedBar from '../components/AnimatedBar';

const DetailsScreen = ({route}) => {
  const {name} = route.params;
  const [detailsSource, setDetailsSource] = useAsyncStorage(
    `@pokeDex_details_${name}`,
  );

  if (!detailsSource) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Image
        source={{
          uri: detailsSource.sprites.front_default,
        }}
        style={styles.image}
      />

      <View>
        {detailsSource?.stats.map((item, index) => (
          <View key={index} style={styles.statsContainer}>
            <View style={styles.statsText}>
              <Text>{item.stat.name.toUpperCase()}:</Text>
              <Text style={styles.statsNumber}>{item.base_stat}</Text>
            </View>
            <View style={styles.bars}>
              <AnimatedBar value={item.base_stat} index={index} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  name: {
    fontSize: 30,
    textTransform: 'capitalize',
    fontFamily: 'pokemon solid',
  },

  statsNumber: {
    fontWeight: 'bold',
    position: 'absolute',
    left: 155,
  },

  image: {
    width: 220,
    height: 220,
  },

  bars: {
    display: 'flex',
    alignItems: 'flex-end',
    position: 'absolute',
    left: 190,
  },

  statsContainer: {
    alignItems: 'center',
    width: 300,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',

    marginBottom: 4,
    marginTop: 10,
  },

  statsText: {
    marginRight: 10,
  },
});
