import React, { useRef, useEffect, useState, useCallback } from 'react';

import { realIP, serverPath } from '../../../utils/global';
import './style/TitleTheme.scss';
import axios from 'axios';
import { title } from 'process';

export const TitleTheme = (props: {
	title: any;
	keywords: any;
	showIcon: any;
	right: any;
	keywordsClick: any;
}) => {
    return (
		<div className="TitleThemeWrapper">
			<div className="TitleThemeLeft">
				<h2 className="TitleThemeLeft-hot-title">{props.title}</h2>
				<ul className="TitleThemeLeft-keywords">
					{props.keywords.map((item: any) => {
						return (
							<li
								className="TitleThemeLeft-keywords-item"
								key={item}
							>
								<a>{item}</a>
								<span className="TitleThemeLeft-keywords-item-line"></span>
							</li>
						);
					})}
				</ul>
			</div>
			<div className="TitleThemeRight">
				<span>{props.right}</span>
			</div>
		</div>
	);;

};
