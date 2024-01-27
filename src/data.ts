// eslint-disable-next-line max-classes-per-file
import { v4 as uuid } from 'uuid';

interface Tree {
  treeName: string,
  treeId: string,
}
interface TreeNode {
  nodeName: string,
  nodeId: string,
  parentNodeId?: string,
  isLeaf?: boolean,
  children?: TreeNode[],
}

class MyNode implements TreeNode {
  nodeName;

  nodeId;

  parentNodeId;

  isLeaf;

  children = [];

  constructor(uid, pid, isLeaf = false) {
    this.nodeName = `Node-${uid.slice(0, 5)}`;
    this.nodeId = uid;
    this.parentNodeId = pid;
    this.isLeaf = isLeaf;
    if (isLeaf) {
      delete this.children;
    }
  }
}
class MyTree implements Tree {
  treeName;

  treeId;

  constructor(id) {
    this.treeId = id;
    this.treeName = `Tree-${id.slice(0, 5)}`;
  }
}

export type Trees = Tree[];
export type Nodes = TreeNode[]

export const generateData = (depth: number = 3): [Trees, Nodes] => {
  const nodes = [];
  const trees = [];
  const recur = (curDepth: number, parentNode?: TreeNode) => {
    if (curDepth > depth) return;
    const random = Math.ceil(Math.random() * 4) + 1;
    const isLeaf = curDepth === depth;
    for (let i = 0; i < random; i += 1) {
      const node = new MyNode(uuid(), parentNode?.nodeId, isLeaf);
      if (curDepth === 0) {
        nodes.push(node);
        trees.push(new MyTree(node.nodeId));
      } else {
        parentNode.children.push(node);
      }
      recur(curDepth + 1, node);
    }
  };
  recur(0, null);
  return [trees, nodes];
};

export const formatData = (data: Nodes) => data.map((item) => ({
  ...item,
  // name is required by tree chart options
  name: item.nodeName,
  children: item.children && formatData(item.children),
}));
