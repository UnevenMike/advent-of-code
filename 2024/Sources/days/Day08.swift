import Foundation

public struct Day8: Day {
    public static func runA(_ input: String) {
        let (width, height) = parseGridSize(input)
        let map = parseInput(input)

        var uniqueAntiNodes: Set<Position> = []
        for (char, positions) in map {

            for i in 0..<positions.count {
                for j in i + 1..<positions.count {
                    let (antiNode1, antiNode2) = findAntiNodeFromPositions(
                        positionA: positions[i], positionB: positions[j])
                    if antiNode1.x >= 0 && antiNode1.x < width && antiNode1.y >= 0
                        && antiNode1.y < height
                    {
                        uniqueAntiNodes.insert(antiNode1)
                    }
                    if antiNode2.x >= 0 && antiNode2.x < width && antiNode2.y >= 0
                        && antiNode2.y < height
                    {
                        uniqueAntiNodes.insert(antiNode2)
                    }
                }
            }

        }
        print(uniqueAntiNodes.count)
    }

    public static func runB(_ input: String) {
        let (width, height) = parseGridSize(input)
        let map = parseInput(input)

        var uniqueAntiNodes: Set<Position> = []
        for (char, positions) in map {

            for i in 0..<positions.count {
                for j in i + 1..<positions.count {
                    let newAntiNodes = findAllAntiNodeFromPositions(
                        positionA: positions[i], positionB: positions[j], width: width,
                        height: height)
                    for antiNode in newAntiNodes {
                        uniqueAntiNodes.insert(antiNode)
                    }
                }
            }

        }
        print(uniqueAntiNodes.count)
    }
}
func parseInput(_ input: String) -> [Character: [Position]] {
    var map: [Character: [Position]] = [:]
    let lines = input.split(whereSeparator: \.isNewline)
    for (y, line) in lines.enumerated() {
        for (x, char) in line.enumerated() {
            if char != "." {
                let position = Position(x: x, y: y)
                if map[char] == nil {
                    map[char] = [position]
                } else {
                    map[char]!.append(position)
                }
            }
        }
    }
    return map
}
func parseGridSize(_ input: String) -> (Int, Int) {
    let lines = input.split(whereSeparator: \.isNewline)
    return (lines[0].count, lines.count)
}
func findAntiNodeFromPositions(positionA: Position, positionB: Position) -> (Position, Position) {
    let antiNode1 = Position(x: 2 * positionA.x - positionB.x, y: 2 * positionA.y - positionB.y)
    let antiNode2 = Position(x: 2 * positionB.x - positionA.x, y: 2 * positionB.y - positionA.y)
    return (antiNode1, antiNode2)
}
func findAllAntiNodeFromPositions(positionA: Position, positionB: Position, width: Int, height: Int)
    -> [Position]
{
    let xdist = positionA.x - positionB.x
    let ydist = positionA.y - positionB.y

    let gcd = gcd(xdist, ydist)
    let xstep = xdist / gcd
    let ystep = ydist / gcd

    var x = positionA.x
    var y = positionA.y

    var antiNodes: [Position] = [positionA, positionB]

    // Walk forwards from positionA
    while x >= 0 && x < width && y >= 0 && y < height {
        x += xstep
        y += ystep
        if x < 0 || x >= width || y < 0 || y >= height {
            break
        }
        let antiNode = Position(x: x, y: y)
        antiNodes.append(antiNode)
    }

    //Walk backwards from positionA
    x = positionA.x
    y = positionA.y
    while x >= 0 && x < width && y >= 0 && y < height {
        x -= xstep
        y -= ystep
        if x < 0 || x >= width || y < 0 || y >= height {
            break
        }
        let antiNode = Position(x: x, y: y)
        antiNodes.append(antiNode)
    }

    return antiNodes
}
func gcd(_ a: Int, _ b: Int) -> Int {
    let remainder = abs(a) % abs(b)
    if remainder != 0 {
        return gcd(abs(b), remainder)
    } else {
        return abs(b)
    }
}
