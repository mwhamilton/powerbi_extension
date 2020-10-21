/*jshint esversion: 9*/
function nextPage(event){
  event.stopPropagation();
  let next;
  if(event.ctrlKey & (event.key === 'ArrowRight' || event.key === ' ')){
    next = 1;
  }
  else if(event.ctrlKey & event.key === 'ArrowLeft'){
    next = -1;
  }
  else{
    return;
  }
  let currTab = document.getElementsByClassName("section static ng-star-inserted selected")[0];
  let siblings = Array.from(currTab.parentElement.children).filter(x => !Array.from(x.classList).includes("hidden-in-view-mode"));
  let nextTabIndex = siblings.indexOf(currTab) + next;
  let nextTab = siblings[nextTabIndex];
  if(nextTab === undefined){
    return;
  }

  while(nextTab.children.length > 0){
    nextTab = nextTab.children[0]; // go all the way down
  }
  nextTab.click();
  siblings[Math.max(nextTabIndex - 2, 0)].scrollIntoView();
  siblings[Math.min(nextTabIndex + 2, siblings.length - 1)].scrollIntoView();
}
window.addEventListener("keyup", nextPage);


showHidden = false;
lastURL = null;
function showPages(){
  let currTab = document.getElementsByClassName("section static ng-star-inserted selected")[0];
  let hiddenTabs = Array.from(currTab.parentElement.children).filter(x => x.classList.contains("hidden-in-view-mode") || x.classList.contains("pseudo-hidden-in-view-mode"));
  hiddenTabs.forEach(function(tab){
    if(showHidden){  // normal to showing
      tab.classList.remove("hidden-in-view-mode");
      tab.classList.add("pseudo-hidden-in-view-mode"); // needed to keep track of the originally hidden views
      lastURL = document.location.href;
    }
    else{  // going back to normal
      tab.classList.remove("pseudo-hidden-in-view-mode");
      tab.classList.add("hidden-in-view-mode");
    }
  });
}
function findHiddenPagesKey(event){
  if(!(event.ctrlKey & (event.key === 'ArrowUp' || event.key === 'ArrowDown'))){
    return;
  }
  showHidden = (event.key === 'ArrowUp');
  showPages();
}

window.addEventListener("keyup", findHiddenPagesKey);


function findHiddenPagesPageChange(){
  if(!showHidden || lastURL === document.location.href){
    return;
  }
  showPages();
}
setInterval(findHiddenPagesPageChange, 1000);
