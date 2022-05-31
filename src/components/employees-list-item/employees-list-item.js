import { Component } from 'react';
import './employees-list-item.css';

class EmployeesListItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentSalary: 0,
		};
	}

	onSalaryChange2 = (e) => {
		e.target.value = e.target.value.replace(/[^\d]/g, '');
		const salaryChange = e.target.value;
		this.setState({ currentSalary: salaryChange });
		this.props.onSalaryChange(this.props.name, salaryChange);
	};
	onSalaryInput = (e) => {
		let sal = 0;
		if (!e.target.value) {
			e.target.value = 0 + '$';
		} else {
			e.target.value = `${e.target.value.replace(/[^\d]/g, '')}$`;
		}
		console.log(e.target.value);
		this.setState({ currentSalary: sal });
	};
	
	render() {
		const { name, salary, onDelete, onToggleProp, increase, rise } = this.props;

		let classNames = 'list-group-item d-flex justify-content-between';
		if (increase) {
			classNames += ' increase';
		}
		if (rise) {
			classNames += ' like';
		}

		return (
			<li className={classNames}>
				<span className="list-group-item-label" onClick={onToggleProp} data-toggle="rise"
					// style={{ fontSize: '40px', color: 'red', transition: 'all', WebkitTransition: 'all', msTransition: 'all' }}
				>
					{name}
				</span>
				<input
					
					type="text"
					className="list-group-item-input"
					defaultValue={salary + '$'}
					onChange={this.onSalaryChange2}
					onBlur={this.onSalaryInput}
				/>
				<div className="d-flex justify-content-center align-items-center">
					<button type="button" className="btn-cookie btn-sm " onClick={onToggleProp} data-toggle="increase">
						<i className="fas fa-cookie"></i>
					</button>
					<button type="button" className="btn-trash btn-sm" onClick={onDelete}>
						<i className="fas fa-trash"></i>
					</button>
					<i className="fas fa-star"></i>
				</div>
			</li>
		);
	}
}

export default EmployeesListItem;
