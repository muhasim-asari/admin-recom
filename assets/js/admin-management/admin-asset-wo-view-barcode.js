function generateRandomBarcode(length) {
  var barcode = "";
  var characters = "0123456789";
  var charactersLength = characters.length;

  for (var i = 0; i < length; i++) {
    barcode += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return barcode;
}

function generateBarcode() {
  var barcodeLength = 12;
  var barcode = generateRandomBarcode(barcodeLength);
  var barcodeImage = document.getElementById("barcodeImage");

  JsBarcode("#barcodeImage", barcode, {
    format: "code128",
    displayValue: true,
    height: 60
  });
}

function generateRandomCode(length) {
  var code = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;

  for (var i = 0; i < length; i++) {
    code += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return code;
}

function generateQRCode() {
  var codeLength = 10;
  var code = generateRandomCode(codeLength);
  var canvas = document.getElementById("qrcode");

  var qr = new QRious({
    element: canvas,
    value: code,
    size: 128
  });
}

function downloadPDF() {
  // Membuat objek jsPDF
  var doc = new jsPDF();

  // Menambahkan konten ke PDF
  var assetCode = document.querySelector('.card-body .col-md-12:nth-child(2) span').innerText;
  var assetName = document.querySelector('.card-body .col-md-12:nth-child(3) span').innerText;
  var subAssetName = document.querySelector('.card-body .col-md-12:nth-child(4) span').innerText;
  var subSubAssetName = document.querySelector('.card-body .col-md-12:nth-child(5) span').innerText;

  doc.text(20, 20, 'Asset Code: ' + assetCode);
  doc.text(20, 30, 'Asset Name: ' + assetName);
  doc.text(20, 40, 'Sub Asset Name: ' + subAssetName);
  doc.text(20, 50, 'Sub-Sub Asset Name: ' + subSubAssetName);

  // Simpan PDF
  doc.save('asset_details.pdf');
}

// Memanggil fungsi downloadPDF saat tombol diklik
var downloadBtn = document.querySelector('.card-body .btn');
downloadBtn.addEventListener('click', downloadPDF);
