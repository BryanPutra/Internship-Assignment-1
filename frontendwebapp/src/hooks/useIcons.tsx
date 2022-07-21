import * as MUIIcons from '@mui/icons-material';
import stringSimilarity from "string-similarity";

function useIcons(word: string) {
  const iconsNames = Object.keys(MUIIcons);

  var matches = stringSimilarity.findBestMatch(word, iconsNames);
  const bestMathch = matches.bestMatch.target;
  const Icon = MUIIcons[bestMathch];
  return Icon;
}
export default useIcons;
