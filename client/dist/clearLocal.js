var loadfunction = window.onload;
window.onload = function (event) {
  localStorage.clear();
  if (loadfunction) loadfunction(event);
};
