public struct Day3: Day {
    public static func runA(_ input: String) {
        let mulRegex = /mul\(\d{1,3},\d{1,3}\)/

        let matches = input.matches(of: mulRegex)

        var total = 0
        for match in matches {
            print(match.output)
            let mulExpr = match.output

            let start = mulExpr.index(mulExpr.startIndex, offsetBy: 4)
            let end = mulExpr.index(mulExpr.endIndex, offsetBy: -1)
            let mulExprVals = mulExpr[start..<end].split(separator: ",").map { Int($0)! }
            let mulValue = mulExprVals[0] * mulExprVals[1]
            total += mulValue
        }
        print(total)
    }

    public static func runB(_ input: String) {
        let mulRegex = /mul\(\d{1,3},\d{1,3}\)/
        let doExpr = /do\(\)/
        let dontExpr = /don't\(\)/

        let matches = input.matches(of: mulRegex)
        let doMatches = input.matches(of: doExpr)
        let dontMatches = input.matches(of: dontExpr)

        let sortedConditionalRanges =
            (doMatches.map { (true, $0.range) } + dontMatches.map { (false, $0.range) }).sorted {
                $0.1.lowerBound < $1.1.lowerBound
            }

        var currentRangeStart = input.startIndex
        var currentIsDo = true
        var currentNextRangeIndex = 0
        var currentRangeEnd = sortedConditionalRanges[currentNextRangeIndex].1.lowerBound

        var total = 0
        for match in matches {
            let mulRange = match.range

            if mulRange.lowerBound >= currentRangeEnd {
                currentRangeStart = currentRangeEnd
                currentIsDo = sortedConditionalRanges[currentNextRangeIndex].0
                currentNextRangeIndex += 1
                if currentNextRangeIndex >= sortedConditionalRanges.count {
                    currentRangeEnd = input.endIndex
                } else {
                    currentRangeEnd = sortedConditionalRanges[currentNextRangeIndex].1.lowerBound
                }
            }

            if !currentIsDo {
                continue
            }

            let mulExpr = match.output

            let start = mulExpr.index(mulExpr.startIndex, offsetBy: 4)
            let end = mulExpr.index(mulExpr.endIndex, offsetBy: -1)
            let mulExprVals = mulExpr[start..<end].split(separator: ",").map { Int($0)! }
            let mulValue = mulExprVals[0] * mulExprVals[1]
            total += mulValue

        }
        print(total)
    }
}
