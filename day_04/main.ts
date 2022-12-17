import * as readInput from '../lib/readInput';
export type Range = [number, number];

console.log(main());

function main() {
    const lines = readInput(process.argv[2]);
    let totalInclusivePairs = 0;
    for (const line of lines) {
        const [rangeStrA, rangeStrB] = line.split(',');
        const rangeA = convertRangeStringToRange(rangeStrA);
        const rangeB = convertRangeStringToRange(rangeStrB);
        if (rangeIsFullyInclusive(rangeA, rangeB)) {
            totalInclusivePairs++;
        }
    }

    return totalInclusivePairs;
}

function rangeIsFullyInclusive(rangeA: Range, rangeB: Range): boolean {
    return isRangeFullyInclusive(rangeA, ...rangeB) || isRangeFullyInclusive(rangeB, ...rangeA);
}

/**
 * Determines if input range is within the target min and max
 * @param range
 * @param targetMin
 * @param targetMax
 */
function isRangeFullyInclusive(range: Range, targetMin: number, targetMax: number): boolean {
    const [min, max] = range;
    return min >= targetMin && max <= targetMax;
}

function convertRangeStringToRange(rangeStr: string): Range {
    return rangeStr.split('-')
        .map((e) => Number(e)) as unknown as Range;
}