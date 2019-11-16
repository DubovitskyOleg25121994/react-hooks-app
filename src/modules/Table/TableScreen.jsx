import React, { useState, useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';
import Scrollbar from 'react-scrollbars-custom';
import { instance } from '../../library/api/citybik.api';
import TableTd from './TableTd';
import Loading from '../../library/common/CommonComponents/Loading';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Table = styled.div`
  display: flex;
  border: 1px solid #000;   
  min-height: 500px;
`;

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

const ColumnTd = styled.div`
  display: flex;
  padding: 10px;
  justify-content: center;
  border-bottom: 1px solid #000;
  ${props =>
        props.selected &&
        css`
      background-color: #f7f7f7;
    `}
`;

const Content = styled.span`
  display: flex;
  justify-content: center;
  margin: 10px;
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

    const { data } = state;
    return (
        <Container>
            <Table>
                <Column>
                    <Th>Networks</Th>
                    {state && data.networks ? (
                        data.networks.map((item, index) => {
                            return (
                                <ColumnTd
                                    selected={selectedItem === index ? true : ''}
                                    key={item.id}
                                >
                                    <TableTd
                                        name={item.company}
                                        key={item.id}
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
            </Table>
        </Container>
    );
}