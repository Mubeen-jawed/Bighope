import type { StructureResolver } from "sanity/structure";

/**
 * Studio sidebar mirrors the website's navbar:
 *
 *   Our Range
 *     ├─ Custom Uniforms   → sport docs (Soccer, Rugby, … MMA)
 *     │    └─ (open one)   → edit it + its Products
 *     ├─ Custom Teamwear   → range docs (Hoodie, T-Shirts, …)
 *     └─ Accessories       → range docs (Bags, Socks, …)
 *   Packages
 *   All Products           → flat list of every product
 *   Site Settings          → hero slider + banner image
 *
 * (About / How It Works / Size Chart / Fabrics are fixed pages and are not
 * editable here.)
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // ── Our Range (mirrors the navbar "Our Range" dropdown) ──
      S.listItem()
        .title("Our Range")
        .child(
          S.list()
            .title("Our Range")
            .items([
              // Custom Uniforms → sports; open one to edit it + its products
              S.listItem()
                .title("Custom Uniforms (Sports)")
                .child(
                  S.documentList()
                    .title("Custom Uniforms")
                    .schemaType("sport")
                    .filter(
                      '_type == "sport" && !(slug.current in $exclude)',
                    )
                    .params({ exclude: ["teamwear", "accessories"] })
                    .child((sportId) =>
                      S.list()
                        .title("Range")
                        .items([
                          S.listItem()
                            .title("✏️  Edit this range")
                            .child(
                              S.document()
                                .schemaType("sport")
                                .documentId(sportId),
                            ),
                          S.listItem()
                            .title("🧺  Products in this range")
                            .child(
                              S.documentList()
                                .title("Products")
                                .schemaType("product")
                                .filter(
                                  '_type == "product" && sport._ref == $sportId',
                                )
                                .params({ sportId })
                                .initialValueTemplates([
                                  S.initialValueTemplateItem(
                                    "product-by-sport",
                                    { sportId },
                                  ),
                                ]),
                            ),
                        ]),
                    ),
                ),
              // Custom Teamwear → range docs in that category
              S.listItem()
                .title("Custom Teamwear")
                .child(
                  S.documentList()
                    .title("Custom Teamwear")
                    .schemaType("range")
                    .filter(
                      '_type == "range" && category == "Custom Teamwear"',
                    ),
                ),
              // Accessories → range docs in that category
              S.listItem()
                .title("Accessories")
                .child(
                  S.documentList()
                    .title("Accessories")
                    .schemaType("range")
                    .filter('_type == "range" && category == "Accessories"'),
                ),
            ]),
        ),

      // ── Packages (mirrors the navbar "Packages" dropdown) ──
      S.documentTypeListItem("package").title("Packages"),

      S.divider(),

      // ── Every product, in one place ──
      S.documentTypeListItem("product").title("All Products"),

      S.divider(),

      // ── Homepage hero + banner imagery ──
      S.listItem()
        .title("⚙️  Site Settings (hero & banner)")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
    ]);
