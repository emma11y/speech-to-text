export function isNotNullOrEmpty(value: string | number): boolean {
  return value !== undefined && value !== null && value !== '';
}

export function isNullOrEmpty(value: string | number): boolean {
  return value === undefined || value === null || value === '' || value === 'null';
}

export function getResultAfterCompareText(text1: string, text2: string): number {
  if (isNullOrEmpty(text1)) return 0;

  text1 = text1.replace('.', '').replace(',', '').replace(':', '');

  const wordsText1: string[] = text1.toLowerCase().split(' ');
  const totalWords = wordsText1.length;

  const wordsText2: string[] = text2.toLowerCase().split(' ');

  wordsText2.forEach((word) => {
    const index = wordsText1.findIndex((x) => x === word);
    if (index !== -1) wordsText1.splice(index, 1);
  });

  const totalWordsWrong = wordsText1.length;
  const score = 100 - (totalWordsWrong / totalWords) * 100;
  return score;
}
