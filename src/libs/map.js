export function createSquare(height) {
    const rows =
        height || 3;
    const columns = height || 3;
    const field = [];
    for (let x = 0; x < rows; x++) {
        let row = [];
        for (let y = 0; y < columns; y++) {
            let slot = { occupied: false, symbol: "", row: x, column: y };
            row.push(slot);
        }
        field.push(row);
    }
    return field;
}