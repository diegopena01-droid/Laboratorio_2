export class UpdateProfessorDTO {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly specialty: string,
    public readonly department: string,
    public readonly status: boolean
  ) {}

  static create(
    object: { [key: string]: any }
  ): [string | undefined, UpdateProfessorDTO?] {
    const {
      name,
      email,
      phone,
      specialty,
      department,
      status
    } = object;

    if (!name) return ["Missing name"];
    if (!email) return ["Missing email"];
    if (!phone) return ["Missing phone"];
    if (!specialty) return ["Missing specialty"];
    if (!department) return ["Missing department"];
    if (status === undefined || status === null) return ["Missing status"];

    if (name && name.length > 100)
      return ["name is too large, max length is 100 characters"];
    if (email && email.length > 150)
      return ["email is too large, max length is 150 characters"];
    if (phone && phone.length > 10)
      return ["phone is too large, max length is 10 characters"];
    if (specialty && specialty.length > 100)
      return ["specialty is too large, max length is 100 characters"];
    if (department && department.length > 100)
      return ["department is too large, max length is 100 characters"];
    if (typeof status !== "boolean")
      return ["Invalid status"];

    return [
      undefined,
      new UpdateProfessorDTO(
        name,
        email,
        phone,
        specialty,
        department,
        status
      )
    ];
  }
}
