import React from 'react';
import { headerLinks } from './common/localData';
import SearchField from './SearchField';
import './style/NavbarItems.scss';
function Navbar() {
	return (
		<div className="NavbarWrapper">
			<div className="CategoryList">
				{headerLinks.map((item) => {
					return (
						<li className="item" key={item.title}>
							{item.title}
						</li>
					);
				})}
				<SearchField />
				<button>登录</button>
			</div>
		</div>
	);
}

export default Navbar;
