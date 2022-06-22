import React from 'react';

import './App.scss';
import Header from './components/Header/Header';
import Users from './components/Users/Users';
import HeroSection from './components/HeroSection/HeroSection';

function App() {
    return (
        <>
            <Header />
            <main>
                <HeroSection />
                <Users />
            </main>
        </>
    );
}

export default App;
