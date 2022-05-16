import { Component } from 'react';
import './search-panel.css';

class Searchpanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			term: '',
		};
	}

	OnUpdateSearch2 = (e) => {
		//! получаем введенное значение при событии
		const term = e.target.value;
		//! установка локального состояния term
		this.setState({ term });
		//! пробрасываем состояние наверх.
		this.props.onUpdateSearch(term);
	};

	render() {
		return (
			<input
				type="text"
				className="form-control search-input"
				placeholder="Найти сотрудника"
				value={this.state.term}
				onChange={this.OnUpdateSearch2}
			/>
		);
	}
}

export default Searchpanel;
