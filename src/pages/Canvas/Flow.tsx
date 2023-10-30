import React, { useEffect, useState, useCallback, MouseEvent, useRef, useMemo } from 'react';
import ReactFlow, {
  Background,
  Node,
  Controls,
  MiniMap,
  useNodesState,
  useReactFlow,
  ReactFlowProvider,
  Panel,
} from 'reactflow';

import 'reactflow/dist/base.css';
import './Canvas.css';
import SearchNode from './SearchNode';
import PokemonNode from './PokemonNode';

const nodeTypes = {
  SearchNode,
  PokemonNode
}

function FlowProvider() {

    const { getNode, getNodes } = useReactFlow();

    const onChange = (pokemon: string) => {
        console.log(pokemon);

        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then ( async (res) => {
            const answer = await res.json();
            console.log(answer);

            const searchNode = getNode('0');

            const newPokemon : Node = {
              id: `${getNodes().length}`,
              position: { x: searchNode?.position.x || 100, y: ( searchNode?.position.y || 100 ) + 220 },
              data: answer,
              style: {
                border: '2px solid #ff0071',
                width: 512,
                height: 512
              },
              type: 'PokemonNode'
            };

            setNodes((nds : Node[]) => nds.concat(newPokemon));

            getNodes();
        })
        .catch( (err: Error) => console.log('Error', err));
    };

    const initNodes = {
        id: '0', 
        position: { x: 240, y: 100 },
        dragHandle: '.custom-drag-handle', 
        data: {
            onChange: onChange,
        },
        style: { border: '2px solid #ff0071', width: 512, height: 200 },
        type: 'SearchNode'
    }

    const [nodes, setNodes, onNodesChange] = useNodesState([initNodes]);

    return (
        <ReactFlow
            nodes={nodes}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            defaultViewport={{ x: 0, y: 0, zoom: 0.6 }}
            attributionPosition='bottom-right'
            minZoom={0.05}
            maxZoom={10}
        > 
          <Background style={{backgroundColor: 'rgb(6,0,15)'}} color={'rgb(25,20,35)'} gap={12} size={2} />
          <Controls />

        </ReactFlow>
    )
}

function Flow() {

    return (
      <ReactFlowProvider>
        <FlowProvider />
      </ReactFlowProvider>
    );
  }
  
export default Flow;