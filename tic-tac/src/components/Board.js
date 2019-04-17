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

        if (this.calculateWinner(squares) || squares[i]) {
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
                this.checkResultInContract(a, c);
                return squares[a];
            }
        }

        return null;
    }

    setSquareInContract(position) {
        const { drizzle, drizzleState } = this.props.drizzleContext;
        const contract = drizzle.contracts.TicTac;
        const data = contract.methods.setSquares.cacheSend(position);
        let state = drizzle.store.getState();
        drizzle.contracts.TicTac.methods.getSquareValue(position).call().then(function(result){
            console.log(result);
        });
    }

    getSquareFromContract(position) {
        const { drizzle, drizzleState } = this.props.drizzleContext;
        const contract = drizzle.contracts.TicTac;
        drizzle.contracts.TicTac.methods.getSquareValue(position).call().then((value) => this.updateSquareValue(position, value));

    }

    updateSquareValue(position, value) {
        this.state.squares[position] = value;
    }

    checkResultInContract(start, end) {
        const { drizzle, drizzleState } = this.props.drizzleContext;
        const contract = drizzle.contracts.TicTac;
        contract.methods.setSquares.checkRow(start, end);
    }

    render() {
        const winner = this.calculateWinner(this.state.squares);
        let status;

        if (winner) {
            status = 'Winner is ' + winner;
        } else {
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