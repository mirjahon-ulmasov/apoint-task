import type { Material } from "../types";

export const groupMaterials = (materials: Material[]) => {
  const grouped: Record<string, Record<string, Material[]>> = {};

  for (const item of materials) {
    const parent = item.parent || 'No Parent';
    const category = item.category || 'No Category';

    if (!grouped[parent]) grouped[parent] = {};
    if (!grouped[parent][category]) grouped[parent][category] = [];

    grouped[parent][category].push(item);
  }

  return grouped;
};