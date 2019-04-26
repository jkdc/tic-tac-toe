import React from 'react';
import Square from "./Square";

/*function Square(props) {
    return (
        <button className="square" onClick={props.onClick} onChange={props.onChange}>
            {props.value}
            {this.getSquareFromContract(props.value)}
        </button>
    );
}*/

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            winner: 0
        };
    }

    renderSquare(i) {
        this.getSquareFromContract(i);
        return <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
                onChange={() => this.getSquareFromContract(i).bind(this)}
                onLoaded={() => this.getSquareFromContract(i).bind(this)} />;
    }

    handleClick(i) {
        const squares = this.state.squares.slice();

        if (this.state.winner != 0 || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        //console.log(squares);
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        });

        this.setSquareInContract(i);
    }

    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                console.log('find')
                this.checkResultInContract(a, b, c);
                return true;
            }
        }
        return false;
    }

    setSquareInContract(position) {
        const { drizzle, drizzleState } = this.props.drizzleContext;
        const contract = drizzle.contracts.TicTac;
        const data = contract.methods.setSquares.cacheSend(position);
        let state = drizzle.store.getState();
        drizzle.contracts.TicTac.methods.getSquareValue(position).call().then((result) => this.calculateWinner(this.state.squares));
    }

    getSquareFromContract(position) {
        const { drizzle, drizzleState } = this.props.drizzleContext;
        const contract = drizzle.contracts.TicTac;
        drizzle.contracts.TicTac.methods.getSquareValue(position).call().then((value) => {
            this.updateSquareValue(position, value);
        //    this.calculateWinner(this.state.squares);   
        });
    }

    updateSquareValue(position, value) {
        this.state.squares[position] = value;
    }

    getNext() {
        const { drizzle, drizzleState } = this.props.drizzleContext;
        const contract = drizzle.contracts.TicTac;
        contract.methods.getXIsNext().call().then((value) => {
            //status = 'Next player: ' + (value ? 'X' : 'O');
            this.state.xIsNext = value;
        });
    }

    checkResultInContract(a, b, c) {
        const { drizzle, drizzleState } = this.props.drizzleContext;
        const contract = drizzle.contracts.TicTac;
        this.state.winner = contract.methods.checkRow.cacheSend(a, b, c);
    }

    getWinners() {
        const { drizzle, drizzleState } = this.props.drizzleContext;
        const contract = drizzle.contracts.TicTac;
        contract.methods.getWinners().call()/*.then((value) => {
            console.log(value);    
        });*/
        console.log('joaquin')

    }

    render() {
        console.log(this.state.winner)
        let status;
//this.getWinners();
        if (this.state.winner ) {
            status = 'Winner is ' + this.state.winner;
        } else {
            this.getNext();
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

export default Board;
