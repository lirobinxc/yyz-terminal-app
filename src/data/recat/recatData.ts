export enum RecatGroup {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
  G = 'G',
}
export const recatGroupList = Object.values(RecatGroup);

export const recatData: {
  [key in RecatGroup]: { [key in RecatGroup]: number | null };
} = {
  A: {
    A: null,
    B: 4,
    C: 5,
    D: 5,
    E: 6,
    F: 6,
    G: 8,
  },
  B: {
    A: null,
    B: 3,
    C: 4,
    D: 4,
    E: 5,
    F: 5,
    G: 7,
  },
  C: {
    A: null,
    B: null,
    C: null,
    D: 3,
    E: 3.5,
    F: 3.5,
    G: 4,
  },
  D: {
    A: null,
    B: null,
    C: null,
    D: null,
    E: null,
    F: null,
    G: 4,
  },
  E: {
    A: null,
    B: null,
    C: null,
    D: null,
    E: null,
    F: null,
    G: 4,
  },
  F: {
    A: null,
    B: null,
    C: null,
    D: null,
    E: null,
    F: null,
    G: null,
  },
  G: {
    A: null,
    B: null,
    C: null,
    D: null,
    E: null,
    F: null,
    G: null,
  },
};

export interface RecatPairData {
  plane1: RecatGroup;
  plane2: RecatGroup;
  spacing: number | null;
}

export const recatDataList = genRecatDataList();

function genRecatDataList() {
  const list: RecatPairData[] = [];

  recatGroupList.forEach((group) => {
    for (const key in RecatGroup) {
      const data: RecatPairData = {
        plane1: RecatGroup.A,
        plane2: RecatGroup.B,
        spacing: 999,
      };

      data.plane1 = group;
      data.plane2 = key as RecatGroup;
      data.spacing = recatData[data.plane1][data.plane2];

      list.push(data);
    }
  });

  return list;
}

// export const recatDataList = recatGroupList.reduce((prev, curr) => {
//   const data: RecatPairData = {
//     plane1: RecatGroup.A,
//     plane2: RecatGroup.B,
//     spacing: 999,
//   };

//   for (const key in RecatGroup) {
//     data.plane1 = curr;
//     data.plane2 = key as RecatGroup;
//     data.spacing = recatData[data.plane1][data.plane2];
//   }

//   prev.push(data);
//   return prev;
// }, [] as RecatPairData[]);
