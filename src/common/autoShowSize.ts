import observeElement from '../utils/observeElement';

observeElement('.n-message__content', () => {
  const isNodeLost = document.querySelector('.n-message__content');
  if(isNodeLost){
    const content = isNodeLost.innerHTML;
    const searchResult = content.match(/的([0-9])+个/);
    if(searchResult){
      const lostNodeNum = Number(searchResult[0].slice(1,-1));

      const showSizeURL = new URL(window.location.href);
      const currentShowSize = new URL(window.location.href).searchParams.get('showSize');
      showSizeURL.searchParams.set('showSize', String(lostNodeNum + (currentShowSize === null ? 2000 : Number(currentShowSize))));
      window.location.href = showSizeURL.toString();
    }
  }
});