public struct Day2: Day {
    public static func runA(_ input: String) {
        let reports = breakInputIntoReports(input)

        var safeReportCount = 0
        for report in reports {
            let reportValue = validateReport(report)
            if reportValue == -1 {
                safeReportCount += 1
            }
        }

        print(safeReportCount)
    }

    public static func runB(_ input: String) {
        let reports = breakInputIntoReports(input)

        var safeReportCount = 0
        for report in reports {
            let reportValue = validateReport(report)
            if reportValue == -1 {
                safeReportCount += 1
                continue
            }

            for i in 0..<report.count {
                var newReport = report
                newReport.remove(at: i)

                let reportValue = validateReport(newReport)
                if reportValue == -1 {
                    safeReportCount += 1
                    break
                }
            }
        }

        print(safeReportCount)
    }

    private static func breakInputIntoReports(_ input: String) -> [[Int]] {
        let reports = input.split(whereSeparator: \.isNewline)
        let reportNumArray = reports.map { report in
            return report.components(separatedBy: " ").map { Int($0)! }
        }

        return reportNumArray
    }

    private static func validateReport(_ report: [Int]) -> Int {
        var isIncreasing: Bool? = nil

        for i in 0..<report.count - 1 {
            let currentVal = report[i]
            let nextVal = report[i + 1]

            let distance = abs(currentVal - nextVal)
            let currentIsIncreasing = currentVal < nextVal

            if isIncreasing == nil {
                isIncreasing = currentIsIncreasing
            } else if isIncreasing != currentIsIncreasing {
                return i
            }

            if distance < 1 || distance > 3 {
                return i
            }
        }

        return -1
    }
}
