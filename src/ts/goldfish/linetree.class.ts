// A play is a particular game action or response
export interface Play {

}

// A line is a series of plays meant to accomplish a goal
export interface Line {

}

export class DecisionTree {
  public availablePlays: Play[];
  public winningLines: Line[];
  public currentLine: Line;
}
