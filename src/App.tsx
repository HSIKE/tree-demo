import React, { useEffect, useState, useRef } from 'react';
import * as echarts from 'echarts';

import {
  formatData, generateData, Nodes, Trees,
} from './data';

function App() {
  const [trees, setTrees] = useState<Trees>([]);
  const [nodes, setNodes] = useState<Nodes>([]);
  const [selectedTreeId, setSelectedTreeId] = useState(null);
  const chartContainerRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const [treesData, nodesData] = generateData();
    setTrees(treesData);
    setNodes(nodesData);
    setSelectedTreeId(treesData[0]?.treeId);

    chartInstanceRef.current = echarts.init(chartContainerRef.current);

    chartInstanceRef.current.on('click', (params) => {
      const { data } = params;
      const str = `
        Node Name: ${data.nodeName}
        Node Id: ${data.nodeId}
      `;
      alert(str);
    });

    return () => echarts.dispose(chartContainerRef.current);
  }, []);

  useEffect(() => {
    const dataSource = selectedTreeId && nodes.find(({ nodeId }) => nodeId === selectedTreeId);
    const data = dataSource ? formatData([dataSource]) : [];
    const options = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}',
      },
      series: [{
        type: 'tree',
        data,
        symbol: 'emptyCircle',
        orient: 'horizontal',
        expandAndCollapse: false,
        label: {
          position: 'left',
          align: 'right',
          fontSize: 12,
        },
        leaves: {
          label: {
            position: 'right',
            align: 'left',
          },
        },
      }],
    };
    if (chartInstanceRef.current) {
      chartInstanceRef.current.setOption(options);
    }
  }, [nodes, selectedTreeId]);

  const handleSelect = (ev) => {
    setSelectedTreeId(ev.target.value);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <select onChange={handleSelect} defaultValue="" style={{ width: 500 }}>
        {trees.map(({ treeName, treeId }) => (
          <option value={treeId} key={treeId}>{treeName}</option>
        ))}
      </select>
      <div
        ref={chartContainerRef}
        style={{
          height: 600, background: '#f5f5f5', padding: 10, margin: 30,
        }}
      />
    </div>
  );
}

export default App;
