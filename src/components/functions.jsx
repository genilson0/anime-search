export function puttingZero(score) {
  if (score.toString().length == 1) {
    return `${score}.00`;
  } else if (score.toString().length == 3) {
    return `${score}0`;
  } else {
    return score;
  }
}

export function gettingEpisodes(airing, episodes) {
  if (airing) {
    return "Airing";
  } else if (!airing && episodes) {
    return episodes;
  } else {
    return "N/A";
  }
}
