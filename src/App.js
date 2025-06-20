import React from 'react'
import  StickyNavbar  from './Navbar/Navbar';
import { NewsProvider } from './Context/Context';
import NewsFeed from './Components/newsfeed/NewsFeed';


function App() {
  
  return (
    <NewsProvider>
      <div>
        <StickyNavbar/>
        <NewsFeed/>
    </div>
    </NewsProvider>

  );
}

export default App;

