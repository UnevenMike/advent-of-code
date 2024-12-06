public struct Day5: Day {
    public static func runA(_ input: String) {
        let (rules, updatesList) = parseInput5(input)

        var correctListMidSum = 0

        for updateList in updatesList {
            // Check if valid
            var isValid = true
            for i in 0..<updateList.count - 1 {
                for j in i + 1..<updateList.count {
                    if rules.contains(Rule(first: updateList[j], second: updateList[i])) {
                        isValid = false
                        break
                    }
                }
            }

            if isValid {
                let midIndex = updateList.count / 2
                let mid = updateList[midIndex]
                correctListMidSum += mid
            }
        }

        print(correctListMidSum)
    }

    public static func runB(_ input: String) {
        let (rules, updatesList) = parseInput5(input)

        var correctListMidSum = 0

        for updateList in updatesList {
            // Check if valid
            var isValid = true
            for i in 0..<updateList.count - 1 {
                for j in i + 1..<updateList.count {
                    if rules.contains(Rule(first: updateList[j], second: updateList[i])) {
                        isValid = false
                        break
                    }
                }
            }

            if !isValid {
                let validList = updateList.sorted { rules.contains(Rule(first: $0, second: $1)) }
                let midIndex = validList.count / 2
                let mid = validList[midIndex]
                correctListMidSum += mid
            }
        }

        print(correctListMidSum)
    }
}
struct Rule: Hashable {
    let first: Int
    let second: Int

    func hash(into hasher: inout Hasher) {
        hasher.combine(first)
        hasher.combine(second)
    }
}
func parseInput5(_ input: String) -> (Set<Rule>, [[Int]]) {
    let lines = input.split(whereSeparator: \.isNewline)
    var rules: Set<Rule> = []
    var updateList: [[Int]] = []

    for line in lines {

        let isRules = line.contains("|")
        if isRules {
            let parts = line.split(separator: "|")
            rules.insert(Rule(first: Int(parts[0])!, second: Int(parts[1])!))
        } else {
            let parts = line.split(separator: ",")
            updateList.append(parts.map { Int($0)! })
        }
    }

    return (rules, updateList)
}
