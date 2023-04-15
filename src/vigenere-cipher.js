const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
  }

  encrypt(message, key) {
    if (!message || !key) {
      throw new Error('Incorrect arguments!');
    }

    message = message.toUpperCase();
    key = key.toUpperCase();

    let encryptedMessage = '';

    for (let i = 0, j = 0; i < message.length; i++) {
      const currentSymbol = message[i];

      if (currentSymbol >= 'A' && currentSymbol <= 'Z') {
        const keySymbol = key[j % key.length];
        const shift = keySymbol.charCodeAt(0) - 'A'.charCodeAt(0);

        if (this.isDirect) {
          encryptedMessage += String.fromCharCode(
            ((currentSymbol.charCodeAt(0) - 'A'.charCodeAt(0) + shift) % 26) +
            'A'.charCodeAt(0)
          );
        } else {
          encryptedMessage = String.fromCharCode(
            ((currentSymbol.charCodeAt(0) - 'A'.charCodeAt(0) + shift) % 26) +
            'A'.charCodeAt(0)
          ) + encryptedMessage;
        }

        j++;
      } else {
        if (this.isDirect) {
          encryptedMessage += currentSymbol;
        } else {
          encryptedMessage = currentSymbol + encryptedMessage;
        }
      }
    }

    return encryptedMessage;
  }

  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) {
      throw new Error('Incorrect arguments!');
    }

    encryptedMessage = encryptedMessage.toUpperCase();
    key = key.toUpperCase();

    let message = '';

    for (let i = 0, j = 0; i < encryptedMessage.length; i++) {
      const currentSymbol = encryptedMessage[i];

      if (currentSymbol >= 'A' && currentSymbol <= 'Z') {
        const keySymbol = key[j % key.length];
        const shift = keySymbol.charCodeAt(0) - 'A'.charCodeAt(0);

        if (this.isDirect) {
          message += String.fromCharCode(
            ((currentSymbol.charCodeAt(0) - 'A'.charCodeAt(0) - shift + 26) %
              26) +
            'A'.charCodeAt(0)
          );
        } else {
          message = String.fromCharCode(
            ((currentSymbol.charCodeAt(0) - 'A'.charCodeAt(0) - shift + 26) %
              26) +
            'A'.charCodeAt(0)
          ) + message;
        }

        j++;
      } else {
        if (this.isDirect) {
          message += currentSymbol;
        } else {
          message = currentSymbol + message;
        }
      }
    }

    return message;
  }
}


module.exports = {
  VigenereCipheringMachine
};
