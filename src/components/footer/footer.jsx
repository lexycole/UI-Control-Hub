import React from 'react';

class Footer extends React.Component {
	constructor(props) {
		super(props);
		
		var date = new Date();
		this.state = {
			year: date.getFullYear()
		}
	}
	render() {
		return (
			<div id="footer" className="footer">
				&copy; { this.state.year } Aivoluon 2023 - All Rights Reserved
			</div>
		)
	}
}

export default Footer;