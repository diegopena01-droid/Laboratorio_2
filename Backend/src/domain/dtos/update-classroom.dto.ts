export class UpdateClassroomDTO {
  private constructor(
    public readonly code: string,
    public readonly building: string,
    public readonly capacity: number,
    public readonly floor: number,
    public readonly status: boolean
  ) {}

  static create(
    object: { [key: string]: any }
  ): [string | undefined, UpdateClassroomDTO?] {
    const {
      code,
      building,
      capacity,
      floor,
      status
    } = object;

    if (!code) return ["Missing code"];
    if (!building) return ["Missing building"];
    if (capacity === undefined || capacity === null) return ["Missing capacity"];
    if (floor === undefined || floor === null) return ["Missing floor"];
    if (status === undefined || status === null) return ["Missing status"];

    if (code && code.length > 20)
      return ["code is too large, max length is 20 characters"];
    if (building && building.length > 50)
      return ["building is too large, max length is 50 characters"];
    if (capacity && (capacity < 5 || capacity > 200))
      return ["Invalid capacity, must be between 5 and 200"];
    if (floor && (floor < 1 || floor > 10))
      return ["Invalid floor, must be between 1 and 10"];
    if (typeof status !== "boolean")
      return ["Invalid status"];

    return [
      undefined,
      new UpdateClassroomDTO(
        code,
        building,
        Number(capacity),
        Number(floor),
        status
      )
    ];
  }
}