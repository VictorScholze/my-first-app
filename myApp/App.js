import * as React from 'react';
import { ImageBackground, Button, StyleSheet, Text, View, TouchableOpacity  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import data from './info';
import { Transition, Transitioning } from 'react-native-reanimated';


function HomeScreen({ navigation }) {
  return (
    <ImageBackground source={require('./assets/back2.png')} style={{ flex: 5, justifyContent: 'center'}}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.titleText}>
            Olá visitante,
        </Text>
        <Text style={styles.titleText2}>
            venha me conhecer!!!!
        </Text>
        <Button
          title="Vamos lá :)"
          color="#CDA232"
          onPress={() => navigation.navigate(' ')}
        />
       
      </View>
      </ImageBackground>
  );
}

function DetailsScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = React.useState(null);
  const ref = React.useRef();
  return (
    <Transitioning.View
      ref={ref}
      transition={transition}
      style={styles.container}
    >
      <StatusBar hidden />
      {data.map(({ bg, color, category, subCategories }, index) => {
        return (
          <TouchableOpacity
            key={category}
            onPress={() => {
              ref.current.animateNextTransition();
              setCurrentIndex(index === currentIndex ? null : index);
            }}
            style={styles.cardContainer}
            activeOpacity={0.9}
          >
            <View style={[styles.card, { backgroundColor: bg }]}>
              <Text style={[styles.heading, { color }]}>{category}</Text>
              {index === currentIndex && (
                <View style={styles.subCategoriesList}>
                  {subCategories.map((subCategory) => (
                    <Text key={subCategory} style={[styles.body, { color }]}>
                      {subCategory}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </Transitioning.View>
  );
}

const Stack = createNativeStackNavigator();
const transition = (
  <Transition.Together>
    <Transition.In type='fade' durationMs={200} />
    <Transition.Change />
    <Transition.Out type='fade' durationMs={200} />
  </Transition.Together>
);


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Saudações!">
        <Stack.Screen name="Saudações!" component={HomeScreen} />
        <Stack.Screen name=" " component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 35,
    color: '#FFFFFF',
    backgroundColor: '#3D084A',
    fontWeight: 'bold',
    width: 200,
  },
  titleText2: {
    fontSize: 35,
    color: '#FFFFFF',
    backgroundColor: '#3D084A',
    fontWeight: 'bold',
    width: 200,
    marginBottom: 20,
  },
  cardContainer: {
    flexGrow: 1,
  },
  card: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 25,
    //fontWeight: '100',
    textTransform: 'uppercase',
    letterSpacing: -2,
    marginBottom: -15
  },
  body: {
    fontSize: 18,
    lineHeight: 20*1.25,
    textAlign: 'center',
  },
  subCategoriesList: {
    marginTop: 20,
  },
});

export default App;