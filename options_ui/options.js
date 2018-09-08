if(typeof browser === 'undefined') {
  window.browser = window.chrome;
}

document.getElementById('save').addEventListener('click', (e) => {
  console.log('save');
});

document.getElementById('update_check_interval').addEventListener("input", (e) => {
  if (e.target.validity.valid) {
    document.getElementById('save').disabled = false;
  } else {
    document.getElementById('save').disabled = true;
  }
});

// vim:expandtab ff=dos fenc=utf-8 sw=2
