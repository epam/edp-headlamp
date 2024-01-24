export const getMajorMinorPatchOfVersion = (
  version: string
): {
  major: number;
  minor: number;
  patch: number;
} => {
  const [major, minor, patch] = version.split('.').map((el) => +el);

  return { major, minor, patch };
};
