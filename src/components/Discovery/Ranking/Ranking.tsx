import React, {useEffect} from 'react';
import { cookie, realIP, serverPath } from '../../../utils/global';
export const Ranking = () => {
    let speedranking: any;
    let newsongranking: any;
    let originalranking: any;
    useEffect(()=>{
        const url = `${serverPath}/playlist/detail?id=19723756`;
        fetch(url, {
			method: 'GET'
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				speedranking = data['playlist']
			})
			.catch((err) => console.log(err));
    
        const url1 = `${serverPath}/playlist/detail?id=3779629`;
		fetch(url1, {
			method: 'GET'
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				newsongranking = data['playlist'];
			})
			.catch((err) => console.log(err));
        

        const url3 = `${serverPath}/playlist/detail?id=2884035`;
		fetch(url3, {
			method: 'GET'
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				originalranking = data['playlist'];
                console.log(originalranking)
			})
			.catch((err) => console.log(err));
        });
    

    return (
        <div>

        </div>
    )
}