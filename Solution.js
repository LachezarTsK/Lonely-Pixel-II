
/**
 * @param {character[][]} picture
 * @param {number} target
 * @return {number}
 */
var findBlackPixel = function (picture, target) {
    this.WHITE_PIXEL = 'W';
    this.BLACK_PIXEL = 'B';
    this.rows = picture.length;
    this.columns = picture[0].length;
    this.dataRows = new Array(this.rows);
    this.frequencyBlackPixelForColumns = new Array(this.columns).fill(0);

    initializeDataRowsArray(picture);
    initializeFrequencyArray(picture);
    return countLonelyBlackPixels(picture, target);
};

/**
 * @param {number} bitStampBlackPixelForRows
 * @param {number} frequencyBlackPixelForRows
 */
function DataRows(bitStampBlackPixelForRows, frequencyBlackPixelForRows) {
    this.bitStampBlackPixelForRows = bitStampBlackPixelForRows;
    this.frequencyBlackPixelForRows = frequencyBlackPixelForRows;
}

/**
 * @param {character[][]} picture
 * @param {number} target
 * @return {number}
 */
function countLonelyBlackPixels(picture, target) {
    let numberOfLonelyBlackPixels = 0;
    for (let c = 0; c < this.columns; ++c) {
        if (this.frequencyBlackPixelForColumns[c] !== target) {
            continue;
        }
        for (let r = 0; r < this.rows; ++r) {
            if (picture[r][c] === this.BLACK_PIXEL && this.dataRows[r].frequencyBlackPixelForRows === target) {
                numberOfLonelyBlackPixels += rowsAreEqual(r, this.dataRows[r].bitStampBlackPixelForRows) ? target : 0;
                break;
            }
        }
    }
    return numberOfLonelyBlackPixels;
}

/**
 * @param {number} row
 * @param {number} bitStampRow
 * @return {boolean}
 */
function rowsAreEqual(row, bitStampRow) {
    let countMatches = 0;
    for (let r = row; r < this.rows; ++r) {
        if (this.dataRows[r].bitStampBlackPixelForRows === bitStampRow) {
            ++countMatches;
        }
    }
    return countMatches === this.dataRows[row].frequencyBlackPixelForRows;
}

/**
 * @param {character[][]} picture
 * @return {void}
 */
function initializeDataRowsArray(picture) {
    for (let r = 0; r < this.rows; ++r) {
        this.dataRows[r] = new DataRows(BigInt(0), 0);
        this.dataRows[r].bitStampBlackPixelForRows = BigInt(2);

        for (let c = 0; c < this.columns; ++c) {
            if (picture[r][c] === this.BLACK_PIXEL) {
                ++this.dataRows[r].bitStampBlackPixelForRows;
                ++this.dataRows[r].frequencyBlackPixelForRows;
            }
            this.dataRows[r].bitStampBlackPixelForRows = this.dataRows[r].bitStampBlackPixelForRows * BigInt(2);
        }
    }
}

/**
 * @param {character[][]} picture
 * @return {void}
 */
function initializeFrequencyArray(picture) {
    for (let r = 0; r < this.rows; ++r) {
        for (let c = 0; c < this.columns; ++c) {
            if (picture[r][c] === this.BLACK_PIXEL) {
                ++this.frequencyBlackPixelForColumns[c];
            }
        }
    }
}
