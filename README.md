<<<<<<< HEAD
# Comic Strip Viewer 🦸‍♂️

A React Native mobile application that allows you to browse and explore Marvel comics using the Marvel Comics API. Navigate through thousands of comics, discover random issues, and enjoy a seamless comic browsing experience.

## Features

- **Browse All Comics**: Navigate through the entire Marvel comics database sequentially
- **Random Comic Discovery**: Jump to random comics from anywhere in the Marvel universe
- **Smooth Navigation**: Use Previous/Next buttons to browse through loaded comics
- **Automatic Loading**: Comics are loaded automatically as you browse
- **Responsive Design**: Optimized for mobile devices with a dark theme
- **Offline Support**: Comics are cached for better performance

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo Go](https://expo.dev/go) app on your mobile device (for testing)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ComicStripViewer
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Marvel API Setup

The app uses the Marvel Comics API to fetch comic data. You have two options:

#### Option A: Use Default API Keys (Quick Start)
The app comes with pre-configured API keys for immediate use. These are shared keys with rate limits.

#### Option B: Use Your Own Marvel API Keys (Recommended)
For better performance and higher rate limits, get your own Marvel API keys:

1. **Create a Marvel Developer Account**:
   - Go to [Marvel Developer Portal](https://developer.marvel.com/)
   - Sign up for a free account
   - Accept the terms of service

2. **Generate API Keys**:
   - After registration, you'll receive your Public Key and Private Key
   - Keep your Private Key secure and never share it publicly

3. **Update the API Keys**:
   - Open `services/marvelApi.ts`
   - Replace the existing keys with your own:

```typescript
const PUBLIC_KEY = 'your_public_key_here';
const PRIVATE_KEY = 'your_private_key_here';
```

**Note**: The Marvel API has rate limits:
- 3000 requests per day for authenticated users
- 100 requests per day for unauthenticated users

### 4. Start the Application

```bash
npx expo start
```

### 5. Run on Your Device

You have several options to run the app:

- **Expo Go App**: Scan the QR code with your phone's camera (iOS) or Expo Go app (Android)
- **Android Emulator**: Press `a` in the terminal
- **iOS Simulator**: Press `i` in the terminal (macOS only)
- **Web Browser**: Press `w` in the terminal

## How to Use

### Navigation

- **Previous Button**: Go to the previous comic in your loaded collection
- **Next Button**: Go to the next comic in your loaded collection
- **Random Button**: Jump to a random comic from anywhere in the Marvel database

### Browsing Comics

1. **Initial Load**: The app starts by loading the first 20 comics from the Marvel database
2. **Sequential Browsing**: Use Previous/Next to navigate through loaded comics
3. **Automatic Loading**: When you reach the end of loaded comics, more are automatically fetched
4. **Random Discovery**: Press Random to jump to a random position and continue browsing from there

### Comic Information

Each comic displays:
- **Title**: The comic's title
- **Cover Image**: High-quality cover art
- **Description**: Comic description (if available)

## Project Structure

```
ComicStripViewer/
├── components/
│   └── ComicViewer.tsx          # Main comic viewing component
├── services/
│   └── marvelApi.ts             # Marvel API integration
├── constants/
│   └── Colors.ts                # Color definitions
├── hooks/                       # Custom React hooks
├── assets/                      # Images and fonts
└── App.tsx                      # Main application component
```

## API Integration

The app integrates with the Marvel Comics API using:

- **Authentication**: MD5 hash-based authentication
- **Endpoints**: Characters, Comics, and Character Comics
- **Pagination**: Efficient loading with offset-based pagination
- **Error Handling**: Comprehensive error handling and user feedback

## Troubleshooting

### Common Issues

1. **"Failed to load comics" Error**:
   - Check your internet connection
   - Verify your API keys are correct
   - Ensure you haven't exceeded API rate limits

2. **App won't start**:
   - Make sure all dependencies are installed: `npm install`
   - Clear Expo cache: `npx expo start --clear`

3. **Navigation buttons disabled**:
   - This is normal when you're at the beginning or end of loaded comics
   - Press Random to load more comics or wait for automatic loading

4. **Slow loading**:
   - Consider using your own Marvel API keys for better rate limits
   - Check your internet connection
   - The Marvel API may be experiencing high traffic

### API Rate Limits

If you encounter rate limit errors:
- Wait a few minutes before trying again
- Consider upgrading to your own API keys
- The app includes automatic retry logic for temporary failures

## Development

### Adding New Features

1. **New API Endpoints**: Add them to `services/marvelApi.ts`
2. **UI Components**: Create new components in the `components/` directory
3. **Styling**: Update styles in the respective component files

### Building for Production

```bash
# Build for Android
npx expo build:android

# Build for iOS
npx expo build:ios
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Marvel Comics API](https://developer.marvel.com/) for providing the comic data
- [Expo](https://expo.dev/) for the React Native development platform
- [React Native](https://reactnative.dev/) for the mobile app framework

## Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the Marvel API documentation
3. Open an issue on the project repository

---

**Happy Comic Browsing!** 🦸‍♀️
=======
# Marvel_Comic_Strip
React-native application to rbowse through different comics using marvel dev api
>>>>>>> 85b37da898e956377c29a79f00c88407c83ae869
