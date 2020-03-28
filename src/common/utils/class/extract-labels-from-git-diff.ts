import { GitPRLabelsInterface } from '../../interfaces/git-pr-labels.interface';

export default class ExtractLabelsFromGitDiff {
  private content: Array<string>

  private data: Array<GitPRLabelsInterface> = []

  public constructor(content: string) {
    this.content = content.split('\n');
  }

  public extractLabels() {
    let labelsIndex = -1;

    for (const contentIndex in this.content) {
      const line = this.content[contentIndex];
      const previousLine = this.content[+contentIndex - 1];

      if (this.isNewFileDiff(line)) {
        labelsIndex++;

        const fileName = this.getFileName(line);

        this.data.push({
          fileName,
          strings: []
        });
      } else if (this.isAddedLabel(line) && !this.checkLinesEqual(line, previousLine)) {
        const text = this.getLabelText(line);
        const key = this.getLabelKey(line);

        this.data[labelsIndex].strings.push({ text, key });
      }
    }

    return this.data;
  }

  private isNewFileDiff(line: string): boolean {
    return Boolean(line.match(/^diff --git/));
  }

  private getFileName(line: string): string {
    return line.replace(/diff --git a\//, '').split(' b/')[0];
  }

  private isAddedLabel(line: string): boolean {
    const checkLineStart = Boolean(line.match(/^\+{1}/))
      && !line.match(/^\+\+\+/)
      && Boolean(line.match(/^\+\s+"/));
    const checkLineEnd = Boolean(line.match(/"$|",$/));
    const hasColon = line.indexOf(':') !== -1;

    return checkLineStart && checkLineEnd && hasColon;
  }

  private getLabelKey(line: string): string {
    const indexSeparatorKeyAndText = line.indexOf(':');
    return line
      .substr(1, indexSeparatorKeyAndText)
      .replace(/^\s+"/, '')
      .replace(/":$/, '');
  }

  private getLabelText(line: string): string {
    const indexSeparatorKeyAndText = line.indexOf(':');
    return line
      .substr(indexSeparatorKeyAndText + 1)
      .trim()
      .replace(/^"/, '')
      .replace(/"$|",/, '');
  }

  private formatLineToCompare(line: string) {
    return line
      .replace(/^\+|^-/, '')
      .trim()
      .replace(/,$/, '');
  }

  private checkLinesEqual(lineA: string, lineB: string) {
    const formatedLineA = this.formatLineToCompare(lineA);
    const formatedLineB = this.formatLineToCompare(lineB);

    return formatedLineA == formatedLineB;
  }
}
