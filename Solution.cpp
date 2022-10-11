
#include <bitset>
#include <vector>
using namespace std;

class Solution {
    
    inline static const char WHITE_PIXEL = 'W';
    inline static const char BLACK_PIXEL = 'B';
    inline static const int MAX_ROW_SIZE = 200;
    vector<bitset<MAX_ROW_SIZE>> bitStampBlackPixelForRows;
    vector<int> frequencyBlackPixelForColumns;
    size_t rows;
    size_t columns;

public:
    int findBlackPixel(vector<vector<char>>& picture, int target) {
        rows = picture.size();
        columns = picture[0].size();
        initializeBitsetArray(picture);
        initializeFrequencyArray(picture);
        return countLonelyBlackPixels(picture, target);
    }

private:
    int countLonelyBlackPixels(const vector<vector<char>>& picture, int target) const {
        int numberOfLonelyBlackPixels = 0;
        for (int c = 0; c < columns; ++c) {
            if (frequencyBlackPixelForColumns[c] != target) {
                continue;
            }
            for (int r = 0; r < rows; ++r) {
                if (picture[r][c] == BLACK_PIXEL && bitStampBlackPixelForRows[r].count() == target) {
                    numberOfLonelyBlackPixels += rowsAreEqual(r, bitStampBlackPixelForRows[r]) ? target : 0;
                    break;
                }
            }
        }
        return numberOfLonelyBlackPixels;
    }

    bool rowsAreEqual(int row, const bitset<MAX_ROW_SIZE>& bitStampRow) const {
        int countMatches = 0;
        for (int r = row; r < rows; ++r) {
            if (bitStampBlackPixelForRows[r] == bitStampRow) {
                ++countMatches;
            }
        }
        return countMatches == bitStampRow.count();
    }

    void initializeBitsetArray(const vector<vector<char>>& picture) {
        bitStampBlackPixelForRows.resize(rows);
        for (int r = 0; r < rows; ++r) {
            for (int c = 0; c < columns; ++c) {
                if (picture[r][c] == BLACK_PIXEL) {
                    bitStampBlackPixelForRows[r].set(c);
                }
            }
        }
    }

    void initializeFrequencyArray(const vector<vector<char>>& picture) {
        frequencyBlackPixelForColumns.resize(columns);
        for (int r = 0; r < rows; ++r) {
            for (int c = 0; c < columns; ++c) {
                if (picture[r][c] == BLACK_PIXEL) {
                    ++frequencyBlackPixelForColumns[c];
                }
            }
        }
    }
};
