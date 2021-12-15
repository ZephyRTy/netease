import React, { useEffect } from 'react';
import { cookie, realIP, serverPath } from '../../../utils/global';
export const NewAlbum = ()=>{
    let newalbum: any;
    useEffect(()=>{
        const url = `${serverPath}/top/album?realIP=${realIP}`;
        fetch(url, {
			method: 'GET'
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				console.log(data);
			})
			.catch((err) => console.log(err));
    });
    return (
        <div>
        </div>
    )
}