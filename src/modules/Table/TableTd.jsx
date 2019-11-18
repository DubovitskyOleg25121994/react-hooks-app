import React, { useCallback } from 'react';
import iconHeart from '../../resources/icons/icons8-heart-50.png';
import iconHeartPurple from '../../resources/icons/icons8-heart-30.png';
import styled from 'styled-components';

const Image = styled.img`
  width: 15px;
  margin-left: 10px;
  color: red;
`;

const SelectedStation = styled.div`
  min-width: 230px;
`;

export default function TableTd(props) {
	const onSelected = useCallback(() => {
		const { index, onSelectStation } = props;
		onSelectStation(index);
	}, [props]);

	const onChangeLike = useCallback(() => {
		const { index, onChangeLikes } = props;
		onChangeLikes(index);
	}, [props]);

	const { name, index, likes } = props;

	return (
		<>
			<SelectedStation>
				<div onClick={onSelected}>{name}</div>
			</SelectedStation>
			<div>
				{likes[index] && likes[index].checked ? (
					<Image
						key={index + 999}
						onClick={onChangeLike}
						src={iconHeartPurple}
						alt="icon_heart_2"
					/>
				) : (
					<Image
						key={index + 999}
						onClick={onChangeLike}
						src={iconHeart}
						alt="icon_heart_1"
					/>
				)}
			</div>
		</>
	);
}
