public struct Day1: Day {
    public static func runA(_ input: String) {
        let (left, right): ([Int], [Int]) = splitAndSortInput(input)

        var distanceSum = 0
        for i in 0..<left.count {
            distanceSum += abs(left[i] - right[i])
        }

        print(distanceSum)

    }

    public static func runB(_ input: String) {
        let (left, right): ([Int], [Int]) = splitAndSortInput(input)

        var similarityScore = 0

        for i in 0..<left.count {
            var matchCount = 0
            for j in 0..<left.count {
                if left[i] == right[j] {
                    matchCount += 1
                }
            }
            similarityScore += matchCount * left[i]
        }

        print(similarityScore)
    }
}
func splitAndSortInput(_ input: String) -> ([Int], [Int]) {
    let inputLines = input.split(whereSeparator: \.isNewline)

    let tupleList = inputLines.map {
        let lineSplit = $0.split(separator: "   ")
        guard let first = Int(lineSplit[0]), let second = Int(lineSplit[1]) else {
            fatalError("Invalid input")
        }
        return (first, second)
    }

    let left = tupleList.map { $0.0 }.sorted()
    let right = tupleList.map { $0.1 }.sorted()

    return (left, right)
}
