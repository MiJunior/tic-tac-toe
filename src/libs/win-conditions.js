import { createSquare } from "./map";

export class WinCondition {
    constructor(field = createSquare(3)) {
        this.field = field;
    }

    horizontalLine(symbol) {
        let inspectingRow = [];
        return (
            this.field.some(row => {
                inspectingRow = row;
                return row.every(slot => slot.occupied && slot.symbol === symbol);
            }) && inspectingRow
        );
    }

    verticalLine(symbol) {
        return this.field.some((row, index) => {
            let inspectingColumn = [];
            for (let x = this.field.length - 1; x > -1; x--) {
                inspectingColumn.push(this.field[x][index]);
            }
            return (
                inspectingColumn.every(
                    slot => slot.occupied && slot.symbol === symbol
                ) && inspectingColumn
            );
        });
    }


    diagonalLine(symbol) {
        const length = this.field.length - 1;
        const middle = length / 2;

        if (
            !this.field[middle][middle].occupied &&
            (!this.field[length][0].occupied || !this.field[0][0].occupied)
        )
            return false;

        let column =
            this.field[0][0].occupied && this.field[0][0].symbol === symbol
                ? 0
                : this.field[0][length].occupied &&
                this.field[0][length].symbol === symbol
                ? length
                : false;

        if (typeof column !== "number") return false;

        let inspectingDiagonal = [];
        let row = 0;
        if (column === 0) {
            for (column; column <= length; column++) {
                inspectingDiagonal.push(this.field[row][column]);
                row++;
            }
        } else {
            for (column; column >= 0; column--) {
                inspectingDiagonal.push(this.field[row][column]);
                row++;
            }
        }

        return (
            inspectingDiagonal.every(
                slot => slot.occupied && slot.symbol === symbol
            ) && inspectingDiagonal
        );
    }

    get tieExists() {
        const flatten = arr =>
            arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);
        const flattenedField = flatten(this.field);
        return flattenedField.every(slot => slot.occupied === true);
    }

    hasLine(symbol) {
        return (
            this.horizontalLine(symbol) ||
            this.verticalLine(symbol) ||
            this.diagonalLine(symbol)
        );
    }
}