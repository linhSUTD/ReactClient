///<reference path="../typings/redux/redux.d.ts"/>
///<reference path="../typings/immutable/immutable.d.ts"/>
///<reference path="../typings/react/react-global.d.ts"/>
///<reference path="../typings/react-redux/react-redux.d.ts"/>

import * as React from 'react';
import * as Redux from 'redux';
import {connect} from 'react-redux';
import {Map, List} from 'immutable';
import {AppStore} from '../store/index';
import {todoStore, ITodoItem, PushAction} from '../store/todoStore';
import {TodoItem} from './todoItem';
import {AddTodoButton} from './addTodo';
import * as PureRenderMixin  from 'react-addons-pure-render-mixin';

var created = 0;

interface ITodoFrameProp{
	todoItems: List<ITodoItem>;
}


export class TodoFrame extends React.Component<ITodoFrameProp, any>{
	mixins: any[];
	constructor(props: ITodoFrameProp){
		super(props);
		this.mixins = [PureRenderMixin];
	}

	public render() {
		console.log(`I have been rendered for ${++created} times`);
		return (
<div>
	<ul> 
	{this.props.todoItems.toArray().map((value, index)=>{
		return <TodoItem  name={value.name} done={value.done} key={index}/>
	})} 	
	</ul>
	<AddTodoButton onAddButtonClick={this.onAddButtonClick}/>
</div>
		);
	}
	
	private onAddButtonClick(){
		var pushAction = PushAction("Do dis", false);
		AppStore.dispatch(pushAction);
	} 
}

export var ToDoFrameProvider = connect(function(state: Map<string, any>) {
	var todoState = AppStore.getSubState<List<ITodoItem>>(todoStore.name);
	var props: ITodoFrameProp = {
		todoItems: todoState,
	};
	return props;
})(TodoFrame); 
