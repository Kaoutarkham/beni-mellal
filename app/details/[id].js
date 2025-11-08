import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Button,
} from "react-native";
import { useSearchParams, useRouter } from "expo-router";
import { attractions } from "../../data/attractions";
import HeartButton from "../../components/HeartButton";

export default function AttractionDetail() {
  const { id } = useSearchParams();
  const router = useRouter();
  const [attraction, setAttraction] = useState(null);

  useEffect(() => {
    const found = attractions.find((a) => a.id === id);
    setAttraction(found);
  }, [id]);

  if (!attraction)
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{attraction.title}</Text>
      <Image
        source={attraction.images[0]}
        style={styles.mainImage}
        resizeMode="cover"
      />
      <HeartButton attractionId={attraction.id} />
      <Text style={styles.description}>{attraction.description}</Text>

      <Text style={styles.galleryTitle}>Galerie</Text>
      <FlatList
        horizontal
        data={attraction.images}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={item} style={styles.galleryImage} />
        )}
      />

      <Button title="Retour" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  mainImage: { width: "100%", height: 200, borderRadius: 12, marginBottom: 8 },
  description: { fontSize: 16, marginVertical: 8 },
  galleryTitle: { fontSize: 18, fontWeight: "bold", marginTop: 16 },
  galleryImage: { width: 120, height: 120, borderRadius: 8, marginRight: 8 },
});
