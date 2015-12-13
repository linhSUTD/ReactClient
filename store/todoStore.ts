///<reference path="../typings/redux/redux.d.ts"/>
///<reference path="../typings/immutable/immutable.d.ts"/>
import {Map, List} from 'immutable';
import * as Redux from 'redux';
import {IAction, ISubStore} from './interfaces';

const SUBSTORENAME = "TODO";

export interface ITodoItem {
    name: string,
    done: boolean
}

export enum TodoAction {
    Push,
}

interface IPushAction extends IAction {
    name: string;
    done: boolean;
}

export function PushAction(name: string, done: boolean): IPushAction {
    var pushAction: IPushAction = {
        type: TodoAction.Push,
        subStore: SUBSTORENAME,
        name: name,
        done: done,
    };
    return pushAction;
}

var _storeState = List<ITodoItem>();
var todoState = _storeState
    .push({
        name: "Learn react",
        done: false,
    })
    .push({
        name: "Send email",
        done: true,
    })

function pushTodoItem(state: List<ITodoItem>, action: IPushAction) {
    return state.push({
        name: action.name,
        done: action.done
    });
}

function todoReducer(state: List<ITodoItem>, action: IAction): any {
    switch (action.type) {
        default:
            return state;
        case TodoAction.Push:
            return pushTodoItem(state, <IPushAction>action);
    }

}

export var todoStore: ISubStore = {
    reducer: todoReducer,
    name: SUBSTORENAME,
    initialState: todoState
};