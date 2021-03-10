import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Button,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import MapView, { Polygon, Marker, Callout } from "react-native-maps";

const Home = () => {
  const map = useRef();
  const carousel = useRef(null);

  const [coords, setCoords] = useState({});
  const [markers, setMarkers] = useState([]);
  const [hotels, setHotels] = useState([
    {
      id: 1,
      name: "test",
      latitude: 19.4243769,
      longitude: 72.811126,
      image: require("../../../assets/h1.jpg"),
      rooms: [
        { type: "delux", cost: 2600 },
        { type: "AC", cost: 2200 },
        { type: "Normal", cost: 1600 },
      ],
    },
    {
      id: 2,
      name: "best",
      latitude: 19.4252145,
      longitude: 72.812675,
      image: require("../../../assets/h2.jpg"),
      rooms: [
        { type: "delux", cost: 2600 },
        { type: "AC", cost: 2200 },
        { type: "Normal", cost: 1600 },
      ],
    },
    {
      id: 3,
      name: "rest",
      latitude: 19.4246982,
      longitude: 72.813954,
      image: require("../../../assets/h3.jpg"),
      rooms: [
        { type: "delux", cost: 2600 },
        { type: "AC", cost: 2200 },
        { type: "Normal", cost: 1600 },
      ],
    },
    {
      id: 4,
      name: "chest",
      latitude: 19.4252657,
      longitude: 72.813657,
      image: require("../../../assets/h4.jpg"),
      rooms: [
        { type: "delux", cost: 2600 },
        { type: "AC", cost: 2200 },
        { type: "Normal", cost: 1600 },
      ],
    },
  ]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCoords({ latitude, longitude });
    });
  }, []);

  const onCarouselItemChange = (index) => {
    const location = hotels[index];

    map.current.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.009,
    });
    markers[index].showCallout();
  };

  const onMarkerPress = (location, index) => {
    carousel.current.snapToItem(index);
  };

  const renderCarouselItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <Image source={item.image} style={styles.cardImage} />
      <Text style={styles.hotelName}>{item.name}</Text>
      <View style={styles.roomInfo}>
        {item.rooms.map((el, index) => (
          <Text
            key={index}
            style={{
              color: "#555",
              padding: 2,
            }}
          >
            {el.type}
          </Text>
        ))}
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          padding: 20,
          justifyContent: "space-between",
        }}
      >
        <Button title="View" />
        <Button title="Book" />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        ref={map}
        zoomEnabled={true}
        initialRegion={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.1254,
        }}
      >
        {hotels.map((hotel, index) => (
          <Marker
            onPress={() => onMarkerPress(hotel, index)}
            key={index}
            ref={(ref) => (markers[index] = ref)}
            coordinate={{
              latitude: hotel.latitude,
              longitude: hotel.longitude,
            }}
            // title={hotel.name}
          >
            <Callout>
              <Text>{hotel.name}</Text>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <Carousel
        ref={carousel}
        data={hotels}
        loop={false}
        removeClippedSubviews={false}
        containerCustomStyle={styles.carousel}
        renderItem={renderCarouselItem}
        sliderWidth={Dimensions.get("window").width}
        itemWidth={300}
        onSnapToItem={(index) => onCarouselItemChange(index)}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  carousel: {
    position: "absolute",
    bottom: 0,
    marginBottom: 10,
  },
  cardContainer: {
    borderRadius: 15,
    backgroundColor: "#fff",
    height: 300,
    width: 300,
  },
  cardImage: {
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    height: 120,
    width: 300,
  },
  hotelName: {
    fontSize: 20,
    padding: 5,
    color: "#222",
    textTransform: "uppercase",
  },
  roomInfo: {
    paddingLeft: 10,
  },
});
