export class Coordinate {

  constructor(
    public lat?:  number |null,
    public lon?:  number | null,
  )
  { }

  public static newNull(): Coordinate {
    return new Coordinate(null, null);
  }

}
