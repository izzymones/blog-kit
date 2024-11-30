
function isString(val) {
  return val.startsWith("'");
}

function isDate(val) {
  return val.match(/\d+-\d+-\d+T.+/g);
}

function isBoolean(val) {
  return val.match(/^[TF]$/);
}

function isFloat(val) {
  return val.includes('.');
}

// Returns header as object, headerOffset as number (start of data, or end of file)
function parseFITSHeader(buffer) {
  const iLength = buffer.byteLength;
  let iOffset = 0;
  const header = {};
  const headerUnitChars = 80;
  const fitsHeaderByteMultiples = 2880;

  while (iOffset < iLength) {
    const line = buffer.slice(iOffset, iOffset + headerUnitChars);
    const headerUnit = String.fromCharCode.apply(null, new Uint8Array(line));
    if (headerUnit.startsWith('END')) break;

    const hdu = headerUnit.split(/[=/]/);
    const key = hdu[0];
    let val = hdu[1];
    if (key.length > 0 && val) {
      val = val.trim();
      if (isString(val)) {
        val = val.replace(/'/g, '').trim();
        if (isDate(val)) {
          val = Date.parse(val);
        }
      } else if (isBoolean(val)) {
        val = val.includes('T');
      } else if (isFloat(val)) {
        val = parseFloat(val);
      } else {
        val = parseInt(val, 10);
      }
      header[key.trim()] = val;
    }
    iOffset += headerUnitChars;
  }

  if (typeof header.BSCALE === 'undefined') header.BSCALE = 1;
  if (typeof header.BZERO === 'undefined') header.BZERO = 0;

  iOffset += fitsHeaderByteMultiples - (iOffset % fitsHeaderByteMultiples);

  return [header, iOffset];
}

function parseFITSImage(
  buffer,
  headerOffset,
  bitpixHeader,
  width,
  height
) {
  const datatype = bitpixHeader > 0 ? 'Uint' : 'Float';
  const dataBits = Math.abs(bitpixHeader);
  const dataBytes = dataBits / 8;
  const pixels = width * height;
  const dataView = new DataView(buffer, headerOffset);
  // the window object contains the constructors for Uint16Array and other global classes
  const rawImageData = new window[`${datatype}${dataBits}Array`](pixels);

  for (let i = 0; i < pixels; i += 1) {
    rawImageData[i] = dataView[`get${datatype}${dataBits}`](i * dataBytes);
  }
  return rawImageData;
}

function extractKeogramSlice(rawImageData, imgWidth) {
  const center = Math.floor(imgWidth / 2);
  return rawImageData.filter((element, index) => index % imgWidth === center);
}

async function getImageDataFromFITS(filenameBase) {
  const response = await fetch(
    `${filenameBase}.fits`,
    {
      headers: { Accept: 'application/octet-stream' },
    });
  const buf = await response.arrayBuffer();
  let [header, headerOffset] = parseFITSHeader(buf);
  
  //
  // If the first HDU is not an image, pray that the next HDU is.
  // Obviously, this code should be generalized to find the first image HDU,
  // or even an array of image HDUs.
  //
  if (header.NAXIS === 0) {
    const buf1 = buf.slice(headerOffset);
    const [header1, headerOffset1] = parseFITSHeader(buf1);
    header = header1;
    headerOffset = headerOffset1;
  }

  let width;
  let height;

  if (header.NAXIS >= 2) {
    if (typeof header.NAXIS1 === 'number') width = header.NAXIS1;
    if (typeof header.NAXIS2 === 'number') height = header.NAXIS2;
  }

  let imageData;

  if (header.NAXIS >= 2) {
    const data1D = parseFITSImage(
      buf,
      headerOffset,
      header.BITPIX,
      width,
      height
    );

    //
    // We need to reshape the 1D array of data into a 2D rectangle.
    // This can probably be done MUCH more efficiently, but it works.
    //

    imageData = [];
    let i = 0;
    for (let l = data1D.length + 1; (i + header.NAXIS1) < l; i += header.NAXIS1) {
      imageData.push(data1D.slice(i, i + header.NAXIS1));
    }
  }

  return imageData;
}

///////////////////////////////////////////////////////////////////////////////////////

(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports);
  } else {
    let mod = {
      exports: {}
    };
    factory(mod.exports);
    global.fitslib = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  exports.parseFITSHeader = parseFITSHeader;
  exports.parseFITSImage = parseFITSImage;
  exports.extractKeogramSlice = extractKeogramSlice;
  exports.getImageDataFromFITS = getImageDataFromFITS;

});
