import { Result } from '@core/model/result';
import { AlignmentType, Document, HeadingLevel, Packer, Paragraph, TabStopPosition, TabStopType, TextRun } from 'docx';
import { saveAs } from 'file-saver';

//https://github.com/dolanmiu/docx

export class Transcription {
  public create(textToSpeech: string, results: Result[]): Document {
    const document = new Document({
      sections: [
        {
          children: [
            this.createHeading('Transcriptions'),
            new Paragraph({}),
            this.createSubHeading('Texte à vocaliser'),
            new Paragraph({}),
            new Paragraph({
              text: textToSpeech,
            }),
            new Paragraph({}),
            ...results
              .map((result) => {
                return this.createParagraphByResult(result);
              })
              .reduce((prev, curr) => prev.concat(curr), []),
            ,
          ],
        },
      ],
    });

    return document;
  }

  public download(document: Document): void {
    Packer.toBlob(document).then((blob) => {
      saveAs(blob, 'transcription.docx');
    });
  }

  private createHeading(text: string): Paragraph {
    return new Paragraph({
      text: text,
      heading: HeadingLevel.HEADING_1,
      thematicBreak: true,
      alignment: AlignmentType.CENTER,
    });
  }

  private createSubHeading(text: string): Paragraph {
    return new Paragraph({
      text: text,
      heading: HeadingLevel.HEADING_2,
    });
  }

  private createParagraphByResult(result: Result): Paragraph[] {
    const paragraphs: Paragraph[] = [];

    paragraphs.push(this.createSubHeading(result.name));

    paragraphs.push(new Paragraph({}));
    paragraphs.push(
      new Paragraph({
        text: result.resultText,
      })
    );

    paragraphs.push(new Paragraph({}));

    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `Pourcentage de réussite : ${result.percentSuccess} %`,
            bold: true,
          }),
        ],
      })
    );

    paragraphs.push(new Paragraph({}));

    return paragraphs;
  }
}
