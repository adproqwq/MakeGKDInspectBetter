import { snackbar } from 'mdui';

export default (): number => {
  const currentSelectedNode = document.querySelector('.n-tree-node-wrapper .n-tree-node--selected') as HTMLDivElement | null;

  if(!currentSelectedNode){
    snackbar({
      message: '请先选中节点！',
      placement: 'top',
    });
    return -1;
  }
  else return Number(currentSelectedNode.getAttribute('data-node-id')!);
};