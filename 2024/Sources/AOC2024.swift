import ArgumentParser

@main
struct AOC2024: ParsableCommand {
  @Argument var day: Int
  @Argument var part: String

  public func run() throws {

    // Load input from txt file with name /inputs/dayXX.txt
    let fileName = "inputs/day\(String(format: "%02d", day)).txt"
    let input = try String(contentsOfFile: fileName)

    switch (day, part) {
    case (1, "a"):
      Day1.runA(input)
    case (1, "b"):
      Day1.runB(input)
    case (2, "a"):
      Day2.runA(input)
    case (2, "b"):
      Day2.runB(input)
    default:
      print("Day \(day) part \(part) not implemented")
    }
  }
}

protocol Day {
  static func runA(_ input: String)
  static func runB(_ input: String)
}
