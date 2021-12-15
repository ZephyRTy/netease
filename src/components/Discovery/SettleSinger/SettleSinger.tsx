import React, { useEffect } from 'react';
import { cookie, realIP, serverPath } from '../../../utils/global';
export const SettleSinger = () => {
	let settlesinger: any;
	useEffect(() => {
		const url = `${serverPath}/artist/list?realIP=${realIP}`;
		fetch(url, {
			method: 'GET'
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				settlesinger = data['artists'];
			})
			.catch((err) => console.log(err));
	});

	return <div></div>;
};
