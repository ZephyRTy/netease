/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';

export function useDataFetch<T>(
	fn: () => Promise<T | void> | undefined,
	setState: React.Dispatch<React.SetStateAction<T>>,
	deps: React.DependencyList,
	replace?: any
) {
	useEffect(() => {
		if (typeof replace !== 'undefined') {
			setState(replace);
		}
		let flag = true;
		fn()?.then((res) => {
			if (flag) {
				setState(res!);
			}
		});
		return () => {
			flag = false;
		};
	}, deps);
}
