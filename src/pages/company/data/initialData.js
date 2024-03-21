export const companyModules = [
  { name: 'Purchase', code: 100, icon: 'https://icons.foxa.in/media/icons/cart-shopping-fast.svg', primary: 'YES' },
  { name: 'Sales', code: 101, icon: 'https://icons.foxa.in/media/icons/point-of-sale-bill.svg', primary: 'YES' },
  { name: 'Purchase Return', code: 102, icon: 'https://icons.foxa.in/media/icons/cart-minus.svg', paretn: 100, primary: 'YES' },
  { name: 'Sales Return', code: 103, icon: 'https://icons.foxa.in/media/icons/undo.svg', parent: 101, primary: 'YES' },
  { name: 'Payment', code: 104, icon: 'https://icons.foxa.in/media/icons/document-signed_p9I0WXo.svg', primary: 'YES' },
  { name: 'Receipt', code: 105, icon: 'https://icons.foxa.in/media/icons/point-of-sale-bill.svg', primary: 'YES' },
  { name: 'Stock Journal', code: 106, icon: 'https://icons.foxa.in/media/icons/document-signed_p9I0WXo.svg', primary: 'YES' },
  { name: 'Account Journal', code: 107, icon: 'https://icons.foxa.in/media/icons/document-signed_p9I0WXo.svg', primary: 'YES' },
  { name: 'Staff', code: 108, icon: 'https://icons.foxa.in/media/icons/document-signed_p9I0WXo.svg', primary: 'YES' },
  { name: 'Staff Attendance', code: 109, icon: 'https://icons.foxa.in/media/icons/document-signed.svg', parent: 108, primary: 'YES' },
  { name: 'Payroll', code: 110, icon: 'https://icons.foxa.in/media/icons/cost-per-lead_11336391.png', parent: 108, primary: 'YES' },
  { name: 'Cheque Register', code: 111, icon: 'https://icons.foxa.in/media/icons/cost-per-lead_11336391.png', primary: 'YES' },
  { name: 'Production', code: 112, icon: 'https://icons.foxa.in/media/icons/product-management_12525462.png', primary: 'YES' },
  { name: 'Opening Stock', code: 149, parent: 147, primary: 'NO' },
  { name: 'Item Master', code: 148, parent: 147, primary: 'NO' },
  { name: 'Account Master', code: 125, parent: 124, primary: 'NO' },
  { name: 'Customer', code: 127, parent: 124, primary: 'NO' },
  { name: 'Supplier', code: 128, parent: 124, primary: 'NO' },
  { name: 'Staff Master', code: 137, icon: 'https://icons.foxa.in/media/icons/document-signed_p9I0WXo.svg', parent: 136, primary: 'NO' },
]

export const permissions =
{
  Sales: {
    'Main Action': [
      { key: 1, name: "Sales List", code: 1001, module: 101 },
      { key: 2, name: "Sales Add", code: 1002, module: 101 },
      { key: 3, name: "Sales Edit", code: 1003, module: 101 },
      { key: 4, name: "Sales Delete", code: 1004, module: 101 },
    ],
    'Sales Item Add': [
      { key: 5, name: "Delete", code: 1005, parent: 1002, module: 101 },
      { key: 6, name: "Edit", code: 1006, parent: 1002, module: 101 },
      { key: 7, name: "Add", code: 1007, parent: 1002, module: 101 },
      { key: 8, name: "customer details", code: 1008, parent: 1002, module: 101 },
      { key: 9, name: "invoice details", code: 1009, parent: 1002, module: 101 },
      { key: 10, name: "delivery details", code: 1010, parent: 1002, module: 101 },
    ],
    'On Edit': [
      { key: 11, name: "Item delete", code: 1011, parent: 1003, module: 101 },
      { key: 12, name: "Item edit", code: 1012, parent: 1003, module: 101 },
      { key: 13, name: "Item add", code: 10013, parent: 1003, module: 101 },
      { key: 14, name: "customer details", code: 1014, parent: 1003, module: 101 },
      { key: 15, name: "invoice details", code: 1015, parent: 1003, module: 101 },
      { key: 16, name: "delivery details", code: 1016, parent: 1003, module: 101 },
    ]
  },
  Item: {
    'MAIN OPERATIONS': [
      { key: 1, name: 'ITEM LIST', code: 1000 },
      { key: 2, name: 'ITEM VIEW', code: 1001 },
      { key: 3, name: 'ITEM ADD', code: 1002 },
      { key: 4, name: 'ITEM EDIT', code: 1003 },
      { key: 5, name: 'ITEM DELETE', code: 1004 },
    ],
    'ITEM ADD': [
      { key: 6, name: 'SECOND NAME LIST', code: 1005 },
      { key: 7, name: 'SECOND NAME ADD', code: 1006 },
      { key: 8, name: 'SECOND NAME EDIT', code: 1007 },
      { key: 9, name: 'CATEGORY LIST', code: 1008 },
      { key: 10, name: 'CATEGORY', code: 1009 },
      { key: 11, name: 'CATEGORY', code: 1010 },
      { key: 12, name: 'SUB CATEGORY', code: 1011 },
      { key: 13, name: 'SUB CATEGORY', code: 1012 },
      { key: 14, name: 'SUB CATEGORY', code: 1013 },
      { key: 15, name: 'COMPANY LIST', code: 1014 },
      { key: 16, name: 'COMPANY ADD', code: 1015 },
      { key: 17, name: 'COMPANY EDIT', code: 1016 },
      { key: 18, name: 'SIZE LIST', code: 1017 },
      { key: 19, name: 'SIZE ADD', code: 1018 },
      { key: 20, name: 'SIZE EDIT', code: 1019 },
      { key: 21, name: 'COLOR LIST', code: 1020 },
      { key: 22, name: 'COLOR ADD', code: 1021 },
      { key: 23, name: 'COLOR EDIT', code: 1022 },
      { key: 24, name: 'GROUP LIST', code: 1023 },
      { key: 25, name: 'GROUP ADD', code: 1024 },
      { key: 26, name: 'GROUP EDIT', code: 1025 },
      { key: 27, name: 'TAX GROUP LIST', code: 1026 },
      { key: 28, name: 'TAX GROUP ADD', code: 1027 },
      { key: 29, name: 'TAX GROUP EDIT', code: 1028 },
      { key: 30, name: 'GODWON/RACK LIST', code: 1029 },
      { key: 31, name: 'GODWON/RACK ADD', code: 1030 },
      { key: 32, name: 'GODWON/RACK EDIT', code: 1031 },
      { key: 33, name: 'STOCK UNIT LIST', code: 1032 },
      { key: 34, name: 'STOCK UNIT ADD', code: 1033 },
      { key: 35, name: 'STOCK UNIT EDIT', code: 1034 },
      { key: 36, name: 'UNIT CONVERSION LIST', code: 1035 },
      { key: 37, name: 'UNIT CONVERSION ADD', code: 1036 },
      { key: 38, name: 'UNIT CONVERSION EDIT', code: 1037 },
      { key: 39, name: 'UNIT CONVERSION DELETE', code: 1038 },
      { key: 40, name: 'BARCODE LIST', code: 1039 },
      { key: 41, name: 'BARCODE ADD', code: 1040 },
      { key: 42, name: 'BARCODE EDIT', code: 1041 },
      { key: 43, name: 'BARCODE DELETE', code: 1042 },
    ],
    'ITEM EDIT': [
      { key: 44, name: 'SECOND NAME LIST', code: 1043 },
      { key: 45, name: 'SECOND NAME ADD', code: 1044 },
      { key: 46, name: 'SECOND NAME EDIT', code: 1045 },
      { key: 47, name: 'CATEGORY LIST', code: 1046 },
      { key: 48, name: 'CATEGORY ADD', code: 1047 },
      { key: 49, name: 'CATEGORY EDIT', code: 1048 },
      { key: 50, name: 'SUB CATEGORY LIST', code: 1049 },
      { key: 51, name: 'SUB CATEGORY ADD', code: 1050 },
      { key: 52, name: 'SUB CATEGORY EDIT', code: 1051 },
      { key: 53, name: 'COMPANY LIST', code: 1052 },
      { key: 54, name: 'COMPANY ADD', code: 1053 },
      { key: 55, name: 'COMPANY EDIT', code: 1054 },
      { key: 56, name: 'SIZE LIST', code: 1055 },
      { key: 57, name: 'SIZE ADD', code: 1056 },
      { key: 58, name: 'SIZE EDIT', code: 1057 },
      { key: 59, name: 'COLOR LIST', code: 1058 },
      { key: 60, name: 'COLOR ADD', code: 1059 },
      { key: 61, name: 'COLOR EDIT', code: 1060 },
      { key: 62, name: 'GROUP LIST', code: 1061 },
      { key: 63, name: 'GROUP ADD', code: 1062 },
      { key: 64, name: 'GROUP EDIT', code: 1063 },
      { key: 65, name: 'TAX GROUP LIST', code: 1064 },
      { key: 66, name: 'TAX GROUP ADD', code: 1065 },
      { key: 67, name: 'TAX GROUP EDIT', code: 1066 },
      { key: 68, name: 'GODWON/RACK LIST', code: 1067 },
      { key: 69, name: 'GODWON/RACK ADD', code: 1068 },
      { key: 70, name: 'GODWON/RACK EDIT', code: 1069 },
      { key: 71, name: 'STOCK UNIT LIST', code: 1070 },
      { key: 72, name: 'STOCK UNIT ADD', code: 1071 },
      { key: 73, name: 'STOCK UNIT EDIT', code: 1072 },
      { key: 74, name: 'UNIT CONVERSION LIST', code: 1073 },
      { key: 75, name: 'UNIT CONVERSION ADD', code: 1074 },
      { key: 76, name: 'UNIT CONVERSION EDIT', code: 1075 },
      { key: 77, name: 'UNIT CONVERSION DELETE', code: 1076 },
      { key: 78, name: 'BARCODE LIST', code: 1077 },
      { key: 79, name: 'BARCODE ADD', code: 1078 },
      { key: 80, name: 'BARCODE EDIT', code: 1079 },
      { key: 81, name: 'BARCODE DELETE', code: 1080 },
    ]
  },
  Account: {
    'MAIN OPERATION': [
      { key: 82, name: 'ACCOUNTS LIST', code: 1081 },
      { key: 83, name: 'ACCOUNTS VIEW', code: 1082 },
      { key: 84, name: 'ACCOUNTS ADD', code: 1083 },
      { key: 85, name: 'ACCOUNTS EDIT', code: 1084 },
      { key: 86, name: 'ACCOUNTS DELETE', code: 1085 },
    ],
    'ACCOUNT GROUP': [
      { key: 432, name: 'Account Group List ', code: 1431 },
      { key: 433, name: 'Account Group Add', code: 1432 },
      { key: 434, name: 'Account Group View', code: 1433 },
      { key: 435, name: 'Account Group Put', code: 1434 },
      { key: 436, name: 'Account Group  Delete', code: 1435 },
    ],
    'ACCOUNT ADD': [
      { key: 87, name: 'ACCOUNTS GROUP LIST', code: 1086 },
      { key: 88, name: 'ACCOUNTS GROUP ADD', code: 1087 },
      { key: 89, name: 'ACCOUNTS GROUP EDIT', code: 1088 },
      { key: 90, name: 'ACCOUNTS GROUOP DELETE', code: 1089 },
    ],
    'ACCOUNT EDIT': [
      { key: 91, name: 'ACCOUNTS GROUP LIST', code: 1090 },
      { key: 92, name: 'ACCOUNTS GROUP ADD', code: 1091 },
      { key: 93, name: 'ACCOUNTS GROUP EDIT', code: 1092 },
      { key: 94, name: 'ACCOUNTS GROUOP DELETE', code: 1093 },
    ]
  },
  Customer: {
    'MAIN OPERATIONS': [
      { key: 95, name: 'CUSTOMER LIST', code: 1094 },
      { key: 96, name: 'CUSTOMER VIEW', code: 1095 },
      { key: 97, name: 'CUSTOMER ADD', code: 1096 },
      { key: 98, name: 'CUSTOMER EDIT', code: 1097 },
      { key: 99, name: 'CUSTOMER DELETE', code: 1098 },
    ],
    'CUSTOMER ADD': [
      { key: 100, name: 'SET RATES LIST', code: 1099 },
      { key: 101, name: 'SET RATES ADD', code: 1100 },
      { key: 102, name: 'SET RATES EDIT', code: 1101 },
      { key: 103, name: 'SET RATES DELETE', code: 1102 },
      { key: 104, name: 'ROUTE LIST', code: 1103 },
      { key: 105, name: 'ROUTE ADD', code: 1104 },
      { key: 106, name: 'ROUTE EDIT', code: 1105 },
      { key: 107, name: 'CITY LIST', code: 1106 },
      { key: 108, name: 'CITY ADD', code: 1107 },
      { key: 109, name: 'CITY EDIT', code: 1108 },
      { key: 110, name: 'TOWN LIST', code: 1109 },
      { key: 111, name: 'TOWN ADD', code: 1110 },
      { key: 112, name: 'TOWN EDIT', code: 1111 },
      { key: 113, name: 'DISTRICT LIST', code: 1112 },
      { key: 114, name: 'DISTRICT ADD', code: 1113 },
      { key: 115, name: 'DISTRICT EDIT', code: 1114 },
      { key: 116, name: 'TYPE LIST', code: 1115 },
      { key: 117, name: 'TYPE ADD', code: 1116 },
      { key: 118, name: 'TYPE EDIT', code: 1117 },
      { key: 119, name: 'BILL TYPE LIST', code: 1118 },
      { key: 120, name: 'BILL TYPE ADD', code: 1119 },
      { key: 121, name: 'BILL TYPE EDIT', code: 1120 },
    ],
    'CUSTOMER EDIT': [

      { key: 122, name: 'SET RATES LIST', code: 1121 },
      { key: 123, name: 'SET RATES ADD', code: 1122 },
      { key: 124, name: 'SET RATES EDIT', code: 1123 },
      { key: 125, name: 'SET RATES DELETE', code: 1124 },
      { key: 126, name: 'ROUTE LIST', code: 1125 },
      { key: 127, name: 'ROUTE ADD', code: 1126 },
      { key: 128, name: 'ROUTE EDIT', code: 1127 },
      { key: 129, name: 'CITY LIST', code: 1128 },
      { key: 130, name: 'CITY ADD', code: 1129 },
      { key: 131, name: 'CITY EDIT', code: 1130 },
      { key: 132, name: 'TOWN LIST', code: 1131 },
      { key: 133, name: 'TOWN ADD', code: 1132 },
      { key: 134, name: 'TOWN EDIT', code: 1133 },
      { key: 135, name: 'DISTRICT LIST', code: 1134 },
      { key: 136, name: 'DISTRICT ADD', code: 1135 },
      { key: 137, name: 'DISTRICT EDIT', code: 1136 },
      { key: 138, name: 'TYPE LIST', code: 1137 },
      { key: 139, name: 'TYPE ADD', code: 1138 },
      { key: 140, name: 'TYPE EDIT', code: 1139 },
      { key: 141, name: 'BILL TYPE LIST', code: 1140 },
      { key: 142, name: 'BILL TYPE ADD', code: 1141 },
      { key: 143, name: 'BILL TYPE EDIT', code: 1142 },
    ]
  },
  Supplier: {
    'MAIN OPERATION': [

      { key: 144, name: 'SUPPLIER LIST', code: 1143 },
      { key: 145, name: 'SUPPLIER VIEW', code: 1144 },
      { key: 146, name: 'SUPPLIER ADD', code: 1145 },
      { key: 147, name: 'SUPPLIER EDIT', code: 1146 },
      { key: 148, name: 'SUPPLIER DELETE', code: 1147 },
    ],
    'SUPPLIER ADD': [

      { key: 149, name: 'DISTRICT LIST', code: 1148 },
      { key: 150, name: 'DISTRICT ADD', code: 1149 },
      { key: 151, name: 'DISTRICT EDIT', code: 1150 },
      { key: 152, name: 'COMPANY LIST', code: 1151 },
      { key: 153, name: 'COMPANY ADD', code: 1152 },
      { key: 154, name: 'COMPANY EDIT', code: 1153 },
    ],
    'SUPPLIER EDIT': [

      { key: 155, name: 'DISTRICT LIST', code: 1154 },
      { key: 156, name: 'DISTRICT ADD', code: 1155 },
      { key: 157, name: 'DISTRICT EDIT', code: 1156 },
      { key: 158, name: 'COMPANY LIST', code: 1157 },
      { key: 159, name: 'COMPANY ADD', code: 1158 },
      { key: 160, name: 'COMPANY EDIT', code: 1159 },
    ]
  },
  Staff: {
    "MAIN OPERATIONS": [

      { key: 316, name: 'STAFF LIST', code: 1315 },
      { key: 317, name: 'STAFF VIEW', code: 1316 },
      { key: 318, name: 'STAFF ADD', code: 1317 },
      { key: 319, name: 'STAFF EDIT ', code: 1318 },
      { key: 320, name: 'STAFF DELETE', code: 1319 },
    ],
    'STAFF ADD': [

      { key: 321, name: 'STAFF EDUCATION ADD', code: 1320 },
      { key: 322, name: 'STAFF EDUCATION EDIT', code: 1321 },
      { key: 323, name: 'STAFF PROFESSION ADD', code: 1322 },
      { key: 324, name: 'STAFF PROFESSION EDIT', code: 1323 },
      { key: 325, name: 'DESIGNATION ADD', code: 1324 },
      { key: 326, name: 'DESIGNATION EDIT', code: 1325 },
      { key: 327, name: 'DESIGNATION LIST', code: 1326 },
      { key: 328, name: 'STAFF GRADE ADD', code: 1327 },
      { key: 329, name: 'STAFF GRADE EDIT', code: 1328 },
      { key: 330, name: 'STAFF GRADE LIST', code: 1329 },
    ],
    'STAFF EDIT': [

      { key: 331, name: 'STAFF EDUCATION ADD', code: 1330 },
      { key: 332, name: 'STAFF EDUCATION EDIT', code: 1331 },
      { key: 333, name: 'STAFF PROFESSION ADD', code: 1332 },
      { key: 334, name: 'STAFF PROFESSION EDIT', code: 1333 },
      { key: 335, name: 'DESIGNATION ADD', code: 1334 },
      { key: 336, name: 'DESIGNATION EDIT', code: 1335 },
      { key: 337, name: 'DESIGNATION LIST', code: 1336 },
      { key: 338, name: 'STAFF GRADE ADD', code: 1337 },
      { key: 339, name: 'STAFF GRADE EDIT', code: 1338 },
      { key: 340, name: 'STAFF GRADE LIST', code: 1339 },
    ],
  },
  'Opening-Stock': {
    'MAIN OPERATIONS': [
      { key: 161, name: 'OPENING STOCK LIST', code: 1160 },
      { key: 162, name: 'OPENING STOCK EDIT', code: 1161 },
    ]
  },
  'Material-Composition': {
    'MAIN OPERATIONS': [

      { key: 364, name: 'Material Composition Item Add', code: 1363 },
      { key: 365, name: 'Material Composition Item Edit', code: 1364 },
      { key: 366, name: 'Material Composition Item Delete', code: 1365 },
      { key: 367, name: 'Material Compositions List View', code: 1366 },
    ],
    'MATERIAL COMPOSITION ADD': [
      { key: 368, name: 'Composition Type Add ', code: 1367 },
      { key: 369, name: 'Composition Type Edit', code: 1368 },
      { key: 370, name: 'Raw Material Add', code: 1369 },
      { key: 371, name: 'Raw Material Edit', code: 1370 },
      { key: 372, name: 'Raw Material Delete', code: 1371 },
      { key: 373, name: 'ByProduct Add', code: 1372 },
      { key: 374, name: 'ByProduct Edit', code: 1373 },
      { key: 375, name: 'ByProduct Delete', code: 1374 },
      { key: 376, name: 'Expense Add', code: 1375 },
      { key: 377, name: 'Expense Edit', code: 1376 },
      { key: 378, name: 'Expense Delete', code: 1377 },
    ],
    'MATERIAL COMPOSITION EDIT': [
      { key: 379, name: 'Composition Type Add', code: 1378 },
      { key: 380, name: 'Composition Type Edit', code: 1379 },
      { key: 381, name: 'Raw Material Add', code: 1380 },
      { key: 382, name: 'Raw Material Edit', code: 1381 },
      { key: 383, name: 'Raw Material Delete', code: 1382 },
      { key: 384, name: 'ByProduct Add', code: 1383 },
      { key: 385, name: 'ByProduct Edit', code: 1384 },
      { key: 386, name: 'ByProduct Delete', code: 1385 },
      { key: 387, name: 'Expense Add ', code: 1386 },
      { key: 388, name: 'Expense Edit', code: 1387 },
      { key: 389, name: 'Expense Delete', code: 1388 },
    ]
  },
  'Purchase': {
    'MAIN OPERATIONS': [
      { key: 163, name: 'PURCHASE LIST', code: 1162 },
      { key: 164, name: 'PURCHASE ADD', code: 1163 },
      { key: 165, name: 'PURCHASE VIEW', code: 1164 },
      { key: 166, name: 'PURCHASE EDIT', code: 1165 },
      { key: 167, name: 'PURCHASE DELETE', code: 1166 },
    ],
    'PURCHASE ADD': [
      { key: 168, name: 'ADD SUPPLIER', code: 1167 },
      { key: 169, name: 'ITEM ADD', code: 1168 },
      { key: 170, name: 'PURCHASE ITEM ADD', code: 1169 },
      { key: 171, name: 'PURCHASE ITEM EDIT', code: 1170 },
      { key: 172, name: 'PURCHASE ITEM DELETE', code: 1171 },
      { key: 173, name: 'CHANGE SUPPLIER DETAILS', code: 1172 },
      { key: 174, name: 'CHANGE INVOICE DETAILS', code: 1173 },
    ],
    'PURCHASE EDIT': [
      { key: 175, name: 'ADD SUPPLIER', code: 1174 },
      { key: 176, name: 'ITEM ADD', code: 1175 },
      { key: 177, name: 'PURCHASE ITEM ADD', code: 1176 },
      { key: 178, name: 'PURCHASE ITEM EDIT', code: 1177 },
      { key: 179, name: 'PURCHASE ITEM DELETE', code: 1178 },
      { key: 180, name: 'CHANGE SUPPLIER DETAILS', code: 1179 },
      { key: 181, name: 'CHANGE INVOICE DETAILS', code: 1180 },
    ]
  },
  'Purchase-Return': {
    'MAIN OPERATIONS': [
      { key: 201, name: 'PURCHASE RETURN LIST', code: 1200 },
      { key: 202, name: 'PURCHASE RETURN ADD', code: 1201 },
      { key: 203, name: 'PURCHASE RETURN VIEW', code: 1202 },
      { key: 204, name: 'PURCHASE RETURN EDIT', code: 1203 },
      { key: 205, name: 'PURCHASE RETURN DELETE', code: 1204 },
    ],
    'PURCHASE RETURN ADD': [
      { key: 206, name: 'ADD SUPPLIER', code: 1205 },
      { key: 207, name: 'ITEM ADD', code: 1206 },
      { key: 208, name: 'PURCHASE RETURN ITEM ADD', code: 1207 },
      { key: 209, name: 'PURCHASE RETURN ITEM EDIT', code: 1208 },
      { key: 210, name: 'PURCHASE RETURN ITEM DELETE', code: 1209 },
      { key: 211, name: 'CHANGE SUPPLIER DETAILS', code: 1210 },
      { key: 212, name: 'CHANGE INVOICE DETAILS', code: 1211 },
    ],
    'PURCHASE RETURN EDIT': [
      { key: 213, name: 'ADD SUPPLIER', code: 1212 },
      { key: 214, name: 'ITEM ADD', code: 1213 },
      { key: 215, name: 'PURCHASE RETURN ITEM ADD', code: 1214 },
      { key: 216, name: 'PURCHASE RETURN ITEM EDIT', code: 1215 },
      { key: 217, name: 'PURCHASE RETURN ITEM DELETE', code: 1216 },
      { key: 218, name: 'CHANGE SUPPLIER DETAILS', code: 1217 },
      { key: 219, name: 'CHANGE INVOICE DETAILS', code: 1218 },
    ]
  },
  'Purchase-Order': {
    'MAIN OPERATIONS': [
      { key: 239, name: 'PURCHASE ORDER LIST', code: 1238 },
      { key: 240, name: 'PURCHASE ORDER ADD', code: 1239 },
      { key: 241, name: 'PURCHASE ORDER VIEW', code: 1240 },
      { key: 242, name: 'PURCHASE ORDER EDIT', code: 1241 },
      { key: 243, name: 'PURCHASE ORDER DELETE', code: 1242 },
    ],
    'PURCHASE ORDER ADD': [
      { key: 244, name: 'ADD SUPPLIER', code: 1243 },
      { key: 245, name: 'ITEM ADD', code: 1244 },
      { key: 246, name: 'PURCHASE ORDER ITEM ADD', code: 1245 },
      { key: 247, name: 'PURCHASE ORDER ITEM EDIT', code: 1246 },
      { key: 248, name: 'PURCHASE ORDER ITEM DELETE', code: 1247 },
      { key: 249, name: 'CHANGE SUPPLIER DETAILS', code: 1248 },
      { key: 250, name: 'CHANGE INVOICE DETAILS', code: 1249 },
    ],
    'PURCHASE ORDER EDIT': [
      { key: 251, name: 'ADD SUPPLIER', code: 1250 },
      { key: 252, name: 'ITEM ADD', code: 1251 },
      { key: 253, name: 'PURCHASE ORDER ITEM ADD', code: 1252 },
      { key: 254, name: 'PURCHASE ORDER ITEM EDIT', code: 1253 },
      { key: 255, name: 'PURCHASE ORDER ITEM DELETE', code: 1254 },
      { key: 256, name: 'CHANGE SUPPLIER DETAILS', code: 1255 },
      { key: 257, name: 'CHANGE INVOICE DETAILS', code: 1256 },
    ]
  },
  Sales: {
    'MAIN OPERATIONS': [
      { key: 182, name: 'SALES LIST', code: 1181 },
      { key: 183, name: 'SALES ADD', code: 1182 },
      { key: 184, name: 'SALES VIEW', code: 1183 },
      { key: 185, name: 'SALES EDIT', code: 1184 },
      { key: 186, name: 'SALES DELETE', code: 1185 },
    ],
    'SALES ADD': [
      { key: 187, name: 'ADD CUTOMER', code: 1186 },
      { key: 188, name: 'ITEM ADD', code: 1187 },
      { key: 189, name: 'SALES ITEM ADD', code: 1188 },
      { key: 190, name: 'SALES ITEM EDIT', code: 1189 },
      { key: 191, name: 'SALES ITEM DELETE', code: 1190 },
      { key: 192, name: 'CHANGE CUSTOMER DETAILS', code: 1191 },
      { key: 193, name: 'CHANGE INVOICE DETAILS', code: 1192 },
    ],
    'SALES EDIT': [
      { key: 194, name: 'ADD CUSTOMER', code: 1193 },
      { key: 195, name: 'ITEM ADD', code: 1194 },
      { key: 196, name: 'SALES ITEM ADD', code: 1195 },
      { key: 197, name: 'SALES ITEM EDIT', code: 1196 },
      { key: 198, name: 'SALES ITEM DELETE', code: 1197 },
      { key: 199, name: 'CHANGE SUPPLIER DETAILS', code: 1198 },
      { key: 200, name: 'CHANGE INVOICE DETAILS', code: 1199 },
    ]
  },
  'Sales-Return': {
    'MAIN OPERATIONS': [
      { key: 220, name: 'SALES RETURN RETURN LIST', code: 1219 },
      { key: 221, name: 'SALES RETURN RETURN ADD', code: 1220 },
      { key: 222, name: 'SALES RETURN RETURN VIEW', code: 1221 },
      { key: 223, name: 'SALES RETURN RETURN EDIT', code: 1222 },
      { key: 224, name: 'SALES RETURN RETURN DELETE', code: 1223 },
    ],
    'SALES RETURN ADD': [
      { key: 225, name: 'ADD CUSTOMER', code: 1224 },
      { key: 226, name: 'ITEM ADD', code: 1225 },
      { key: 227, name: 'SALES RETURN RETURN ITEM ADD', code: 1226 },
      { key: 228, name: 'SALES RETURN RETURN ITEM EDIT', code: 1227 },
      { key: 229, name: 'SALES RETURN RETURN ITEM DELETE', code: 1228 },
      { key: 230, name: 'CHANGE SUPPLIER DETAILS', code: 1229 },
      { key: 231, name: 'CHANGE INVOICE DETAILS', code: 1230 },
    ],
    'SALES RETURN EDIT': [
      { key: 232, name: 'ADD CUSTOMER', code: 1231 },
      { key: 233, name: 'ITEM ADD', code: 1232 },
      { key: 234, name: 'SALES RETURN RETURN ITEM ADD', code: 1233 },
      { key: 235, name: 'SALES RETURN RETURN ITEM EDIT', code: 1234 },
      { key: 236, name: 'SALES RETURN RETURN ITEM DELETE', code: 1235 },
      { key: 237, name: 'CHANGE SUPPLIER DETAILS', code: 1236 },
      { key: 238, name: 'CHANGE INVOICE DETAILS', code: 1237 },
    ]
  },
  'Sales-Order': {
    'MAIN OPERATIONS': [
      { key: 258, name: 'SALES ORDER ORDER LIST', code: 1257 },
      { key: 259, name: 'SALES ORDER ORDER ADD', code: 1258 },
      { key: 260, name: 'SALES ORDER ORDER VIEW', code: 1259 },
      { key: 261, name: 'SALES ORDER ORDER EDIT', code: 1260 },
      { key: 262, name: 'SALES ORDER ORDER DELETE', code: 1261 },
    ],
    'SALES ORDER ADD': [
      { key: 263, name: 'ADD CUSTOMER - SALES ORDER ORDER ADD', code: 1262 },
      { key: 264, name: 'ITEM ADD - SALES ORDER ORDER ADD', code: 1263 },
      { key: 265, name: 'SALES ORDER ORDER ITEM ADD - SALES ORDER ORDER ADD', code: 1264 },
      { key: 266, name: 'SALES ORDER ORDER ITEM EDIT - SALES ORDER ORDER ADD', code: 1265 },
      { key: 267, name: 'SALES ORDER ORDER ITEM DELETE - SALES ORDER ORDER ADD', code: 1266 },
      { key: 268, name: 'CHANGE SUPPLIER DETAILS - SALES ORDER ORDER ADD', code: 1267 },
      { key: 269, name: 'CHANGE INVOICE DETAILS - SALES ORDER ORDER ADD', code: 1268 },
    ],
    'SALES ORDER EDIT': [
      { key: 270, name: 'ADD CUSTOMER - SALES ORDER ORDER EDIT', code: 1269 },
      { key: 271, name: 'ITEM ADD - SALES ORDER ORDER EDIT', code: 1270 },
      { key: 272, name: 'SALES ORDER ORDER ITEM ADD - SALES ORDER ORDER EDIT', code: 1271 },
      { key: 273, name: 'SALES ORDER ORDER ITEM EDIT - SALES ORDER ORDER EDIT', code: 1272 },
      { key: 274, name: 'SALES ORDER ORDER ITEM DELETE - SALES ORDER ORDER EDIT', code: 1273 },
      { key: 275, name: 'CHANGE SUPPLIER DETAILS - SALES ORDER ORDER EDIT', code: 1274 },
      { key: 276, name: 'CHANGE INVOICE DETAILS - SALES ORDER ORDER EDIT', code: 1275 },
    ]
  },
  Payment: {
    'MAIN OPERATIONS': [
      { key: 277, name: 'PAYMENT VIEW', code: 1276 },
      { key: 278, name: 'PAYMENT LIST', code: 1277 },
      { key: 279, name: 'PAYMENT ADD', code: 1278 },
      { key: 280, name: 'PAYMENT EDIT', code: 1279 },
      { key: 281, name: 'PAYMENT DELETE', code: 1280 },
    ]
  },
  Reciept: {
    'MAIN OPERATIONS': [
      { key: 282, name: 'RECIEPT VIEW', code: 1281 },
      { key: 283, name: 'RECIEPT LIST', code: 1282 },
      { key: 284, name: 'RECIEPT ADD', code: 1283 },
      { key: 285, name: 'RECIEPT EDIT', code: 1284 },
      { key: 286, name: 'RECIEPT DELETE', code: 1285 },
    ]
  },
  'Stock-Journal': {
    'MAIN OPERATIONS': [

      { key: 287, name: 'STOCK JOURNAL VIEW', code: 1286 },
      { key: 288, name: 'STOCK JOURNAL LIST', code: 1287 },
      { key: 289, name: 'STOCK JOURNAL ADD', code: 1288 },
      { key: 290, name: 'STOCK JOURNAL EDIT', code: 1289 },
      { key: 291, name: 'STOCK JOURNAL DELETE', code: 1290 },
    ],
    'STOCK JOURNAL ADD': [
      { key: 292, name: 'ITEM ADD - STOCK JOURNAL ADD', code: 1291 },
      { key: 293, name: 'ITEM EDIT - STOCK JOURNAL ADD', code: 1292 },
      { key: 294, name: 'ITEM DELETE - STOCK JOURNAL ADD', code: 1293 },
    ],
    'STOCK JOURNAL EDIT': [
      { key: 295, name: 'ITEM ADD - STOCK JOURNAL EDIT', code: 1294 },
      { key: 296, name: 'ITEM EDIT - STOCK JOURNAL EDIT', code: 1295 },
      { key: 297, name: 'ITEM DELETE - STOCK JOURNAL EDIT', code: 1296 },
    ]
  },
  'Account-Journal': {
    'MAIN OPERATIONS': [
      { key: 298, name: 'ACCOUNT JOURNAL VIEW', code: 1297 },
      { key: 299, name: 'ACCOUNT JOURNAL LIST', code: 1298 },
      { key: 300, name: 'ACCOUNT JOURNAL ADD', code: 1299 },
      { key: 301, name: 'ACCOUNT JOURNAL EDIT', code: 1300 },
      { key: 302, name: 'ACCOUNT JOURNAL DELETE', code: 1301 },
    ],
    'ACCOUNT JOURNAL ADD': [
      { key: 303, name: 'ACCOUNT ADD - ACCOUNT JOURNAL ADD', code: 1302 },
      { key: 304, name: 'ACCOUNT EDIT - ACCOUNT JOURNAL ADD', code: 1303 },
      { key: 305, name: 'ACCOUNT DELETE - ACCOUNT JOURNAL ADD', code: 1304 },
    ],
    'ACCOUNT JOURNAL EDIT': [
      { key: 306, name: 'ACCOUNT ADD - ACCOUNT JOURNAL EDIT', code: 1305 },
      { key: 307, name: 'ACCOUNT EDIT - ACCOUNT JOURNAL EDIT', code: 1306 },
      { key: 308, name: 'ACCOUNT DELETE - ACCOUNT JOURNAL EDIT', code: 1307 },
    ]
  },
  'Staff-Attendance': {
    'MAIN OPERATIONS': [
      { key: 354, name: 'STAFF ATTENDANCE REPORT VIEW', code: 1353 },
      { key: 355, name: 'STAFF SALARY REPORT VIEW', code: 1354 },
    ],
  },
  'Cheque-Register': {
    'MAIN OPERATIONS': [
      { key: 309, name: 'CHEQUE REGISTER VIEW', code: 1308 },
      { key: 310, name: 'CHEQUE REGISTER LIST', code: 1309 },
      { key: 311, name: 'CHEQUE REGISTER ADD', code: 1310 },
      { key: 312, name: 'CHEQUE REGISTER EDIT', code: 1311 },
      { key: 313, name: 'CHEQUE REGISTER DELETE', code: 1312 },
    ]
  },
  'Production': {
    'MAIN OPERATIONS': [
      { key: 390, name: 'Production List', code: 1389 },
      { key: 391, name: 'Production Add', code: 1390 },
      { key: 392, name: 'Production Edit ', code: 1391 },
      { key: 393, name: 'Production View', code: 1392 },
      { key: 394, name: 'Production Delete', code: 1393 },
    ],
    'PRODUCTION ADD': [
      { key: 395, name: 'Production Item Add', code: 1394 },
      { key: 396, name: 'Production Item Edit', code: 1395 },
      { key: 397, name: 'Production Item Delete', code: 1396 },
      { key: 398, name: 'Raw Material Add', code: 1397 },
      { key: 399, name: 'Raw Material Edit', code: 1398 },
      { key: 400, name: 'Raw Material Delete', code: 1399 },
      { key: 401, name: 'ByProduct Add', code: 1400 },
      { key: 402, name: 'ByProduct Edit', code: 1401 },
      { key: 403, name: 'ByProduct Delete', code: 1402 },
      { key: 404, name: 'Expense Add', code: 1403 },
      { key: 405, name: 'Expense Edit', code: 1404 },
      { key: 406, name: 'Expense Delete', code: 1405 },
    ],
    'PRODUCTION EDIT': [
      { key: 407, name: 'Production Item Add', code: 1406 },
      { key: 408, name: 'Production Item Edit', code: 1407 },
      { key: 409, name: 'Production Item Delete', code: 1408 },
      { key: 410, name: 'Raw Material Add', code: 1409 },
      { key: 411, name: 'Raw Material Edit', code: 1410 },
      { key: 412, name: 'Raw Material Delete', code: 1411 },
      { key: 413, name: 'ByProduct Add', code: 1412 },
      { key: 414, name: 'ByProduct Edit', code: 1413 },
      { key: 415, name: 'ByProduct Delete', code: 1414 },
      { key: 416, name: 'Expense Add', code: 1415 },
      { key: 417, name: 'Expense Edit', code: 1416 },
      { key: 418, name: 'Expense Delete', code: 1417 },
    ],
  },
  'Pay-Roll': {
    'MAIN OPERATIONS': [
      { key: 422, name: 'Pay Roll List', code: 1421 },
      { key: 423, name: 'Pay Roll Add', code: 1422 },
      { key: 424, name: 'Pay Roll Edit', code: 1423 },
      { key: 425, name: 'Pay Roll Delete', code: 1424 },
    ]
  },
  'Stock-Ledger': {
    'MAIN OPERATIONS': [
      { key: 314, name: 'STOCK LEDGER REPORT VIEW', code: 1313 }
    ]
  },
  'Account-Ledger': {
    'MAIN OPERATIONS': [
      { key: 315, name: 'ACCOUNT LEDGER REPORT VIEW', code: 1314 }
    ]
  },
  'Day-Book': {
    'MAIN OPERATIONS': [
      { key: 426, name: 'DayBook Report View', code: 1425 }
    ]
  },
  'Cust-Outstanding': {
    'MAIN OPERATIONS': [
      { key: 427, name: 'Customer Outstanding Report View', code: 1426 }
    ]
  },
  'Sup-Outstanding': {
    'MAIN OPERATIONS': [
      { key: 428, name: 'Supplier Outstanding Report View', code: 1427 }
    ]
  },
  'Staff-Outstanding': {
    'MAIN OPERATIONS': [
      { key: 429, name: 'Staff Outstanding Report View', code: 1428 }
    ]
  },
  'Sales-Report': {
    'MAIN OPERATIONS': [
      { key: 430, name: 'Sales Report View', code: 1429 }
    ]
  },
  'Bill-Wise-Report': {
    'MAIN OPERATIONS': [
      { key: 431, name: 'Bill Wise Profit Report View', code: 1430 }
    ]
  },
  'Tax-Reports': { 'MAIN OPERATIONS': [{ key: 343, name: 'TAX REPORTS REPORT VIEW', code: 1342 },] },
  'Cashbook-Report': { 'MAIN OPERATIONS': [{ key: 344, name: 'CASHBOOK REPORT VIEW', code: 1343 },] },
  'Stock-Journal-Report': { 'MAIN OPERATIONS': [{ key: 345, name: 'STOCK JOURNAL REPORT VIEW', code: 1344 },] },
  'Item-Wise-Profit': { 'MAIN OPERATIONS': [{ key: 346, name: 'ITEM WISE PROFIT REPORT VIEW', code: 1345 },] },
  'Purchase-Report': { 'MAIN OPERATIONS': [{ key: 347, name: 'PURCHASE REPORT VIEW', code: 1346 },] },
  'Barcode-Register': { 'MAIN OPERATIONS': [{ key: 348, name: 'BARCODE REGISTER REPORT VIEW', code: 1347 },] },
  'Item-History': { 'MAIN OPERATIONS': [{ key: 349, name: 'ITEM HISTORY REPORT VIEW', code: 1348 },] },
  'Bill-Wise-Ledger': { 'MAIN OPERATIONS': [{ key: 350, name: 'BILL WISE LEDGER REPORT VIEW', code: 1349 },] },
  'Bill-Wise-Profit': { 'MAIN OPERATIONS': [{ key: 362, name: 'TRAID PROFIT AND LOSS REPORT VIEW', code: 1361 },] },
  'Stock-Value-Report': { 'MAIN OPERATIONS': [{ key: 353, name: 'STOCK VALUE REPORT', code: 1352 },] },
  'Staff-Salary-&-Attendance': { 'MAIN OPERATIONS': [{ key: 354, name: 'STAFF ATTENDANCE REPORT VIEW', code: 1353 }, { key: 355, name: 'STAFF SALARY REPORT VIEW', code: 1354 }] },
  'Production-Report': { 'MAIN OPERATIONS': [{ key: 356, name: 'PRODUCTION REPORT VIEW', code: 1355 },] },
  'Trial-Balance': { 'MAIN OPERATIONS': [{ key: 357, name: 'TRIAL BALANCE REPORT VIEW', code: 1356 },] },
  'Group-Wise-Trial-Balance': { 'MAIN OPERATIONS': [{ key: 358, name: 'GROUP WISE TRIAL BALANCE REPORT VIEW', code: 1357 },] },
  'Balance-Sheet': { 'MAIN OPERATIONS': [{ key: 359, name: 'BALANCE SHEET REPORT VIEW', code: 1358 }, { key: 360, name: 'GROUP BALANCE SHEET REPORT VIEW', code: 1359 }, { key: 361, name: 'DETAILED BALANCE SHEET REPORT VIEW', code: 1360 },] },
  'Traid-Profit-And-Loss': { 'MAIN OPERATIONS': [{ key: 362, name: 'TRAID PROFIT AND LOSS REPORT VIEW', code: 1361 },] },
  'Chart-Of-Account': { 'MAIN OPERATIONS': [{ key: 363, name: 'CHART OF ACCOUNT REPORT VIEW', code: 1362 },] },
  'Cheque-Register-Report': {
    'MAIN OPERATIONS':
      [
        { key: 351, name: 'CHEQUE REGISTER VIEW', code: 1350 },
        { key: 352, name: 'CHEQUE REGISTER EDIT', code: 1351 },
      ]
  },
}