export type Udhetim = {
  id: number;
  shoferi: string;
  nisja: string;
  destinacioni: string;
  ora: string;
  vendetELira: number;
  cmimi: number;
  koheZgjatja: string;
};

export const udhetimet: Udhetim[] = [
  {
    id: 1,
    shoferi: "Arta",
    nisja: "Prishtina",
    destinacioni: "AAB",
    ora: "14:45",
    vendetELira: 3,
    cmimi: 3,
    koheZgjatja: "25 min",
  },
  {
    id: 2,
    shoferi: "Dren",
    nisja: "Ferizaj",
    destinacioni: "AAB",
    ora: "18:15",
    vendetELira: 2,
    cmimi: 5,
    koheZgjatja: "35 min",
  },
  {
    id: 3,
    shoferi: "Valon",
    nisja: "Gjilan",
    destinacioni: "AAB",
    ora: "19:30",
    vendetELira: 0,
    cmimi: 7,
    koheZgjatja: "50 min",
  },
];

export function gjejUdhetimin(id: number | string): Udhetim | undefined {
  const numericId = Number(id);
  return udhetimet.find((udhetim) => udhetim.id === numericId);
}
