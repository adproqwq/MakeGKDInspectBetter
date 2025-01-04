export default (): number => {
  const currentSelectedNode = document.querySelector('.n-tree-node-wrapper .n-tree-node--selected') as HTMLDivElement | null;

  if(!currentSelectedNode) return 0;
  else return Number(currentSelectedNode.getAttribute('data-node-id')!);
};