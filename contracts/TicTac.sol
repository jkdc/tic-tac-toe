pragma solidity ^0.5.6;
pragma experimental ABIEncoderV2;
//import "github.com/ethereum/dapp-bin/library/stringUtils.sol";


contract TicTac {
    enum Winner {Any, PlayerX, PlayerO}
    struct Game {
        address playerX;
        address playerO;
        string[9] squares;
        bool xIsNext;
        Winner winner;
    }

    Game public g;
    Game[] public winners;

    constructor () public {
        g.playerX = msg.sender;
        g.xIsNext = true;
        g.winner = Winner.Any;
        g.squares[0]='X';
    }

    modifier onlyValidUser {
    	require((msg.sender == g.playerX && g.xIsNext) || (msg.sender == g.playerO && !g.xIsNext));
    	_;
	}

    modifier onlyIfNotPlayerO {
        require(g.playerO == address(0));
        _;
    }

    modifier onlyBlankSquare(uint256 i) {
        bytes memory tempEmptyString = bytes(g.squares[i]);
        require(tempEmptyString.length==0);
        _;
    }

    modifier onlyIfNotWinner {
        require(g.winner == Winner.Any);
        _;
    }

    modifier onlyIfWinner {
        require(g.winner != Winner.Any);
        _;
    }

    function getPlayerX() public view returns (address) {
        return g.playerX;
    }

    function setPlayerO() public onlyIfNotPlayerO{
        g.playerO = msg.sender;
    }

    function getPlayerO() public view returns (address) {
        return g.playerO;
    }

    function setSquares(uint256 i) public onlyValidUser onlyBlankSquare(i) onlyIfNotWinner
    {
        g.squares[i] = g.xIsNext ? 'X' : 'O';
        g.xIsNext =  !g.xIsNext;
    }

    function getSquares() public view returns (string[9] memory)
    {
        return g.squares;
    }

    function getSquareValue(uint256 i) public view returns (string memory)
    {
        return g.squares[i];
    }

    function getWinner() public view returns (string memory) {
        if (g.winner == Winner.Any) {
            return 'Any';
        } else if (g.winner == Winner.PlayerX) {
            return 'Player X';
        } else {
            return 'Player O';
        }
    }

    function getXIsNext() public view returns (bool) {
        return g.xIsNext;
    }

    function checkRow(uint256 a, uint256 b, uint256 c) public onlyIfNotWinner returns (Winner)
    {
        string memory first = g.squares[a];

        if ((equal(first, g.squares[a])) && (equal(first, g.squares[b])) && (equal(first, g.squares[c]))) {
            g.winner = (equal(first, 'X')) ? Winner.PlayerX : Winner.PlayerO;
        }

        return g.winner;
    }

    function getWinners() public view returns (Game[] memory){
        return winners;
    }

    function newGame() public onlyValidUser onlyIfWinner{
        winners.push(g);
        delete g.squares;
        g.winner = Winner.Any;
        g.xIsNext = true;
    }

    function compare(string memory _a, string memory _b) private returns (int) {
        bytes memory a = bytes(_a);
        bytes memory b = bytes(_b);
        uint minLength = a.length;
        if (b.length < minLength) minLength = b.length;
        //@todo unroll the loop into increments of 32 and do full 32 byte comparisons
        for (uint i = 0; i < minLength; i ++)
            if (a[i] < b[i])
                return -1;
            else if (a[i] > b[i])
                return 1;
        if (a.length < b.length)
            return -1;
        else if (a.length > b.length)
            return 1;
        else
            return 0;
    }
    /// @dev Compares two strings and returns true iff they are equal.
    function equal(string memory _a, string memory _b) private returns (bool) {
        return compare(_a, _b) == 0;
    }
}