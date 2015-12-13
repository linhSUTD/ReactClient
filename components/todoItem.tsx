///<reference path="../typings/redux/redux.d.ts"/>
///<reference path="../typings/immutable/immutable.d.ts"/>
///<reference path="../typings/react/react-global.d.ts"/>
///<reference path="../typings/react-redux/react-redux.d.ts"/>

import * as React from 'react';
import * as Redux from 'redux';
import {connect} from 'react-redux';
import {Map} from 'immutable';

interface ITodoItemProps{
	key?: number;
	name: string;
	done: boolean;
}

export class TodoItem extends React.Component<ITodoItemProps, any>{
	constructor(props: ITodoItemProps){
		console.log("Rerendered");
		super(props);
	}

	public render(){
		return (
            <li>
                <p>{this.props.name}</p>
                <p>{this.props.done? "true": "false"}</p>
            </li>
		);
	}
}