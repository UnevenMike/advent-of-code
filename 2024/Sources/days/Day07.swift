import Foundation

public struct Day7: Day {
    public static func runA(_ input: String) {
        let lines = input.split(whereSeparator: \.isNewline)
        let calibrationLines = lines.map { line -> Calibration in
            let parts = line.split(separator: ": ")
            let total = Int(parts[0])!
            let values = parts[1].split(separator: " ").map { Int($0)! }
            return Calibration(total: total, values: values, base: 2)
        }

        var total = 0

        for calibration in calibrationLines {
            print(calibration.total, calibration.values)
            let hasValidResult = calibration.hasValidResult()
            if hasValidResult {
                total += calibration.total
            }
        }

        print(total)

    }

    public static func runB(_ input: String) {
        let lines = input.split(whereSeparator: \.isNewline)
        let calibrationLines = lines.map { line -> Calibration in
            let parts = line.split(separator: ": ")
            let total = Int(parts[0])!
            let values = parts[1].split(separator: " ").map { Int($0)! }
            return Calibration(total: total, values: values, base: 3)
        }

        var total = 0

        for calibration in calibrationLines {
            print(calibration.total, calibration.values)
            let hasValidResult = calibration.hasValidResult()
            if hasValidResult {
                total += calibration.total
            }
        }

        print(total)
    }
}
class Calibration {
    let total: Int
    let values: [Int]
    let base: Int

    init(total: Int, values: [Int], base: Int) {
        self.total = total
        self.values = values
        self.base = base
    }

    func hasValidResult() -> Bool {
        var operatorArray: [Int] = self.values.map({ _ in 0 })
        var maxChecks = Int(pow(Double(base), Double(values.count)))
        for _ in 0..<maxChecks {
            operatorArray = incrementArray(operatorArray, base: base)

            let result = calculateResult(operatorArray)
            if result == self.total {
                print("Found result: \(result)")
                return true
            }
        }
        return false
    }

    func calculateResult(_ operatorArray: [Int]) -> Int {
        var result = 0
        for (index, value) in self.values.enumerated() {
            if operatorArray[index] == 0 {
                result += value
            } else if operatorArray[index] == 1 {
                result *= value
            } else if operatorArray[index] == 2 {
                let str = "\(result)\(value)"
                let numStr = Int(str)
                result = numStr!
            } else {
                fatalError("Invalid operator")
            }
        }
        return result
    }
}
func incrementArray(_ array: [Int], base: Int) -> [Int] {
    var array = array
    var index = array.count - 1
    while true {
        array[index] += 1
        if array[index] == base {
            array[index] = 0
            index = index - 1
            if index < 0 {
                return array
            }
        } else {
            return array
        }
    }
}
