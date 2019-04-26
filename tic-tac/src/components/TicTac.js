import React from "react";
import { newContextComponents } from "drizzle-react-components";
import { DrizzleContext } from "drizzle-react";
import Game from "./Game";

const { AccountData, ContractData, ContractForm } = newContextComponents;

export default () => (
    <DrizzleContext.Consumer>
        {
            drizzleContext => {
                const { drizzle, drizzleState, initialized } = drizzleContext;
                if (!initialized) {
                    return "Cargando...";
                }
                return (
                    // DOM
                    <div className="App">
                        <div className="status">
                            <h1>Player X:</h1>
                            <ContractData
                                drizzle={drizzle}
                                drizzleState={drizzleState}
                                contract="TicTac"
                                method="getPlayerX"
                            />
                        </div>
                        <div className="status">
                            <h1>Player O:</h1>
                            <ContractData
                                drizzle={drizzle}
                                drizzleState={drizzleState}
                                contract="TicTac"
                                method="getPlayerO"
                            />
                        </div>
                        <div className="status">
                            <h1>Register Player O:</h1>
                            <ContractForm
                                drizzle={drizzle}
                                drizzleState={drizzleState}
                                contract="TicTac"
                                method="setPlayerO"
                            />
                        </div>
                        <div className="status">
                            <h1>Winner:</h1>
                            <ContractData
                                drizzle={drizzle}
                                drizzleState={drizzleState}
                                contract="TicTac"
                                method="getWinner"
                            />
                        </div>
                        <div className="status">
                            <h1>New Game:</h1>
                            <ContractForm
                                drizzle={drizzle}
                                drizzleState={drizzleState}
                                contract="TicTac"
                                method="newGame"
                            />
                        </div>
                        <div className="status">
                            <h1>Winners:</h1>
                            <ContractData
                                drizzle={drizzle}
                                drizzleState={drizzleState}
                                contract="TicTac"
                                method="winners"
                                methodArgs={[0]}
                            />
                        </div>
{/*                        <div className="status">
                            <h1>Square 0:</h1>
                            <ContractData
                                drizzle={drizzle}
                                drizzleState={drizzleState}
                                contract="TicTac"
                                method="getSquareValue"
                                methodParams={0}
                            />
                        </div>*/}
{/*                        <div className="status">
                            <h1>Squares:</h1>
                            <ContractData
                                drizzle={drizzle}
                                drizzleState={drizzleState}
                                contract="TicTac"
                                method="getSquares"
                            />
                        </div>*/}
                        <div className="board-row">
                            <Game drizzleContext={drizzleContext}/>
                        </div>

{/*                        <div className="board-row">
                            <ContractForm
                                drizzle={drizzle}
                                drizzleState={drizzleState}
                                contract="Calculadora"
                                method="setSquares"
                                methodArgs={0}
                            />
                            <ContractForm
                                drizzle={drizzle}
                                drizzleState={drizzleState}
                                contract="Calculadora"
                                method="setSquares"
                                methodArgs={1}
                            />
                            <ContractForm
                                drizzle={drizzle}
                                drizzleState={drizzleState}
                                contract="Calculadora"
                                method="setSquares"
                                methodArgs={2}
                            />

                        </div>
                        <div className="board-row">
                            <ContractForm
                                drizzle={drizzle}
                                drizzleState={drizzleState}
                                contract="Calculadora"
                                method="setSquares"
                                methodArgs={3}
                            />
                            <ContractForm
                                drizzle={drizzle}
                                drizzleState={drizzleState}
                                contract="Calculadora"
                                method="setSquares"
                                methodArgs={4}
                            />
                            <ContractForm
                                drizzle={drizzle}
                                drizzleState={drizzleState}
                                contract="Calculadora"
                                method="setSquares"
                                methodArgs={5}
                            />
                        </div>
                        <div className="board-row">
                            <ContractForm
                                drizzle={drizzle}
                                drizzleState={drizzleState}
                                contract="Calculadora"
                                method="setSquares"
                                methodArgs={6}
                            />
                            <ContractForm
                                drizzle={drizzle}
                                drizzleState={drizzleState}
                                contract="Calculadora"
                                method="setSquares"
                                methodArgs={7}
                            />
                            <ContractForm
                                drizzle={drizzle}
                                drizzleState={drizzleState}
                                contract="Calculadora"
                                method="setSquares"
                                methodArgs={8}
                            />
                        </div>*/}
                    </div >

                );
            }
        }
    </DrizzleContext.Consumer>
);

