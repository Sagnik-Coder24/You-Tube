# YouTube Channel Explorer

A React + Vite web application that allows users to search for YouTube channels and view their top N ( users can select the number ) videos. The app uses the YouTube API to fetch data and is styled with CSS.

## Features

- Search for YouTube channels by name
- View top N videos from a selected channel
- Responsive design with CSS

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
- [YouTube Data API Key](https://developers.google.com/youtube/v3/getting-started)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Sagnik-Coder24/You-Tube.git
   cd You-Tube
   ```

2. Install dependencies:

   ```bash
   yarn install
   # or
   npm install
   ```

### Configuration

1. Set up your YouTube Data API Key:

   - Create a `.env` file in the root directory and add the following environment variable:

   ```env
   VITE_YOUTUBE_API_KEY=your_youtube_api_key
   ```

### Running the App

1. Start the development server:

   ```bash
   yarn dev
   # or
   npm run dev
   ```

2. Open your browser and go to `http://localhost:5173` to see the app in action.

### Deployment

1. **Build the app for production**:

   ```bash
   yarn build
   # or
   npm run build
   ```

2. **Deploy to Netlify**:
   - Push your code to a GitHub repository.
   - Go to [Netlify](https://www.netlify.com/) and log in.
   - Click on "New site from Git" and connect your GitHub account.
   - Select your repository and configure the build settings:
     - Build command: `yarn build` or `npm run build`
     - Publish directory: `dist` (or `build` if you’re using Create React App)
   - Click "Deploy site".

Netlify will automatically build and deploy your site. You can find your live site URL in the Netlify dashboard.

## Usage

1. Enter a YouTube channel name in the search bar.
2. Click on a channel from the search results to view its top N videos.
3. Adjust the number of videos displayed using the provided input field.

## Built With

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [YouTube Data API](https://developers.google.com/youtube/v3)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Contributions

We welcome contributions from the community! Feel free to open issues and pull requests to suggest improvements, add new features, or fix bugs. Here’s how you can contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Open a pull request

### Suggestions & Feedback

If you have suggestions or feedback on how to improve this project, feel free to post them on our [GitHub Issues](https://github.com/Sagnik-Coder24/issues) page. We love hearing your ideas and collaborating with the community!
