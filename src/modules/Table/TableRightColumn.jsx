import React from 'react';
import Scrollbar from 'react-scrollbars-custom';
import styled from 'styled-components';
import Loading from '../../library/common/CommonComponents/Loading';

const Column = styled(Scrollbar)`
  display: flex;
  justify-content: center;
  min-height: 500px;
`;

const Th = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #000;
  &:nth-last-child(1) {
    border-left: 1px solid #000;
  }
`;

const Content = styled.span`
  display: flex;
  justify-content: center;
  margin: 10px;
`;


export default function TableRightColumn(props){

	const { detailInfo } = props;

	return (
		<Column>
			<Th>List detail</Th>
			{detailInfo && detailInfo.name && (
				<Th>
            name station: {detailInfo && detailInfo.name} - lenght:
					{detailInfo && detailInfo.name && detailInfo.stations.length}
				</Th>
			)}
			{detailInfo && detailInfo.name ? (
				detailInfo.stations.map((station, index) => {
					return <Content key={index}>{station.name}</Content>;
				})
			) : (
				<Loading />
			)}
		</Column>
	);
	
}