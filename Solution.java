
import java.util.BitSet;

public class Solution {

    private static final char WHITE_PIXEL = 'W';
    private static final char BLACK_PIXEL = 'B';
    private BitSet[] bitStampBlackPixelForRows;
    private int[] frequencyBlackPixelForColumns;
    private int rows;
    private int columns;

    public int findBlackPixel(char[][] picture, int target) {
        rows = picture.length;
        columns = picture[0].length;
        initializeBitsetArray(picture);
        initializeFrequencyArray(picture);
        return countLonelyBlackPixels(picture, target);
    }

    private int countLonelyBlackPixels(char[][] picture, int target) {
        int numberOfLonelyBlackPixels = 0;
        for (int c = 0; c < columns; ++c) {
            if (frequencyBlackPixelForColumns[c] != target) {
                continue;
            }
            for (int r = 0; r < rows; ++r) {
                if (picture[r][c] == BLACK_PIXEL && bitStampBlackPixelForRows[r].cardinality() == target) {
                    numberOfLonelyBlackPixels += rowsAreEqual(r, bitStampBlackPixelForRows[r]) ? target : 0;
                    break;
                }
            }
        }
        return numberOfLonelyBlackPixels;
    }

    private boolean rowsAreEqual(int row, BitSet bitStampRow) {
        int countMatches = 0;
        for (int r = row; r < rows; ++r) {
            if (bitStampBlackPixelForRows[r].equals(bitStampRow)) {
                ++countMatches;
            }
        }
        return countMatches == bitStampRow.cardinality();
    }

    private void initializeBitsetArray(char[][] picture) {
        bitStampBlackPixelForRows = new BitSet[rows];
        for (int r = 0; r < rows; ++r) {
            bitStampBlackPixelForRows[r] = new BitSet(columns);
            for (int c = 0; c < columns; ++c) {
                if (picture[r][c] == BLACK_PIXEL) {
                    bitStampBlackPixelForRows[r].set(c);
                }
            }
        }
    }

    private void initializeFrequencyArray(char[][] picture) {
        frequencyBlackPixelForColumns = new int[columns];
        for (int r = 0; r < rows; ++r) {
            for (int c = 0; c < columns; ++c) {
                if (picture[r][c] == BLACK_PIXEL) {
                    ++frequencyBlackPixelForColumns[c];
                }
            }
        }
    }
}
