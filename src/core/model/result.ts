export class Result {
  name: string;
  resultText: string;
  percentSuccess: number;

  constructor(name: string, resultText: string, percentSuccess: number) {
    this.name = name;
    this.resultText = resultText;
    this.percentSuccess = percentSuccess;
  }
}
