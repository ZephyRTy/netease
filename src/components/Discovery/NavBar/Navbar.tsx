import React from 'react';
import { headerLinks } from './common/localData';
import {SearchField} from './SearchField';
import './style/NavbarItems.scss';
export const  Navbar = () => {
	return (
		<div className="NavbarWrapper">
			<div className="CategoryList">
				{headerLinks.map((item) => {
					return (
						<li className="CategoryList-item" key={item.title}>
							{item.title}
						</li>
					);
				})}
				
			</div>
		</div>
	);
}


