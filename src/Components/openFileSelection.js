export async function openFileSelection() {
    return new Promise((resolve, reject) => {
      const fileInputElement = document.createElement('input');
      fileInputElement.type = 'file';
      fileInputElement.accept = 'image/*';
      fileInputElement.style.display = 'none';

      document.body.appendChild(fileInputElement);

      fileInputElement.addEventListener('change', (event) => {
        resolve(event.target.files[0]);
      });

      setTimeout(() => {
        reject(new Error('No file selected'));
      }, 5000);

      fileInputElement.click();
    });
  };

  export function isSupportedImage(fileName) {
    const supportedFormats = ["jpg", "jpeg", "png", "gif"];
    const extension = fileName.split(".").pop().toLowerCase();
    return supportedFormats.includes(extension);
  }

  export function isSupportedDocument(fileName) {
    const supportedFormats = ["doc", "docx", "pdf", "txt"];
    const extension = fileName.split(".").pop().toLowerCase();
    return supportedFormats.includes(extension);
  }

  export function isSupportedExcel(fileName) {
    const supportedFormats = ["xls"];
    const extension = fileName.split(".").pop().toLowerCase();
    return supportedFormats.includes(extension);
  }