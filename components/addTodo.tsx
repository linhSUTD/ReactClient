///<reference path="../typings/redux/redux.d.ts"/>
///<reference path="../typings/immutable/immutable.d.ts"/>
///<reference path="../typings/react/react-global.d.ts"/>
///<reference path="../typings/react-redux/react-redux.d.ts"/>

import * as React from 'react';
import * as Redux from 'redux';
import {connect} from 'react-redux';
import {Map} from 'immutable';

interface IAddTodoButtonProps {
	//events
	onAddButtonClick: () => void;
}

export class AddTodoButton extends React.Component<IAddTodoButtonProps, any>{

	public render() {
		return (
			<button onClick={e=> this.handleClick(e) }>Add a todo</button>
		);
	}

	public handleClick(e: React.MouseEvent) {
		this.props.onAddButtonClick();
	}
}