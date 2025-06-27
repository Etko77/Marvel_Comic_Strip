import CryptoJS from 'crypto-js';

const MARVEL_API_BASE_URL = 'https://gateway.marvel.com/v1/public';
const PUBLIC_KEY = 'd1ee0074f8b4871f6c4f9f6df5d3208a';
const PRIVATE_KEY = '94c1022c5a53d1a606b2dad2f6ed542775f70720';

const getAuthParams = () => {
  const ts = new Date().getTime().toString();
  const hash = CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
  return `ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;
};

export interface MarvelCharacter {
  id: number;
  name: string;
  comics: {
    available: number;
  };
}

export interface MarvelComic {
  id: number;
  title: string;
  description: string;
  issueNumber: number;
  thumbnail: {
    path: string;
    extension: string;
  };
}

interface CharacterApiResponse {
  data: {
    results: MarvelCharacter[];
    total: number;
  };
}

interface ComicApiResponse {
  data: {
    results: MarvelComic[];
    total: number;
    count: number;
  };
}

export const marvelApi = {
  async getRandomCharacter(): Promise<MarvelCharacter | null> {
    try {
      const authParams = getAuthParams();
      // First, get the total number of characters
      const initialResponse = await fetch(`${MARVEL_API_BASE_URL}/characters?${authParams}&limit=1`);
      const initialData: CharacterApiResponse = await initialResponse.json();
      const totalCharacters = initialData.data.total;

      if (totalCharacters === 0) return null;

      // Now, get a random character
      let character: MarvelCharacter | null = null;
      let attempts = 0;
      
      // Loop until we find a character with comics
      while (!character || (character.comics.available === 0 && attempts < 10)) {
        const randomOffset = Math.floor(Math.random() * totalCharacters);
        const response = await fetch(`${MARVEL_API_BASE_URL}/characters?${authParams}&limit=1&offset=${randomOffset}`);
        const data: CharacterApiResponse = await response.json();
        if (data.data.results.length > 0) {
          character = data.data.results[0];
        }
        attempts++;
      }
      
      return character && character.comics.available > 0 ? character : null;

    } catch (error) {
      console.error('Error fetching random character:', error);
      throw error;
    }
  },

  async getComicsForCharacter(characterId: number, offset: number = 0, limit: number = 20): Promise<{ comics: MarvelComic[], total: number }> {
    try {
      const authParams = getAuthParams();
      const response = await fetch(`${MARVEL_API_BASE_URL}/characters/${characterId}/comics?${authParams}&offset=${offset}&limit=${limit}&orderBy=onsaleDate`);
      const data: ComicApiResponse = await response.json();
      return { comics: data.data.results, total: data.data.total };
    } catch (error) {
      console.error(`Error fetching comics for character ${characterId}:`, error);
      throw error;
    }
  },

  async getComics(offset: number = 0, limit: number = 20): Promise<{ comics: MarvelComic[], total: number }> {
    try {
      const authParams = getAuthParams();
      const response = await fetch(`${MARVEL_API_BASE_URL}/comics?${authParams}&offset=${offset}&limit=${limit}&orderBy=onsaleDate`);
      const data: ComicApiResponse = await response.json();
      return { comics: data.data.results, total: data.data.total };
    } catch (error) {
      console.error('Error fetching comics:', error);
      throw error;
    }
  },

  async getRandomComic(): Promise<MarvelComic | null> {
    try {
        const authParams = getAuthParams();
        // First, get the total number of comics
        const initialResponse = await fetch(`${MARVEL_API_BASE_URL}/comics?${authParams}&limit=1`);
        const initialData: ComicApiResponse = await initialResponse.json();
        const totalComics = initialData.data.total;
  
        if (totalComics === 0) return null;

        // Get a random comic
        const randomOffset = Math.floor(Math.random() * totalComics);
        const response = await fetch(`${MARVEL_API_BASE_URL}/comics?${authParams}&limit=1&offset=${randomOffset}`);
        const data: ComicApiResponse = await response.json();

        return data.data.results.length > 0 ? data.data.results[0] : null;
    } catch (error) {
        console.error('Error fetching random comic:', error);
        throw error;
    }
  }
}; 