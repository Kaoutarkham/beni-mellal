
import React from "react";
import { TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useFavoritesStore } from "../store/favoritesStore";
import { MaterialIcons } from "@expo/vector-icons";

export default function HeartButton({ attractionId }) {
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const isFavorite = useFavoritesStore((state) =>
    state.isFavorite(attractionId)
  );

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const toggleFavorite = () => {
    if (isFavorite) removeFavorite(attractionId);
    else addFavorite(attractionId);

    scale.value = withSpring(1.5, {}, () => {
      scale.value = withSpring(1);
    });
  };

  return (
    <TouchableOpacity onPress={toggleFavorite}>
      <Animated.View style={animatedStyle}>
        <MaterialIcons
          name={isFavorite ? "favorite" : "favorite-border"}
          size={32}
          color={isFavorite ? "red" : "gray"}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}
