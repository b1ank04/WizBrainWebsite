  async function sendFile() {
    const fileInput = document.getElementById('image-input');
    const file = fileInput.files[0];
    if (!file) {
      alert('Please, choose a file');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch('http://localhost:8080/api/v1/solve', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      const resultDiv = document.getElementById('result');
      if (result.error == null) {
        resultDiv.innerHTML = '<div><span style="font-weight:bold;">Your request:</span><br>' + result.request.replaceAll("\n", "<br>") + '</div><br><div><span style="font-weight:bold;">AI response:</span><br><span style="background-color: lightgreen;color:black;padding:2px;">' + result.response + '</span></div>';
      } else {
        resultDiv.innerText = result.error;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function translateText() {
    const text = document.getElementById('input-area').value;
    const newLanguage = document.getElementById('language-select').value;
    const formData = new FormData();
    formData.append('text', text);
    formData.append('new_language', newLanguage);
    const response = await fetch('http://localhost:8080/api/v1/translateText', {
      method: 'POST',
      body: formData      
    })
    const result = await response.text();
    const resultArea = document.getElementById('result-area');
    resultArea.innerText = result;
  }

  async function translateFile() {
    const input = document.getElementById('input-image');
    const file = input.files[0];
    if (!file) {
      alert('Please, choose a file');
      return;
    }
    const newLanguage = document.getElementById('language-select').value;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('new_language', newLanguage);
    const response = await fetch('http://localhost:8080/api/v1/translateFile', {
      method: 'POST',
      body: formData      
    })
    const result = await response.text();
    const resultArea = document.getElementById('result-area');
    resultArea.innerText = result;
  }

  function switchHandler() {
    const toggleSwitch = document.getElementById('toggle-switch');
    const uploadField = document.getElementById('upload-field');
    const inputArea = document.getElementById('input-area');
    if (toggleSwitch.checked) {
      inputArea.style.display = "none";
      uploadField.style.display = "block";
    } else {
      uploadField.style.display = "none"
      inputArea.style.display = "block";
    }
  }

  async function summarizeInput() {
    const text = document.getElementById('input-area').value;
    const formData = new FormData();
    formData.append('text', text);
    const response = await fetch('http://localhost:8080/api/v1/summarize', {
      method: 'POST',
      body: formData      
    })
    const result = await response.text();
    const resultArea = document.getElementById('result-area');
    resultArea.innerText = result;
  }

  function translateInput() {
    const toggleSwitch = document.getElementById('toggle-switch');
    if (toggleSwitch.checked) {
      translateFile();
    } else {
      translateText();
    }
  }

  function checkSelect() {
    const select = document.getElementById('language-select');
    const button = document.getElementById('translate-button');
    if (select.value === "Choose language") {
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  }

  function checkSelect() {
    const select = document.getElementById('language-select');
    const button = document.getElementById('translate-button');
    if (select.value === "Choose language") {
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  }

  

  function readURL(input) {
    if (input.files && input.files[0]) {
  
      var reader = new FileReader();
  
      reader.onload = function(e) {
        $('.image-upload-wrap').hide();
  
        $('.file-upload-image').attr('src', e.target.result);
        $('.file-upload-content').show();
  
        $('.image-title').html(input.files[0].name);
      };
  
      reader.readAsDataURL(input.files[0]);
  
    } else {
      removeUpload();
    }
  }
  
  function removeUpload() {
    $('.file-upload-input').replaceWith($('.file-upload-input').clone());
    $('.file-upload-content').hide();
    $('.image-upload-wrap').show();
  }
  $('.image-upload-wrap').bind('dragover', function () {
      $('.image-upload-wrap').addClass('image-dropping');
    });
    $('.image-upload-wrap').bind('dragleave', function () {
      $('.image-upload-wrap').removeClass('image-dropping');
  });
  
  function fillTable() {
    const url = 'http://localhost:8080/api/v1/history';
    const response = fetch(url, {
        method: 'GET'
      });
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const tableBody = document.querySelector('#historyTable tbody');

        for (const obj of data) {
            const row = document.createElement('tr');
            
            const field1Cell = document.createElement('td');
            field1Cell.textContent = obj.type;
            row.appendChild(field1Cell);
          
            const field2Cell = document.createElement('td');
            field2Cell.textContent = obj.requestText;
            row.appendChild(field2Cell);
          
            const field3Cell = document.createElement('td');
            field3Cell.textContent = obj.responseText;
            row.appendChild(field3Cell);
          
            tableBody.appendChild(row);
        }
        })
      .catch(error => {
        console.error('Ошибка получения данных:', error);
      });
    }