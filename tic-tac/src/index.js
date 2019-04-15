import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//Drizzle
import { DrizzleContext } from 'drizzle-react';
import { Drizzle } from 'drizzle';
import drizzleOptions from "./drizzleOptions";

//Models
import TicTac from './components/TicTac';
import Game from "./components/Game";

const drizzle = new Drizzle(drizzleOptions);


ReactDOM.render(
    <Game />,
    document.getElementById('root')
)