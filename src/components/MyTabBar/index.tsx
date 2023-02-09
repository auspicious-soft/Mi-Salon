import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Search from '../Svgs/Search';
import SearchActive from '../Svgs/SearchActive';
import Scissors from '../Svgs/Scissors';
import ScissorsActive from '../Svgs/ScissorsActive';
import AddNew from '../Svgs/AddNew';
import AddNewActive from '../Svgs/AddNewActive';
import Favourite from '../Svgs/Favourite';
import FavouriteActive from '../Svgs/FavouriteActive';
import Profile from '../Svgs/Profile';
import ProfileActive from '../Svgs/ProfileActive';
import {SafeAreaView} from 'react-native-safe-area-context';
const {width, height} = Dimensions.get('window');

function Index({state, descriptors, navigation}: any) {
  const showTabIcon = (label: String, isFocused: boolean) => {
    switch (label) {
      case 'Home':
        return isFocused ? <SearchActive /> : <Search />;
      case 'Appointments':
        return isFocused ? <ScissorsActive /> : <Scissors />;
      case 'NewAppointments':
        return isFocused ? <AddNewActive /> : <AddNew />;
      case 'Favourite':
        return isFocused ? <FavouriteActive /> : <Favourite />;
      case 'Profile':
        return isFocused ? <ProfileActive /> : <Profile />;
      default:
        return isFocused ? <SearchActive /> : <Search />;
    }
  };

  return (
    // <SafeAreaView>
    <View style={styles.tabContainer}>
      <Image
        style={styles.bottomBar}
        source={require('../../assets/images/bottom_bar.png')}
      />
      <View style={styles.iconContainer}>
        {state.routes.map((route: any, index: number) => {
          const {options} = descriptors[route.key];

          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({name: route.name, merge: true});
            }
          };
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[
                {
                  marginBottom: label == 'NewAppointments' ? 25 : 0,
                },
              ]}>
              {/* <Text style={{color: isFocused ? '#673ab7' : '#222'}}>{label}</Text> */}
              <View style={styles.icon}>{showTabIcon(label, isFocused)}</View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
    // </SafeAreaView>
  );
}

export default Index;

const styles = EStyleSheet.create({
  tabContainer: {
    backgroundColor: '#fff',
    marginBottom: Platform.OS == 'ios' ? '1rem' : 0,
  },
  bottomBar: {
    position: 'absolute',
    width: width,
    bottom: 0,
  },
  iconContainer: {
    marginHorizontal: '1rem',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    paddingHorizontal: 5,
    // textAlign: 'center',
  },
});
