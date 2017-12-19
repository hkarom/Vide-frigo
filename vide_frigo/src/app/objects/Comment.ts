export class Comment {
	public id: number;
	public id_user: string;
	public id_recipe: number;
  public message: string;
	public star: number;


	constructor(
		id = -1,
		id_user = 'TEST',
		id_recipe = -1,
    message = '',
		star = 0) {
		this.id = id;
		this.id_user = id_user;
		this.id_recipe = id_recipe;
		this.message = message;
    this.star = star;
	}
}
