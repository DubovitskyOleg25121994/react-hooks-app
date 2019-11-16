import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { instance } from '../../library/api/citybik.api';


import TableLeftColumn from '../Table/TableLeftColumn';
import TableRightColumn from '../Table/TableRightColumn';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Table = styled.div`
  display: flex;
  border: 1px solid #000;   
  min-height: 500px;
`;


export default function TableScreen() {
	const [state, setState] = useState({ data: [] });
	const [detailInfo, setDetailInfo] = useState(null);
	const [selectedItem, setSelectedItem] = useState(null);
	const [likes, setLikes] = useState([]);

	useEffect(() => {
		let ignore = false;
		const axiosRequest = async () => {
			const getNetwork = await instance.get('/v2/networks');
			const { networks } = getNetwork.data;
			const href = networks[0].href;
			const getDefaultValue = await instance.get(href);
			if (!ignore) {
				const data = await getNetwork.data;
				const { network } = getDefaultValue.data;
				setState({ data });
				setDetailInfo(network);
				setSelectedItem(0);
				const createLikes = [];
				for (let i = 0; i < networks.length; i++) {
					createLikes.push({
						name: networks[i].name,
						checked: false
					});
				}
				setLikes(createLikes);
			}
		};
		axiosRequest();

		return () => {
			ignore = true;
		};
	}, []);

	const onSelectStation = useCallback(
		async index => {
			let cache = {};
			const { networks } = state.data;
			if (index in cache) {
				setSelectedItem(index);
				setDetailInfo(cache[index]);
			} else {
				const href = networks[index].href;
				const getDataInfo = await instance.get(href);
				const { network } = getDataInfo.data;
				cache[index] = network;
				setSelectedItem(index);
				setDetailInfo(network);
			}
		},
		[state.data]
	);

	const onChangeLikes = useCallback(
		index => {
			const deepCopy = Object.assign({}, likes);
			deepCopy[index].checked = !deepCopy[index].checked;
			setLikes(deepCopy);
		},
		[likes]
	);

	
	return (
		<Container>
			<Table>
				<TableLeftColumn likes={likes} onSelectStation={onSelectStation} selectedItem={selectedItem} state={state} onChangeLikes={onChangeLikes} />
				<TableRightColumn  detailInfo={detailInfo}/>
			</Table>
		</Container>
	);
}