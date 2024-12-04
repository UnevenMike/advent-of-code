public struct Day4: Day {
    public static func runA(_ input: String) {
        let grid = load2DCharGrid(input)

        let gridHeight = grid.count
        let gridWidth = grid[0].count

        var xmasCount = 0
        for j in 0..<gridHeight {
            for i in 0..<gridWidth {
                let char = grid[j][i]
                if char == "X" {
                    let left = walkGrdLeft(grid, x: i, y: j)
                    if left == "XMAS" {
                        xmasCount += 1
                    }

                    let right = walkGrdRight(grid, x: i, y: j)
                    if right == "XMAS" {
                        xmasCount += 1
                    }

                    let up = walkGrdUp(grid, x: i, y: j)
                    if up == "XMAS" {
                        xmasCount += 1
                    }

                    let down = walkGrdDown(grid, x: i, y: j)
                    if down == "XMAS" {
                        xmasCount += 1
                    }

                    let diagUpLeft = walkGridDiagUpLeft(grid, x: i, y: j)
                    if diagUpLeft == "XMAS" {
                        xmasCount += 1
                    }

                    let diagUpRight = walkGridDiagUpRight(grid, x: i, y: j)
                    if diagUpRight == "XMAS" {
                        xmasCount += 1
                    }

                    let diagDownLeft = walkGridDiagDownLeft(grid, x: i, y: j)
                    if diagDownLeft == "XMAS" {
                        xmasCount += 1
                    }

                    let diagDownRight = walkGridDiagDownRight(grid, x: i, y: j)
                    if diagDownRight == "XMAS" {
                        xmasCount += 1
                    }
                }
            }
        }
        print(xmasCount)

    }

    public static func runB(_ input: String) {
        let grid = load2DCharGrid(input)

        let gridHeight = grid.count
        let gridWidth = grid[0].count

        var xMASCount = 0
        for j in 1..<gridHeight - 1 {
            for i in 1..<gridWidth - 1 {
                let char = grid[j][i]
                if char == "A" {
                    let isxMAS = checkGridforxMAS(grid, x: i, y: j)
                    if isxMAS {
                        xMASCount += 1
                    }
                }
            }
        }
        print(xMASCount)
    }
}
func load2DCharGrid(_ input: String) -> [[Character]] {
    return input.split(whereSeparator: \.isNewline).map { Array($0) }
}
func walkGrdLeft(_ grid: [[Character]], x: Int, y: Int) -> String {
    var x = x
    var y = y
    var foundChars = [Character]()

    while x >= 0 {
        foundChars.append(grid[y][x])
        x -= 1
        if foundChars.count == 4 {
            return String(foundChars)
        }
    }

    return String(foundChars)
}
func walkGrdRight(_ grid: [[Character]], x: Int, y: Int) -> String {
    var x = x
    var y = y
    var foundChars = [Character]()

    while x < grid[y].count {
        foundChars.append(grid[y][x])
        x += 1
        if foundChars.count == 4 {
            return String(foundChars)
        }
    }

    return String(foundChars)
}
func walkGrdUp(_ grid: [[Character]], x: Int, y: Int) -> String {
    var x = x
    var y = y
    var foundChars = [Character]()

    while y >= 0 {
        foundChars.append(grid[y][x])
        y -= 1
        if foundChars.count == 4 {
            return String(foundChars)
        }
    }

    return String(foundChars)
}
func walkGrdDown(_ grid: [[Character]], x: Int, y: Int) -> String {
    var x = x
    var y = y
    var foundChars = [Character]()

    while y < grid.count {
        foundChars.append(grid[y][x])
        y += 1
        if foundChars.count == 4 {
            return String(foundChars)
        }
    }

    return String(foundChars)
}
func walkGridDiagUpLeft(_ grid: [[Character]], x: Int, y: Int) -> String {
    var x = x
    var y = y
    var foundChars = [Character]()

    while x >= 0 && y >= 0 {
        foundChars.append(grid[y][x])
        x -= 1
        y -= 1
        if foundChars.count == 4 {
            return String(foundChars)
        }
    }

    return String(foundChars)
}
func walkGridDiagUpRight(_ grid: [[Character]], x: Int, y: Int) -> String {
    var x = x
    var y = y
    var foundChars = [Character]()

    while x < grid[0].count && y >= 0 {
        foundChars.append(grid[y][x])
        x += 1
        y -= 1
        if foundChars.count == 4 {
            return String(foundChars)
        }
    }

    return String(foundChars)
}
func walkGridDiagDownLeft(_ grid: [[Character]], x: Int, y: Int) -> String {
    var x = x
    var y = y
    var foundChars = [Character]()

    while x >= 0 && y < grid.count {
        foundChars.append(grid[y][x])
        x -= 1
        y += 1
        if foundChars.count == 4 {
            return String(foundChars)
        }
    }

    return String(foundChars)
}
func walkGridDiagDownRight(_ grid: [[Character]], x: Int, y: Int) -> String {
    var x = x
    var y = y
    var foundChars = [Character]()

    while x < grid[0].count && y < grid.count {
        foundChars.append(grid[y][x])
        x += 1
        y += 1
        if foundChars.count == 4 {
            return String(foundChars)
        }
    }

    return String(foundChars)
}
func checkGridforxMAS(_ grid: [[Character]], x: Int, y: Int) -> Bool {
    if grid[y][x] != "A" {
        return false
    }

    let upLeft = grid[y - 1][x - 1]
    let upRight = grid[y - 1][x + 1]
    let downLeft = grid[y + 1][x - 1]
    let downRight = grid[y + 1][x + 1]
    let center = grid[y][x]
    
    let dig1 = String([upLeft, center, downRight])
    let dig2 = String([upRight, center, downLeft])

    return (dig1 == "SAM" || dig1 == "MAS") && (dig2 == "SAM" || dig2 == "MAS")
}
