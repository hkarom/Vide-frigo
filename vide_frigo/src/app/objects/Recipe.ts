export class Recipe {
	public id: number;
	public name_creator: string;
	public name: string;
  public picture: string;
	public preparation_time: string;
	public steps: string;
	public category: string;
	public mark: number;
	public nb_vote: number;

	constructor(
		id = -1,
		name_creator = '',
		name = '',
    picture = '',
		preparation_time = '',
		steps = '',
		category = '',
		mark = 0,
		nb_vote = 0) {
		this.id = id;
		this.name_creator = name_creator;
		this.name = name;
		this.picture = picture;
		this.preparation_time = preparation_time;
    this.steps = steps;
    this.category = category;
		this.mark = mark;
		this.nb_vote = nb_vote;
	}
}
