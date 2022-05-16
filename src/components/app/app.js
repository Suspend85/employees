import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../emloyees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';
// import { toHaveFocus } from '@testing-library/jest-dom/dist/matchers';
// import { toHaveStyle } from '@testing-library/jest-dom/dist/matchers';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{ name: 'John C.', salary: 800, increase: false, rise: true, id: 1 },
				{ name: 'Alex M.', salary: 3000, increase: true, rise: false, id: 2 },
				{ name: 'Carl W.', salary: 15000, increase: false, rise: false, id: 3 },
			],
			term: '',
			filter: 'all',
		};
		this.maxId = this.state.data.length + 1; // инкремент для id сотрудника
	}

	deleteItem = (id) => {
		this.setState(({ data }) => {
			return {
				data: data.filter((item) => item.id !== id),
			};
		});
	};

	addItem = (name, salary) => {
		const newItem = {
			name,
			salary,
			increase: false,
			rise: false,
			id: this.maxId++,
		};
		this.setState(({ data }) => ({ data: [...data, newItem] }));
	};

	onToggleProp = (id, prop) => {
		// this.setState(({ data }) => {
		// const index = data.findIndex((elem) => elem.id === id);
		// const old = data[index];
		// const newItem = { ...old, increase: !old.increase };
		// const newArray = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
		// return {
		// 	data: newArray,
		// };
		// });

		this.setState(({ data }) => ({
			data: data.map((item) => {
				if (item.id === id) {
					return { ...item, [prop]: !item[prop] };
				}
				return item;
			}),
		}));
	};

	searchEmp = (items, term) => {
		if (term.length === 0) {
			return items;
		}

		return items.filter((item) => {
			return item.name.indexOf(term) > -1;
		});
	};

	onUpdateSearch = (term) => {
		//! {term} - Сокращенная запись объекта {term:term}
		this.setState({ term });
	};

	filterPost = (items, filter) => {
		switch (filter) {
			case 'rise':
				return items.filter((item) => item.rise);
			case 'moreThen1000':
				return items.filter((item) => item.salary > 1000);
			default:
				return items;
		}
	};

	onFilterSelect = (filter) => {
		this.setState({ filter });
	};

	render() {
		const { data, term, filter } = this.state;
		const employees = this.state.data.length;
		const increased = this.state.data.filter((item) => item.increase).length;
		// const visibleData = this.searchEmp(data, term);
		//* делаем двойную фильтрацию. По поиску и по кнопкам.
		const visibleData = this.filterPost(this.searchEmp(data, term), filter);

		return (
			<div className="app">
				<AppInfo employees={employees} increased={increased} />

				<div className="search-panel">
					<SearchPanel onUpdateSearch={this.onUpdateSearch} />
					<AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
				</div>
				<EmployeesList
					data={visibleData}
					onDelete={this.deleteItem}
					onToggleProp={this.onToggleProp}
					// onToggleRise={this.onToggleRise}
				/>
				<EmployeesAddForm onAdd={this.addItem} />
			</div>
		);
	}
}

export default App;
