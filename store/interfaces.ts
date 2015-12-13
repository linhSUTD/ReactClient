export interface IAction{
	subStore: string;
	type: number;
}

export interface ISubStore{
	name: string;
	reducer: (state: any, action: IAction) => any;
	initialState: any;
}
