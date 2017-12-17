export class Recipe {
	public id: number;
	public name: string;
	public email: string;
  public description: string;
  public picture: string;

	constructor(
		id = -1,
		name = '',
		email = '',
    description = '',
    picture = '') {
		this.id = id;
		this.name = name;
		this.email = email;
    this.description = description;
    this.picture = picture;
	}
}
