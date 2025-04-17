export const persianNumConverter = {
  methods:{
    toPersianNum(num) {
      let persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      num = num.toString();
      let numChars = num.split('');
      let result = "";
      let position = 1;
      for (let i = numChars.length - 1; i >= 0; i--) {
        result = persianNumbers[numChars[i]] + result;
        if (position % 3 === 0) {
          result = ',' + result;
        }
        position++;
      }
      return result
    }
  }

};
