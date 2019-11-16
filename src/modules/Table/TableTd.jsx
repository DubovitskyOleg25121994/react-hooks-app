import React from 'react';
import iconHeart from '../../resources/icons/icons8-heart-50.png';
import iconHeartPurple from '../../resources/icons/icons8-heart-30.png';
import styled from 'styled-components';

const Image = styled.img`
  width: 15px;
  margin-left: 10px;
  color: red;
`;

export default function TableTd(props) {
	const onSelected = () => {
		const { index, onSelectStation } = props;
		onSelectStation(index);
	};

	const onChangeLike = () => {
		const { index, onChangeLikes } = props;
		onChangeLikes(index);
	};

	const { name, index, likes } = props;

	return (
		<>
			<div style={{ minWidth: '230px' }}>
				<div onClick={onSelected}>{name}</div>
			</div>
			<div>
				{likes[index] && likes[index].checked ? (
					<Image
						key={index}
						onClick={onChangeLike}
						src={iconHeartPurple}
						alt="icon_heart_2"
					/>
				) : (
					<Image
						key={index}
						onClick={onChangeLike}
						src={iconHeart}
						alt="icon_heart_1"
					/>
				)}
			</div>
		</>
	);
}
