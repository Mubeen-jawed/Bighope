import { type SchemaTypeDefinition } from "sanity";

import { sportType } from "./sportType";
import { productType } from "./productType";
import { rangeType } from "./rangeType";
import { packageType } from "./packageType";
import { siteSettingsType } from "./siteSettingsType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [sportType, productType, rangeType, packageType, siteSettingsType],
};
