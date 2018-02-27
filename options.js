// Saves options to chrome.storage
function save_options() {
    var countItems = document.getElementById('count').checked;
    chrome.storage.sync.set({
      countItems: countItems
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
    });
  }
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  function restore_options() {
    // Use default value color = 'red' and countItems = true.
    chrome.storage.sync.get({
      countItems: true
    }, function(items) {
      document.getElementById('count').checked = items.countItems;
    });
  }
  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save').addEventListener('click',
      save_options);