import { replace } from 'lodash';

export function isNotNullOrEmpty(value: string | number): boolean {
  return value !== undefined && value !== null && value !== '';
}

export function isNullOrEmpty(value: string | number): boolean {
  return value === undefined || value === null || value === '' || value === 'null';
}

export function getResultAfterCompareText(text1: string, text2: string): number {
  if (isNullOrEmpty(text1)) return 0;

  // remove all punctuations
  text1 = text1.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');

  const wordsText1: string[] = text1.toLowerCase().split(' ');
  const totalWords = wordsText1.length;

  console.log(wordsText1, text1, totalWords);

  const wordsText2: string[] = text2.toLowerCase().split(' ');

  wordsText2.forEach((word) => {
    const index = wordsText1.findIndex((x) => x === word);
    if (index !== -1) wordsText1.splice(index, 1);
  });

  console.log(wordsText1, totalWords);

  const totalWordsWrong = wordsText1.length;
  const score = 100 - (totalWordsWrong / totalWords) * 100;
  return score;
}
