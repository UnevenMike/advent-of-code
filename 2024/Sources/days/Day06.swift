public struct Day6: Day {
    public static func runA(_ input: String) {
        let grid = Grid(input)
        var positions: Set<Position> = []
        positions.insert(Position(x: grid.position.0, y: grid.position.1))
        while grid.isInGrid {
            grid.walk()
            positions.insert(Position(x: grid.position.0, y: grid.position.1))
        }
        print("Number of positions: \(positions.count)")
    }

    public static func runB(_ input: String) {

        let grid = Grid(input)
        let startingPosition: Position = Position(x: grid.position.0, y: grid.position.1)

        var positions: Set<Position> = []
        positions.insert(Position(x: grid.position.0, y: grid.position.1))
        while grid.isInGrid {
            grid.walk()
            positions.insert(Position(x: grid.position.0, y: grid.position.1))
        }

        var loopCount = 0
        for position in positions {
            if position == startingPosition {
                continue
            }

            let freshGrid = Grid(input, extrax: position.x, extray: position.y)
            var freshPositions: Set<PositionWithDirection> = []
            freshPositions.insert(
                PositionWithDirection(
                    x: freshGrid.position.0, y: freshGrid.position.1,
                    direction: freshGrid.currentDirectionIndex))
            while freshGrid.isInGrid {
                freshGrid.walk()

                if freshGrid.isInGrid {
                    if freshPositions.contains(
                        PositionWithDirection(
                            x: freshGrid.position.0, y: freshGrid.position.1,
                            direction: freshGrid.currentDirectionIndex))
                    {
                        loopCount += 1
                        break
                    }

                    freshPositions.insert(
                        PositionWithDirection(
                            x: freshGrid.position.0, y: freshGrid.position.1,
                            direction: freshGrid.currentDirectionIndex))
                }

            }
        }

        print(loopCount)
    }
}
struct Position: Hashable {
    let x: Int
    let y: Int

    func hash(into hasher: inout Hasher) {
        hasher.combine(x)
        hasher.combine(y)
    }
}
struct PositionWithDirection: Hashable {
    let x: Int
    let y: Int
    let direction: Int

    func hash(into hasher: inout Hasher) {
        hasher.combine(x)
        hasher.combine(y)
        hasher.combine(direction)
    }
}
class Grid {
    var grid: [[Character]]
    let directions = [(-1, 0), (0, 1), (1, 0), (0, -1)]  // UP, RIGHT, DOWN, LEFT
    let pointerChars = ["^", ">", "v", "<"]
    var currentDirectionIndex = 0
    var position: (Int, Int)
    var isInGrid = true

    init(_ input: String) {
        // Parse characters from input into grid
        let lines = input.split(whereSeparator: \.isNewline)
        var tempgrid = lines.map { Array($0) }

        // Find pos of ^ character
        position = (-1, -1)
        for (i, row) in tempgrid.enumerated() {
            if let j = row.firstIndex(of: "^") {
                position = (i, j)
                // Replace ^ with .
                tempgrid[i][j] = "."
                break
            }
        }
        grid = tempgrid
        if position == (-1, -1) {
            fatalError("No starting position found")
        }
    }

    init(_ input: String, extrax: Int, extray: Int) {
        let lines = input.split(whereSeparator: \.isNewline)
        var tempgrid = lines.map { Array($0) }

        // Find pos of ^ character
        position = (-1, -1)
        for (i, row) in tempgrid.enumerated() {
            if let j = row.firstIndex(of: "^") {
                position = (i, j)
                // Replace ^ with .
                tempgrid[i][j] = "."
                break
            }
        }
        grid = tempgrid
        if position == (-1, -1) {
            fatalError("No starting position found")
        }
        addBarrier(extrax, extray)

        let nextPosition = (
            position.0 + directions[currentDirectionIndex].0,
            position.1 + directions[currentDirectionIndex].1
        )
        if nextPosition.0 == extrax && nextPosition.1 == extray {
            currentDirectionIndex = (currentDirectionIndex + 1) % 4
        }
    }

    private func addBarrier(_ x: Int, _ y: Int) {
        grid[x][y] = "#"
    }

    func isInGrid(_ x: Int, _ y: Int) -> Bool {
        return x >= 0 && x < grid.count && y >= 0 && y < grid[0].count
    }

    func walk() {
        if !isInGrid {
            return
        }

        // Check if we can move in the current direction
        let nextPosition = (
            position.0 + directions[currentDirectionIndex].0,
            position.1 + directions[currentDirectionIndex].1
        )

        // Check if we are still in the grid
        if nextPosition.0 < 0 || nextPosition.0 >= grid.count || nextPosition.1 < 0
            || nextPosition.1 >= grid[0].count
        {
            isInGrid = false
            return
        }

        // Move
        position = nextPosition

        // While the nextNextPosition is a wall, turn right
        let initialDirectionIndex = currentDirectionIndex
        for _ in 0..<3 {
            let nextNextPosition = (
                position.0 + directions[currentDirectionIndex].0,
                position.1 + directions[currentDirectionIndex].1
            )
            if isInGrid(nextNextPosition.0, nextNextPosition.1) == false {
                continue
            }

            if grid[nextNextPosition.0][nextNextPosition.1] == "#" {
                currentDirectionIndex = (currentDirectionIndex + 1) % 4
            } else {
                break
            }
        }

    }
}
extension Grid: CustomStringConvertible {
    var description: String {
        var desc = ""
        for (i, row) in grid.enumerated() {
            if i == position.0 {
                var newRow = row
                newRow[position.1] = pointerChars[currentDirectionIndex].first!
                desc += String(newRow) + "\n"
            } else {
                desc += String(row) + "\n"
            }
        }
        return desc
    }
}
