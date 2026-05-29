import type { StructureResolver } from "sanity/structure";

/**
 * Custom Studio sidebar. `siteSettings` is shown as a single editable
 * document (singleton) rather than a list.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.divider(),
      S.documentTypeListItem("sport").title("Sports / Ranges"),
      S.documentTypeListItem("product").title("Products"),
      S.documentTypeListItem("range").title("Ranges (sub-collections)"),
      S.documentTypeListItem("package").title("Packages"),
    ]);
