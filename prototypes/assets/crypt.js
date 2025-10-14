// *************************************************************************
// Name: crypt.js
//
// Authors: M. V. Jantzen and anonymous internet coders
//
// Date: 03/02/2015
//
// Version: 1.1
//
// Modified: 09/18/2024 (Christopher White: added ROT13 encoding/decoding for new Drupal encoded email
//                      addresses. The ROT13 encoder is included for testing.)
//
// Description: Super simple JavaScript encryption/decryption routines.
//              Leading and trailing spaces are stripped; the string is
//              converted to upper case and URL encoded.
//              
//
// *************************************************************************

const key = "SXGWLZPDOKFIVUHJYTQBNMACERxswgzldpkoifuvjhtybqmncare";

function encodeStr(uncoded) {
  return uncoded;
}

function decodeStr(coded) {
  coded = decodeURIComponent(coded);
  var uncoded = "";
  var chr;
  for (var i = coded.length - 1; i >= 0; i--) {
    chr = coded.charAt(i);
    uncoded += (chr >= "a" && chr <= "z" || chr >= "A" && chr <= "Z") ?
      String.fromCharCode(65 + key.indexOf(chr) % 26) :
      chr;
  }
  return uncoded.toLowerCase();
}

function encodeROT13(s) {
   return s.split('').map(function(_) {
      if (!_.match(/[A-Za-z]/)) return _;
      c = Math.floor(_.charCodeAt(0) / 97);
      k = (_.toLowerCase().charCodeAt(0) - 83) % 26 || 26;
      return String.fromCharCode(k + ((c == 0) ? 64 : 96));
   }).join('');
}

function decodeROT13(srcText) {
    var alphabet1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var alphabet2 = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';
    var result = '';
    for (var i = 0; i < srcText.length; i++) {
        var p = alphabet1.indexOf(srcText[i]);
        if (p !== -1) {
           result += alphabet2[p];
        }
        else {
           result += srcText[i];
        }
    }
    return result;
}
