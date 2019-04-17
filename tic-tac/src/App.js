import React, { Component } from 'react';
import './index.css';

//Drizzle
import { DrizzleContext } from 'drizzle-react';
import { Drizzle } from 'drizzle';
import drizzleOptions from "./drizzleOptions";

//Models
import TicTac from './components/TicTac';
import Game from "./components/Game";

const drizzle = new Drizzle(drizzleOptions);

class App extends Component {
    render() {
        return (
            <DrizzleContext.Provider drizzle={drizzle}>
                <TicTac />
            </DrizzleContext.Provider>
        );
    }
}

export default App;