if(typeof browser === 'undefined') {
  window.browser = window.chrome;
}

const STORE_NAME = 'pptw_settings';
const SETTINGS_LIST = [
  {
    id: 'update_check',
    value: 'checked',
  },
  {
    id: 'update_check_interval',
    value: 'value',
  },
  {
    id: 'mute_by_key',
    value: 'checked',
  },
  {
    id: 'block_by_key',
    value: 'checked',
  },
];

const configUI = {

  extractSettings : () => {
    const ret = {};
    SETTINGS_LIST.forEach((setting) => {
      const inpElm = document.getElementById(setting.id);
      console.log(`??? ${inpElm[setting.value]}`);
      ret[setting.id] = setting.id === 'update_check_interval' ? parseInt(inpElm[setting.value]) : inpElm[setting.value];
    });
    console.log(`${JSON.stringify(ret,null,2)}`);
    return ret;
  },

  restoreEntries : () => {
    browser.storage.local.get(STORE_NAME, (store_obj) => {
      const result = store_obj[STORE_NAME];
      if(!result) {
        return;
      }
      console.log(`${JSON.stringify(result,null,2)}`);
      SETTINGS_LIST.forEach((setting) => {
        const inpElm = document.getElementById(setting.id);
        if(result[setting.id] !== undefined && result[setting.id] !== null) {
          inpElm[setting.value] = result[setting.id];
        }
      });
    });
  },

  saveEntries : () => {
    browser.storage.local.set({
      [STORE_NAME]: configUI.extractSettings(),
    });
  }

};

document.addEventListener('DOMContentLoaded', configUI.restoreEntries);
document.getElementById('save').addEventListener('click', configUI.saveEntries);

document.getElementById('update_check_interval').addEventListener('input', (e) => {
  const saveButton = document.getElementById('save');
  if (e.target.validity.valid) {
    saveButton.disabled = false;
  } else {
    saveButton.disabled = true;
  }
});

// vim:expandtab ff=dos fenc=utf-8 sw=2
