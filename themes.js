/* =====================================================
   TEMA UNDANGAN — Definisi Tema Bawaan
   Nilai CSS variable akan ditimpa pada <html data-theme="...">
   Dibaca oleh: index.html (script.js) & admin.html (panel Tema)

   10 tema populer diambil dari riset tren undangan pernikahan
   (Liputan6/Vistaprint, Bridestory 2026, The Knot, Zola First
   Look Report 2026, bespoke-bride, Minted, Paperlust, dsb.)
   ===================================================== */
window.WEDDING_THEMES = {
  /* ---------- TEMA CLASSIC ---------- */
  "royal-gold": {
    nama: "Royal Gold",
    vars: {
      "--cream":          "#faf6ef",
      "--cream-dark":     "#f1e8da",
      "--white":          "#fffdf9",
      "--white-rgb":      "255, 253, 249",
      "--accent":         "#b98e52",
      "--accent-dark":    "#97702f",
      "--accent-light":   "#d9b878",
      "--accent-rgb":        "185, 142, 82",
      "--accent-dark-rgb":   "151, 112, 47",
      "--accent-light-rgb":  "217, 184, 120",
      "--brown":          "#4a3b2f",
      "--brown-soft":     "#7a6a5c",
      "--brown-rgb":      "74, 59, 47",
      "--deep-1":         "#33281f",
      "--deep-2":         "#171008",
      "--deep-rgb":       "30, 23, 17",
      "--overlay-rgb":    "51, 40, 31",
      "--danger":         "#c0392b"
    }
  },
  "champagne-classic": {
    nama: "Champagne Classic",
    vars: {
      "--cream":          "#f6f2ea",
      "--cream-dark":     "#ece4d6",
      "--white":          "#fbf8f2",
      "--white-rgb":      "251, 248, 242",
      "--accent":         "#b99b6b",
      "--accent-dark":    "#8a7148",
      "--accent-light":   "#d9c49a",
      "--accent-rgb":        "185, 155, 107",
      "--accent-dark-rgb":   "138, 113, 72",
      "--accent-light-rgb":  "217, 196, 154",
      "--brown":          "#4a3d2c",
      "--brown-soft":     "#7c7059",
      "--brown-rgb":      "46, 38, 26",
      "--deep-1":         "#32271a",
      "--deep-2":         "#191207",
      "--deep-rgb":       "22, 17, 10",
      "--overlay-rgb":    "50, 39, 26",
      "--danger":         "#a4453c"
    }
  },
  "midnight-navy": {
    nama: "Midnight Navy",
    vars: {
      "--cream":          "#f2f4f7",
      "--cream-dark":     "#e2e7ee",
      "--white":          "#fbfcfe",
      "--white-rgb":      "251, 252, 254",
      "--accent":         "#2b5178",
      "--accent-dark":    "#1a3350",
      "--accent-light":   "#7396bd",
      "--accent-rgb":        "43, 81, 120",
      "--accent-dark-rgb":   "26, 51, 80",
      "--accent-light-rgb":  "115, 150, 189",
      "--brown":          "#26313f",
      "--brown-soft":     "#5d6a7a",
      "--brown-rgb":      "26, 33, 41",
      "--deep-1":         "#16283c",
      "--deep-2":         "#0a1522",
      "--deep-rgb":       "10, 21, 34",
      "--overlay-rgb":    "13, 26, 40",
      "--danger":         "#9a4048"
    }
  },
  "mocha-latte": {
    nama: "Mocha Latte",
    vars: {
      "--cream":          "#f5efe6",
      "--cream-dark":     "#ebe0d1",
      "--white":          "#fcf8f2",
      "--white-rgb":      "252, 248, 242",
      "--accent":         "#8c6a4f",
      "--accent-dark":    "#6b4d36",
      "--accent-light":   "#b3906f",
      "--accent-rgb":        "140, 106, 79",
      "--accent-dark-rgb":   "107, 77, 54",
      "--accent-light-rgb":  "179, 144, 111",
      "--brown":          "#40342a",
      "--brown-soft":     "#75665a",
      "--brown-rgb":      "40, 32, 25",
      "--deep-1":         "#2a2018",
      "--deep-2":         "#161008",
      "--deep-rgb":       "19, 14, 9",
      "--overlay-rgb":    "42, 32, 24",
      "--danger":         "#9a4048"
    }
  },

  /* ---------- TEMA NATURAL / GARDEN ---------- */
  "sage-garden": {
    nama: "Sage Garden",
    vars: {
      "--cream":          "#f1f4eb",
      "--cream-dark":     "#e2e9d5",
      "--white":          "#fbfdf7",
      "--white-rgb":      "251, 253, 247",
      "--accent":         "#6d8a5e",
      "--accent-dark":    "#50693f",
      "--accent-light":   "#a8bf8f",
      "--accent-rgb":        "109, 138, 94",
      "--accent-dark-rgb":   "80, 105, 63",
      "--accent-light-rgb":  "168, 191, 143",
      "--brown":          "#3a4233",
      "--brown-soft":     "#6b7561",
      "--brown-rgb":      "40, 48, 36",
      "--deep-1":         "#2c3524",
      "--deep-2":         "#151b11",
      "--deep-rgb":       "21, 27, 17",
      "--overlay-rgb":    "46, 55, 38",
      "--danger":         "#a4453c"
    }
  },
  "forest-emerald": {
    nama: "Forest Emerald",
    vars: {
      "--cream":          "#f2f6ed",
      "--cream-dark":     "#e2ecd6",
      "--white":          "#fbfff7",
      "--white-rgb":      "251, 255, 247",
      "--accent":         "#3f7d4e",
      "--accent-dark":    "#2b5a38",
      "--accent-light":   "#6fae7e",
      "--accent-rgb":        "63, 125, 78",
      "--accent-dark-rgb":   "43, 90, 56",
      "--accent-light-rgb":  "111, 174, 126",
      "--brown":          "#2f3a2f",
      "--brown-soft":     "#5c6b5e",
      "--brown-rgb":      "24, 30, 25",
      "--deep-1":         "#1d2a1f",
      "--deep-2":         "#0d140f",
      "--deep-rgb":       "15, 24, 16",
      "--overlay-rgb":    "29, 42, 31",
      "--danger":         "#a4453c"
    }
  },
  "emerald-gold": {
    nama: "Emerald Gold",
    vars: {
      "--cream":          "#f6f5ef",
      "--cream-dark":     "#eae8dc",
      "--white":          "#fcfbf6",
      "--white-rgb":      "252, 251, 246",
      "--accent":         "#2e7d5b",
      "--accent-dark":    "#1f5c41",
      "--accent-light":   "#6db390",
      "--accent-rgb":        "46, 125, 91",
      "--accent-dark-rgb":   "31, 92, 65",
      "--accent-light-rgb":  "109, 179, 144",
      "--brown":          "#22342b",
      "--brown-soft":     "#557060",
      "--brown-rgb":      "22, 36, 29",
      "--deep-1":         "#0f2b1e",
      "--deep-2":         "#07160f",
      "--deep-rgb":       "7, 22, 15",
      "--overlay-rgb":    "15, 43, 30",
      "--danger":         "#a4453c"
    }
  },
  "warm-terracotta": {
    nama: "Warm Terracotta",
    vars: {
      "--cream":          "#faf1e8",
      "--cream-dark":     "#f3e3d2",
      "--white":          "#fdf8f3",
      "--white-rgb":      "253, 248, 243",
      "--accent":         "#c07a5d",
      "--accent-dark":    "#9c5b3e",
      "--accent-light":   "#e0ab8f",
      "--accent-rgb":        "192, 122, 93",
      "--accent-dark-rgb":   "156, 91, 62",
      "--accent-light-rgb":  "224, 171, 143",
      "--brown":          "#453528",
      "--brown-soft":     "#7a6a5c",
      "--brown-rgb":      "48, 37, 28",
      "--deep-1":         "#3a2a1c",
      "--deep-2":         "#1c130c",
      "--deep-rgb":       "24, 17, 11",
      "--overlay-rgb":    "46, 34, 23",
      "--danger":         "#a4453c"
    }
  },

  /* ---------- TEMA ROMANTIS ---------- */
  "blush-rose": {
    nama: "Blush Rose",
    vars: {
      "--cream":          "#fdf3f0",
      "--cream-dark":     "#f8e3dc",
      "--white":          "#fffaf8",
      "--white-rgb":      "255, 250, 248",
      "--accent":         "#c96f7a",
      "--accent-dark":    "#a34d58",
      "--accent-light":   "#e4a0a8",
      "--accent-rgb":        "201, 111, 122",
      "--accent-dark-rgb":   "163, 77, 88",
      "--accent-light-rgb":  "228, 160, 168",
      "--brown":          "#4a2f33",
      "--brown-soft":     "#79575c",
      "--brown-rgb":      "47, 24, 27",
      "--deep-1":         "#331d20",
      "--deep-2":         "#160c0e",
      "--deep-rgb":       "36, 20, 23",
      "--overlay-rgb":    "51, 29, 32",
      "--danger":         "#c0392b"
    }
  },
  "blush-romance": {
    nama: "Blush Romance",
    vars: {
      "--cream":          "#fdf4f3",
      "--cream-dark":     "#f8e7e4",
      "--white":          "#fffaf8",
      "--white-rgb":      "255, 250, 248",
      "--accent":         "#d98995",
      "--accent-dark":    "#b25d6b",
      "--accent-light":   "#efbec6",
      "--accent-rgb":        "217, 137, 149",
      "--accent-dark-rgb":   "178, 93, 107",
      "--accent-light-rgb":  "239, 190, 198",
      "--brown":          "#503640",
      "--brown-soft":     "#82636b",
      "--brown-rgb":      "50, 35, 40",
      "--deep-1":         "#3a2126",
      "--deep-2":         "#1d0f12",
      "--deep-rgb":       "29, 15, 18",
      "--overlay-rgb":    "58, 33, 38",
      "--danger":         "#b25d6b"
    }
  },
  "burgundy-rose": {
    nama: "Burgundy Rose",
    vars: {
      "--cream":          "#f7ecee",
      "--cream-dark":     "#efd9dd",
      "--white":          "#fdf8f9",
      "--white-rgb":      "253, 248, 249",
      "--accent":         "#9a4048",
      "--accent-dark":    "#6e2b31",
      "--accent-light":   "#c98a90",
      "--accent-rgb":        "154, 64, 72",
      "--accent-dark-rgb":   "110, 43, 49",
      "--accent-light-rgb":  "201, 138, 144",
      "--brown":          "#44303a",
      "--brown-soft":     "#7a5f68",
      "--brown-rgb":      "44, 30, 37",
      "--deep-1":         "#331319",
      "--deep-2":         "#190a0e",
      "--deep-rgb":       "25, 10, 14",
      "--overlay-rgb":    "51, 19, 25",
      "--danger":         "#8b2f35"
    }
  },
  "lilac-dream": {
    nama: "Lilac Dream",
    vars: {
      "--cream":          "#f6f2fa",
      "--cream-dark":     "#ebe2f5",
      "--white":          "#fcfafd",
      "--white-rgb":      "252, 250, 253",
      "--accent":         "#9b84c4",
      "--accent-dark":    "#77609f",
      "--accent-light":   "#c5b4e0",
      "--accent-rgb":        "155, 132, 196",
      "--accent-dark-rgb":   "119, 96, 159",
      "--accent-light-rgb":  "197, 180, 224",
      "--brown":          "#3d3448",
      "--brown-soft":     "#6f647d",
      "--brown-rgb":      "36, 30, 44",
      "--deep-1":         "#2a2136",
      "--deep-2":         "#140f1c",
      "--deep-rgb":       "18, 13, 26",
      "--overlay-rgb":    "42, 33, 54",
      "--danger":         "#a4453c"
    }
  },

  /* ---------- TEMA MODERN ---------- */
  "dusty-blue": {
    nama: "Dusty Blue",
    vars: {
      "--cream":          "#eef3f7",
      "--cream-dark":     "#dfe8ef",
      "--white":          "#f9fcfe",
      "--white-rgb":      "249, 252, 254",
      "--accent":         "#6d8093",
      "--accent-dark":    "#4e647a",
      "--accent-light":   "#a3b6c6",
      "--accent-rgb":        "109, 128, 147",
      "--accent-dark-rgb":   "78, 100, 122",
      "--accent-light-rgb":  "163, 182, 198",
      "--brown":          "#2f3945",
      "--brown-soft":     "#5d6b78",
      "--brown-rgb":      "33, 42, 51",
      "--deep-1":         "#22303f",
      "--deep-2":         "#0f1822",
      "--deep-rgb":       "12, 20, 30",
      "--overlay-rgb":    "24, 33, 43",
      "--danger":         "#b14a4a"
    }
  },
  "ocean-blue": {
    nama: "Ocean Blue",
    vars: {
      "--cream":          "#eff6fb",
      "--cream-dark":     "#deeef7",
      "--white":          "#f8fcff",
      "--white-rgb":      "248, 252, 255",
      "--accent":         "#2e6e91",
      "--accent-dark":    "#1d4e6b",
      "--accent-light":   "#5f97b8",
      "--accent-rgb":        "46, 110, 145",
      "--accent-dark-rgb":   "29, 78, 107",
      "--accent-light-rgb":  "95, 151, 184",
      "--brown":          "#25354a",
      "--brown-soft":     "#52637a",
      "--brown-rgb":      "20, 32, 46",
      "--deep-1":         "#14202e",
      "--deep-2":         "#080f19",
      "--deep-rgb":       "12, 20, 30",
      "--overlay-rgb":    "20, 32, 46",
      "--danger":         "#c0392b"
    }
  },
  "midnight-violet": {
    nama: "Midnight Violet",
    vars: {
      "--cream":          "#191423",
      "--cream-dark":     "#221a30",
      "--white":          "#2b2140",
      "--white-rgb":      "43, 33, 64",
      "--accent":         "#b78ad9",
      "--accent-dark":    "#8e5fb5",
      "--accent-light":   "#d1aee8",
      "--accent-rgb":        "183, 138, 217",
      "--accent-dark-rgb":   "142, 95, 181",
      "--accent-light-rgb":  "209, 174, 232",
      "--brown":          "#f0e8fa",
      "--brown-soft":     "#b9aac9",
      "--brown-rgb":      "30, 22, 45",
      "--deep-1":         "#120d1c",
      "--deep-2":         "#07050d",
      "--deep-rgb":       "10, 7, 16",
      "--overlay-rgb":    "18, 13, 28",
      "--danger":         "#e07b6e"
    }
  }
};

/* =====================================================
   GAYA TEMA — mengubah elemen lain (bukan hanya warna)
   font    : classic | luxury | modern | romantic | minimal
   ornament: dove | floral | royal | geometry | romance | minimal
   shape   : soft | rounded | square
   cover   : center | ornate | modern | minimal
   texture : plain | grain | bloom | lines
   Diterapkan script.js via atribut <html data-gaya-*="">
   ===================================================== */
const THEME_GAYA = {
  "royal-gold":        { font: "classic",   ornament: "dove",     shape: "soft",    cover: "center",  texture: "plain" },
  "champagne-classic": { font: "luxury",    ornament: "royal",    shape: "rounded", cover: "ornate",  texture: "grain" },
  "midnight-navy":     { font: "modern",    ornament: "geometry", shape: "square",  cover: "modern",  texture: "grain" },
  "mocha-latte":       { font: "modern",    ornament: "floral",   shape: "rounded", cover: "center",  texture: "grain" },
  "sage-garden":       { font: "romantic",  ornament: "floral",   shape: "soft",    cover: "ornate",  texture: "bloom" },
  "forest-emerald":    { font: "romantic",  ornament: "floral",   shape: "soft",    cover: "center",  texture: "bloom" },
  "emerald-gold":      { font: "luxury",    ornament: "royal",    shape: "rounded", cover: "ornate",  texture: "plain" },
  "warm-terracotta":   { font: "modern",    ornament: "floral",   shape: "rounded", cover: "modern",  texture: "grain" },
  "blush-rose":        { font: "romantic",  ornament: "romance",  shape: "soft",    cover: "ornate",  texture: "bloom" },
  "blush-romance":     { font: "romantic",  ornament: "romance",  shape: "soft",    cover: "center",  texture: "grain" },
  "burgundy-rose":     { font: "luxury",    ornament: "royal",    shape: "rounded", cover: "ornate",  texture: "grain" },
  "lilac-dream":       { font: "modern",    ornament: "geometry", shape: "square",  cover: "minimal", texture: "lines" },
  "dusty-blue":        { font: "modern",    ornament: "geometry", shape: "square",  cover: "modern",  texture: "lines" },
  "ocean-blue":        { font: "modern",    ornament: "geometry", shape: "soft",    cover: "center",  texture: "lines" },
  "midnight-violet":   { font: "minimal",   ornament: "minimal",  shape: "square",  cover: "minimal", texture: "plain" }
};

Object.keys(THEME_GAYA).forEach(function (id) {
  if (window.WEDDING_THEMES[id]) window.WEDDING_THEMES[id].gaya = THEME_GAYA[id];
});