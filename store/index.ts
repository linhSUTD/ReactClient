///<reference path="../typings/redux/redux.d.ts"/>
///<reference path="../typings/immutable/immutable.d.ts"/>
import {Map, List} from 'immutable';
import * as Redux from 'redux';
import {IAction, ISubStore} from './interfaces';
import {todoStore} from "./todoStore";

var _initialState = Map<string, any>();

/**
 * Decorator for registering the application substores. This might be used for different routes on the web app
 * @param subStores List of application sub stores
 */
function registerStore(...subStores: ISubStore[]) {
	return function _registerStore(target: Function) {
		var _subStores: {[name:string]: ISubStore} = {};
		
		//define the application store
		var store = Redux.createStore(function(state: Map<string, any>, action: IAction) {
			//this is for initializing the registered states
			if(action.subStore == "@RESETSTATE"){
				return (<any>action).data;
			}
			
			//get the subStoreObject which contains information about the sub store
			var subStore = _subStores[action.subStore];
			
			//get the subState that corresponding to that sub store
			var subState = state.get(action.subStore);
			
			//return the old state if the sub store/state is not found
			if(!subStore || !subState){return state};
			
			//get a new state
			return state.set(action.subStore, subStore.reducer(subState, action));
			
		}, _initialState);
		
		
		Object.defineProperty(target, "store", {
			enumerable: true,
			configurable: false,
			get: function() {
				return store;
			},
			set: function(_value: any) {
				return;
			}
		});
		
		//register the sub stores here
		var state = <Map<string, any>>store.getState();
		for(var _subStore of subStores){
			state = state.set(_subStore.name, _subStore.initialState);
			_subStores[_subStore.name] = _subStore;
		}
		//dispatch the first change to the store to initialize it
		store.dispatch({
			subStore: "@RESETSTATE",
			type: 0,
			data: state
		});
	}
}


@registerStore(
	todoStore
)
export class AppStore{
	public static store: Redux.Store;
	
	public static getState(): Map<string, any>{
		return AppStore.store.getState();
	}
	
	public static getSubState<TState>(subStoreName: string): TState{
		return <TState>AppStore.getState().get(subStoreName);
	}
	
	public static dispatch<TAction extends IAction>(action: TAction){
		AppStore.store.dispatch(action);
	}
}