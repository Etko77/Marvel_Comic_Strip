import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
} from 'react-native';
import { marvelApi, MarvelComic } from '../services/marvelApi';


const { width, height } = Dimensions.get('window');
const PAGE_SIZE = 20;

export default function ComicViewer() {
  const [comics, setComics] = useState<MarvelComic[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalComics, setTotalComics] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    loadInitialComics();
  }, []);

  const loadInitialComics = async () => {
    setLoading(true);
    try {
      // prevent infinite loading
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );
      
      const comicsPromise = marvelApi.getComics(10000);
      const { comics: fetchedComics, total } = await Promise.race([comicsPromise, timeoutPromise]) as { comics: MarvelComic[], total: number };
      
      setComics(fetchedComics);
      setTotalComics(total);
      setCurrentIndex(0);
      setOffset(fetchedComics.length);
    } catch (error) {
      console.error('Error loading initial comics:', error);
      Alert.alert('Error', 'Failed to load comics. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadRandomComic = async () => {
    setLoading(true);
    try {
      // Add a timeout to prevent infinite loading
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );
      
      // Get a random offset to start from
      const { total } = await marvelApi.getComics(0, 1);
      const randomOffset = Math.floor(Math.random() * total);
      
      // Load comics starting from the random offset
      const { comics: randomComics } = await marvelApi.getComics(randomOffset, PAGE_SIZE);
      
      if (randomComics.length > 0) {
        setComics(randomComics);
        setCurrentIndex(0);
        setTotalComics(total);
      } else {
        Alert.alert('Error', 'Could not find any comics at that position.');
      }
    } catch (error) {
      console.error('Error loading random comics:', error);
      Alert.alert('Error', 'Failed to load random comics. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < comics.length) {
      setCurrentIndex(nextIndex);
    } else if (offset < totalComics) {
      setLoadingMore(true);
      const { comics: newComics, total } = await marvelApi.getComics(offset);
      setComics([...comics, ...newComics]);
      setTotalComics(total);
      setCurrentIndex(nextIndex);
      setOffset(offset + newComics.length);
      setLoadingMore(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        
        <Text style={styles.loadingText}>Loading Marvel Comics...</Text>
        <ActivityIndicator size="large" color="#ec1d24" />
      </View>
    );
  }

  const currentComic = comics[currentIndex];

  if (!currentComic) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No comics found.</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadInitialComics}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const getImagePath = (comic: MarvelComic) => `${comic.thumbnail.path}.${comic.thumbnail.extension}`;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <Text style={styles.title}>{currentComic.title}</Text>
        <Image
          source={{ uri: getImagePath(currentComic) }}
          style={styles.comicImage}
          resizeMode="contain"
        />
        <Text style={styles.description}>{currentComic.description || 'No description available.'}</Text>
      </ScrollView>
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[styles.navButton, currentIndex <= 0 && styles.disabledButton]}
          onPress={handlePrevious}
          disabled={currentIndex <= 0}
        >
          <Text style={styles.navButtonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={loadRandomComic}>
          <Text style={styles.navButtonText}>Random</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, currentIndex >= comics.length - 1 && styles.disabledButton]}
          onPress={handleNext}
          disabled={currentIndex >= comics.length - 1}
        >
          <Text style={styles.navButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
      {loadingMore && <ActivityIndicator style={styles.loadingMore} color="#ec1d24" />}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2F4F4F	",
        paddingTop: 40,
        paddingBottom: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    loadingText: {
        marginTop: 20,
        fontSize: 18,
        color: '#fff',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    errorText: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 20,
    },
    retryButton: {
        backgroundColor: '#ec1d24',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 5,
    },
    retryButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    scrollContentContainer: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
        color: '#fff',
        paddingHorizontal: 15,
    },
    comicImage: {
        width: width - 40,
        height: height * 0.6,
        borderRadius: 10,
        marginVertical: 15,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        color: '#ccc',
        paddingHorizontal: 20,
        fontStyle: 'italic',
        fontFamily: 'Roboto-Regular',
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#333',
    },
    navButton: {
        backgroundColor: '#ec1d24',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
        minWidth: 100,
        alignItems: 'center',
    },
    navButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    disabledButton: {
        backgroundColor: '#555',
    },
    loadingMore: {
        position: 'absolute',
        bottom: 80,
        alignSelf: 'center'
    }
}); 