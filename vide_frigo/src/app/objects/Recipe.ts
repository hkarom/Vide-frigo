export class Recipe {
	public id: number;
	public id_creator: number;
	public name: string;
  public picture: string;
  public cooking_time: string;
	public preparation_time: string;
	public steps: string;
	public category: string;
	public mark: number;
	public nb_vote: number;

	constructor(
		id = -1,
		id_creator = -1,
		name = '',
    picture = '',
    cooking_time = '',
		preparation_time = '',
		steps = '',
		category = '',
		mark = 0,
		nb_vote = 0) {
		this.id = id;
		this.id_creator = id_creator;
		this.name = name;
		this.picture = picture;
		this.cooking_time = cooking_time;
		this.preparation_time = preparation_time;
    this.steps = steps;
    this.category = category;
		this.mark = mark;
		this.nb_vote = nb_vote;
	}
}
