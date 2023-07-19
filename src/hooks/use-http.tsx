"use client"

import { useCallback, useState } from "react";
import axios, { AxiosResponse } from "axios";

interface RequestConfig {
	url: string;
	method: "GET" | "POST";
	data?: any;
	token?: string;
}

const useHttp = () => {
	const sendRequest = useCallback(
		(requestConfig: RequestConfig, applyData: (data: any) => void) => {
			if (requestConfig.method === "GET") {
				axios
					.get(requestConfig.url, {
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${requestConfig.token}`,
						},
					})
					.then((response: AxiosResponse<any>) => {
						applyData(response.data);
					})
					.catch((err) => {
						console.error(err);
					});
			} else if (requestConfig.method === "POST") {
				axios
					.post(requestConfig.url, requestConfig.data, {
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${requestConfig.token}`,
						},
					})
					.then((response: AxiosResponse<any>) => {
						applyData(response.data);
					})
					.catch((err) => {
						console.error(err);
						console.log("Token expired!");
					});
			}
		},
		[]
	);

	return {
		sendRequest,
	};
};

export default useHttp;
