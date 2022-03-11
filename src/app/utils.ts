export const strTrimAndLower = (str: string) => str.trim().toLowerCase();

export const strTransform = (firstStr: string, secondStr: string) => strTrimAndLower(firstStr).includes(strTrimAndLower(secondStr));
