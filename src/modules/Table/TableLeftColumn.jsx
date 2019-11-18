import React from 'react';
import styled from 'styled-components';
import Scrollbar from 'react-scrollbars-custom';
import Loading from '../../library/common/CommonComponents/Loading';
import TableTd from './TableTd';

const Column = styled(Scrollbar)`
  display: flex;
  justify-content: center;
  min-height: 500px;
`;

const ColumnTd = styled.div`
  display: flex;
  padding: 10px;
  justify-content: center;
  border-bottom: 1px solid #000;
  background-color: ${props => props.selected && '#f7f7f7'}
`;

const Th = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #000;
  &:nth-last-child(1) {
    border-left: 1px solid #000;
  }
`;


export default function TableLeftColumn(props){
	const { state, selectedItem, onSelectStation, onChangeLikes, likes } = props;
	const { networks } = state;
    
	return (
		<Column>
			<Th>Networks</Th>
			{state && networks ? (
				networks.map(({company }, index) => {
					return (
						<ColumnTd
							selected={selectedItem === index}
							key={index+300}
						>
							<TableTd
								name={company}
								key={index+300}
								onSelectStation={onSelectStation}
								onChangeLikes={onChangeLikes}
								likes={likes}
								index={index}
							/>
						</ColumnTd>
					);
				})
			) : (
				<Loading />
			)}
		</Column>
	);

}

