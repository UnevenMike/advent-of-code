public struct Day1: Day {
    public static func runA(_ input: String) {
        let inputLines = input.split(whereSeparator: \.isNewline)

        var sum = 0
        for line in inputLines {
            var digitList = [Int]()
            for char in line {
                var asciiValue = char.asciiValue ?? 0
                if asciiValue >= 48 && asciiValue <= 57 {
                    digitList.append(Int(asciiValue - 48))
                }
            }
            let firstDigit = digitList[0]
            let lastDigit = digitList[digitList.count - 1]
            let value = firstDigit * 10 + lastDigit
            sum += value
        }

        print(sum)
    }

    public static func runB(_ input: String) {
        print("Day 1 B")
    }
}
