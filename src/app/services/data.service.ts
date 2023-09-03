import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  roles = ['SA', 'AD', 'ASM', 'MD', 'DS', 'RT', 'CS'];

   saSideMenu: any = [
    {
      userId: null, id: null, icon: 'dashboard.svg', parentName: null, name: 'Dashboard', path: 'dashboard', isview: 0, iswrite: 0, subMenu: []
    },
    {
      userId: null, id: null, icon: 'dashboard.svg', parentName: null, name: 'User', path: '', isview: 0, iswrite: 0, subMenu: [
        {
          userId: null, id: null, icon: 'dashboard.svg', parentName: 'User', name: 'Users Role', path: 'user-type', isview: 0, iswrite: 0, subMenu: []
        },
        {
          userId: null, id: null, icon: 'dashboard.svg', parentName: 'User', name: 'Users Registration', path: 'kyclist', isview: 0, iswrite: 0, subMenu: []
        },
        {
          userId: null, id: null, icon: 'dashboard.svg', parentName: 'User', name: 'Users List', path: 'user-list', isview: 0, iswrite: 0, subMenu: []
        },       
        {
            userId: null, id: null, icon: 'dashboard.svg', parentName: 'User', name: 'Notification', path: 'notification', isview: 0, iswrite: 0, subMenu: []
        }
      ]
    },
    {
        userId: null, id: null, icon: 'dashboard.svg', parentName: null, name: 'System Setting', path: 'user-setting/api-right', isview: 0, iswrite: 0, subMenu: []
    },
    {
      userId: null, id: null, icon: 'dashboard.svg', parentName: null, name: 'Setting', path: '', isview: 0, iswrite: 0, subMenu: [
        {
            userId: null, id: null, icon: 'dashboard.svg', parentName: 'Setting', name: 'Product', path: 'service-list', isview: 0, iswrite: 0, subMenu: []
        },
        {
          userId: null, id: null, icon: 'dashboard.svg', parentName: 'Setting', name: 'Product List', path: 'product-list', isview: 0, iswrite: 0, subMenu: []
        },
        {
          userId: null, id: null, icon: 'dashboard.svg', parentName: 'Setting', name: 'Template List', path: 'template-master', isview: 0, iswrite: 0, subMenu: []
        },
        {
          userId: null, id: null, icon: 'dashboard.svg', parentName: 'Setting', name: 'Bank List', path: 'bank-list', isview: 0, iswrite: 0, subMenu: []
        },
        {
            userId: null, id: null, icon: 'dashboard.svg', parentName: 'Setting', name: 'Operators', path: 'providers', isview: 0, iswrite: 0, subMenu: []
        },
        {
          userId: null, id: null, icon: 'dashboard.svg', parentName: 'Setting', name: 'Money Request Bank', path: 'cashing-bank', isview: 0, iswrite: 0, subMenu: []
        },
        {
            userId: null, id: null, icon: 'dashboard.svg', parentName: 'Setting', name: 'Payment Gateway', path: 'pg-list', isview: 0, iswrite: 0, subMenu: []
        },      
        {
            userId: null, id: null, icon: 'dashboard.svg', parentName: 'Setting', name: 'CDM List', path: 'cdm-list', isview: 0, iswrite: 0, subMenu: []
        }       
      ]
    },
    {
      userId: null, id: null, icon: 'dashboard.svg', parentName: null, name: 'General Reports', path: '', isview: 0, iswrite: 0, subMenu: [
        {
          userId: null, id: null, icon: 'dashboard.svg', parentName: 'General Reports', name: 'DMT Transaction', path: 'reports/statement', isview: 0, iswrite: 0, subMenu: []
        },       
        {
            userId: null, id: null, icon: 'dashboard.svg', parentName: 'General Reports', name: 'Recharge / Utility', path: 'reports/rechargeutility', isview: 0, iswrite: 0, subMenu: []
        },
        {
            userId: null, id: null, icon: 'dashboard.svg', parentName: 'General Reports', name: 'Money Request', path: 'reports/moneyrequest', isview: 0, iswrite: 0, subMenu: []
        },
        {
            userId: null, id: null, icon: 'dashboard.svg', parentName: 'General Reports', name: 'Manage Fund Transaction', path: 'reports/managefund', isview: 0, iswrite: 0, subMenu: []
        },
        {
            userId: null, id: null, icon: 'dashboard.svg', parentName: 'General Reports', name: 'AePs Transaction', path: 'reports/aepstransaction', isview: 0, iswrite: 0, subMenu: []
        },
        {
            userId: null, id: null, icon: 'dashboard.svg', parentName: 'General Reports', name: 'Commision', path: 'reports/commision', isview: 0, iswrite: 0, subMenu: []
        },
        {
            userId: null, id: null, icon: 'dashboard.svg', parentName: 'General Reports', name: 'Account Statement', path: 'reports/outlet-statement', isview: 0, iswrite: 1, subMenu: []
        }
        // {
        //   userId: null, id: null, icon: 'dashboard.svg', parentName: 'General Reports', name: 'Account Statement', path: 'reports/account-statement', isview: 0, iswrite: 0, subMenu: []
        // },        
        // {
        //     userId: null, id: null, icon: 'dashboard.svg', parentName: 'General Reports', name: 'Virtual Account', path: 'reports/vpa-statement', isview: 0, iswrite: 1, subMenu: []
        // },
        // {
        //     userId: null, id: null, icon: 'dashboard.svg', parentName: 'General Reports', name: 'Cashing Reversed', path: 'reports/fund-reverse', isview: 0, iswrite: 1, subMenu: []
        // },
      ]
    },
    {
      userId: null, id: null, icon: 'dashboard.svg', parentName: null, name: 'Retailer Report', path: '', isview: 0, iswrite: 0, subMenu: [
        {
          userId: null, id: null, icon: 'dashboard.svg', parentName: 'Retailer Report', name: 'Transaction', path: 'retailer-report/transaction', isview: 0, iswrite: 0, subMenu: []
        },
        {
          userId: null, id: null, icon: 'dashboard.svg', parentName: 'Retailer Report', name: 'Account Statement', path: 'retailer-report/account-statement', isview: 0, iswrite: 0, subMenu: []
        },
      ]
    },
    {
      userId: null, id: null, icon: 'dashboard.svg', parentName: null, name: 'Money Request', path: 'cashing-request', isview: 0, iswrite: 0, subMenu: []
    },
    {
    userId: null, id: null, icon: 'dashboard.svg', parentName: null, name: 'Manage Fund', path: '', isview: 0, iswrite: 0, subMenu: [
          {
            userId: null, id: null, icon: 'dashboard.svg', parentName: 'Manage Fund', name: 'Credit Money', path: 'credit-money', isview: 0, iswrite: 0, subMenu: []
          },
          {
            userId: null, id: null, icon: 'dashboard.svg', parentName: 'Manage Fund', name: 'Withdraw Money', path: 'credit-money/withdrawal', isview: 0, iswrite: 0, subMenu: []
          },
        ]
      },   
    {
      userId: null, id: null, icon: 'dashboard.svg', parentName: null, name: 'Off Line Bills', path: 'off-line-bill', isview: 0, iswrite: 0, subMenu: []
    },
    {
      userId: null, id: null, icon: 'dashboard.svg', parentName: null, name: 'Refund Pending', path: 'retailer-statement/refund-pending', isview: 0, iswrite: 0, subMenu: []
    },
    {
      userId: null, id: null, icon: 'dashboard.svg', parentName: null, name: 'AEPS Transaction', path: 'retailer-statement/aeps-transaction', isview: 0, iswrite: 0, subMenu: []
    },
    {
      userId: null, id: null, icon: 'dashboard.svg', parentName: null, name: 'AEPS Beneficiary List', path: 'retailer-statement/aeps-beneficiary', isview: 0, iswrite: 0, subMenu: []
    }
    // {
    //     userId: null, id: null, icon: 'dashboard.svg', parentName: null, name: 'Account whitelist', path: 'bank-manager/acc-whitelisted', isview: 0, iswrite: 0, subMenu: []
    // }
  ];

  waterList = [
    { code: 'AMCW', name: 'AHMEDABAD MUNICIPAL CORPORATION', category: "WATER" },
    { code: 'BWSS', name: 'BANGALORE WATER SUPPLY AND SEWERAGE BOARD',category: "WATER" },
    { code: 'BMCW', name: 'BHOPAL MUNICIPAL CORPORATION WATER',category: "WATER" },
    { code: 'DDAW', name: 'DELHI DEVELOPMENT AUTHORITY (DDA) WATER' },
    { code: 'DJBW', name: 'DELHI JAL BOARD' ,category: "WATER"},
    { code: 'DPHE', name: 'DEPARTMENT OF PUBLIC HEALTH ENGINEERING-WATER,MIZORAM',category: "WATER" },
    { code: 'GWMC', name: 'GREATER WARANGAL MUNICIPAL CORPORATION WATER',category: "WATER" },
    { code: 'GMCW', name: 'GWALIOR MUNICIPAL CORPORATION WATER' ,category: "WATER"},
    { code: 'HMWS', name: 'HYDERABAD METROPOLITAN WATER SUPPLY AND SEWERAGEBOARD',category: "WATER" },
    { code: 'IMCW', name: 'INDORE MUNICIPAL CORPORATION WATER',category: "WATER" },
    { code: 'JMCW', name: 'JABALPUR MUNICIPAL CORPORATION WATER' ,category: "WATER"},
    { code: 'MCJW', name: 'MUNICIPAL CORPORATION JALANDHAR' ,category: "WATER"},
    { code: 'MCLW', name: 'MUNICIPAL CORPORATION LUDHIANA WATER' ,category: "WATER"},
    { code: 'MCAW', name: 'MUNICIPAL CORPORATION OF AMRITSAR',category: "WATER" },
    { code: 'MCGW', name: 'MUNICIPAL CORPORATION OF GURUGRAM' ,category: "WATER"},
    { code: 'MCCW', name: 'MYSURU CITY CORPORATION',category: "WATER" },
    { code: 'NDMC', name: 'NEW DELHI MUNICIPAL COUNCIL (NDMC) WATER',category: "WATER" },
    { code: 'PCMC', name: 'PIMPRI CHINCHWAD MUNICIPAL CORPORATION(PCMC)',category: "WATER" },
    { code: 'PMCW', name: 'PUNE MUNICIPAL CORPORATION WATER',category: "WATER" },
    { code: 'RMCW', name: 'RANCHI MUNICIPAL CORPORATION',category: "WATER" },
    { code: 'SMCW', name: 'SILVASSA MUNICIPAL COUNCIL',category: "WATER" },
    { code: 'SGMC', name: 'SURAT MUNICIPAL CORPORATION WATER',category: "WATER" },
    { code: 'UNNW', name: 'UJJAIN NAGAR NIGAM - PHED' ,category: "WATER"},
    { code: 'UIBW', name: 'URBAN IMPROVEMENT TRUST (UIT) BHIWADI',category: "WATER" },
    { code: 'UIBO', name: 'URBAN IMPROVEMENT TRUST (UIT) BHIWADI OLD',category: "WATER" },
    { code: 'UJSW', name: 'UTTARAKHAND JAL SANSTHAN' ,category: "WATER"},
    { code: 'PHED', name: 'RAJASTHAN WATER BILLPREPAID VALIDITY',category: "WATER" }
  ];
  fintechwaterList = [
    {
      "code": "142",
      "name": "UIT BHIWADI",
      "category": "WATER"
  },
  {
      "code": "143",
      "name": "UTTARAKHAND JAL SANSTHAN(B2B)-RETAIL",
      "category": "WATER"
  },
  {
      "code": "144",
      "name": "UTTARAKHAND JAL SANSTHAN(B2C)-ONLINE",
      "category": "WATER"
  },
  {
      "code": "145",
      "name": "DELHI JAL BOARD",
      "category": "WATER"
  },
  {
      "code": "146",
      "name": "MUNICIPAL CORPORATION OF GURUGRAM",
      "category": "WATER"
   }
  ];
  mobikwikhwaterList = [
          {
              "code": "70",
              "name": "BANGALORE WATER SUPPLY AND SEWERAGE BOARD",
              "category": "WATERSUPPLIER"
          },
          {
              "code": "149",
              "name": "UTTARAKHAND JAL SANSTHAN",
              "category": "WATERSUPPLIER"
          },
          {
              "code": "157",
              "name": "PUNE MUNICIPAL CORPORATION WATER",
              "category": "WATERSUPPLIER"
          },
          {
              "code": "178",
              "name": "URBAN IMPROVEMENT TRUST (UIT) - BHIWADI",
              "category": "WATERSUPPLIER"
          },
          {
              "code": "185",
              "name": "MUNICIPAL CORPORATION OF GURUGRAM",
              "category": "WATERSUPPLIER"
          },
          {
              "code": "211",
              "name": "HYDERABAD METROPOLITAN WATER SUPPLY AND SEWERAGE BOARD",
              "category": "WATERSUPPLIER"
          },
          {
              "code": "218",
              "name": "NEW DELHI MUNICIPAL COUNCIL (NDMC) - WATER",
              "category": "WATERSUPPLIER"
          },
          {
              "code": "220",
              "name": "MUNICIPAL CORPORATION JALANDHAR",
              "category": "WATERSUPPLIER"
          },
          {
              "code": "222",
              "name": "MUNICIPAL CORPORATION LUDHIANA – WATER",
              "category": "WATERSUPPLIER"
          },
          {
              "code": "227",
              "name": "BHOPAL MUNICIPAL CORPORATION",
              "category": "WATERSUPPLIER"
          },
          {
              "code": "228",
              "name": "INDORE MUNICIPAL CORPORATION",
              "category": "WATERSUPPLIER"
          },
          {
              "code": "229",
              "name": "GWALIOR MUNICIPAL CORPORATION",
              "category": "WATERSUPPLIER"
          },
          {
              "code": "230",
              "name": "JABALPUR MUNICIPAL CORPORATION",
              "category": "WATERSUPPLIER"
          },
          {
              "code": "232",
              "name": "SURAT MUNICIPAL CORPORATION",
              "category": "WATERSUPPLIER"
          },
          {
              "code": "236",
              "name": "UJJAIN NAGAR NIGAM – PHED",
              "category": "WATERSUPPLIER"
          },
          {
              "code": "241",
              "name": "GREATER WARANGAL MUNICIPAL CORPORATION – WATER",
              "category": "WATERSUPPLIER"
          },
          {
              "code": "256",
              "name": "RANCHI MUNICIPAL CORPORATION",
              "category": "WATERSUPPLIER"
          },
          {
              "code": "257",
              "name": "SILVASSA MUNICIPAL COUNCIL",
              "category": "WATERSUPPLIER"
          },
          {
              "code": "262",
              "name": "DELHI JAL BOARD (BBPS)",
              "category": "WATERSUPPLIER"
          },
          {
              "code": "264",
              "name": "HARYANA URBAN DEVELOPMENT AUTHORITY",
              "category": "WATERSUPPLIER"
          },
          {
              "code": "268",
              "name": "MYSURU CITI CORPORATION",
              "category": "WATERSUPPLIER"
          },
          {
              "code": "270",
              "name": "PUNJAB MUNICIPAL CORPORATIONS/COUNCILS",
              "category": "WATERSUPPLIER"
          },
          {
              "code": "273",
              "name": "DELHI DEVELOPMENT AUTHORITY (DDA) - WATER",
              "category": "WATERSUPPLIER"
          },
          {
              "code": "276",
              "name": "DEPARTMENT OF PUBLIC HEALTH ENGINEERING-WATER, MIZORAM",
              "category": "WATERSUPPLIER"
          },
          {
              "code": "279",
              "name": "MUNICIPAL CORPORATION OF AMRITSAR",
              "category": "WATERSUPPLIER"
          },
          {
              "code": "298",
              "name": "KERALA WATER AUTHORITY (KWA)",
              "category": "WATERSUPPLIER"
          },
          {
              "code": "330",
              "name": "MUNICIPAL CORPORATION CHANDIGARH",
              "category": "WATERSUPPLIER"
          },
          {
              "code": "370",
              "name": "MADHYA PRADESH URBAN ADMINISTRATION AND DEVELOPMENT - WATER",
              "category": "WATERSUPPLIER"
          },
          {
              "code": "373",
              "name": "AHMEDABAD MUNICIPAL CORPORATION",
              "category": "WATERSUPPLIER"
          },
          {
              "code": "396",
              "name": "KALYAN DOMBIVALI MUNICIPAL CORPORATION - WATER",
              "category": "WATER"
          },
          {
              "code": "437",
              "name": "JALKAL VIBHAG NAGAR NIGAM PRAYAGRAJ",
              "category": "WATER"
          },
          {
              "code": "509",
              "name": "NAGAR NIGAM ALIGARH- WATER",
              "category": "WATER"
          },
          {
              "code": "514",
              "name": "PUBLIC HEALTH ENGINEERING DEPARTMENT, HARYANA",
              "category": "WATER"
          },
          {
              "code": "540",
              "name": "VATVA INDUSTRIAL ESTATE INFRASTRUCTURE DEVELOPMENT LTD",
              "category": "WATER"
          },
          {
              "code": "564",
              "name": "PORT BLAIR MUNICIPAL COUNCIL - WATER",
              "category": "WATER"
          },
          {
              "code": "565",
              "name": "VASAI VIRAR MUNICIPAL CORPORATION - WATER",
              "category": "WATER"
          },
          {
              "code": "578",
              "name": "SHIVAMOGGA CITY CORPORATION - WATER TAX",
              "category": "WATER"
          },
          {
              "code": "580",
              "name": "JAMMU KASHMIR WATER BILLING-JKPHE KASHMIR",
              "category": "WATER"
          },
          {
              "code": "581",
              "name": "JAMMU KASHMIR WATER BILLING-JKPHE JAMMU",
              "category": "WATER"
          },
          {
              "code": "644",
              "name": "MCGM WATER DEPARTMENT",
              "category": "WATERBILLER"
          }
      
  ];
  gasList = [
    { code: 'ADGL', name: 'ADANI GAS', category: "GAS" },
    { code: 'AVGL', name: 'AVANTIKA GAS', category: "GAS" },
    { code: 'CUGL', name: 'CENTERL UP GAS', category: "GAS" },
    { code: 'CHGL', name: 'CHAROTER GAS', category: "GAS" },
    { code: 'GJGL', name: 'GUJARAT GAS', category: "GAS" },
    { code: 'HCGL', name: 'HARYANA CITY  GAS', category: "GAS" },
    { code: 'IOGL', name: 'INDIAN OIL GAS', category: "GAS" },
    { code: 'IPGL', name: 'INDRAPRASHTHA GAS', category: "GAS" },
    { code: 'MHGL', name: 'MAHANAGAR GAS' , category: "GAS"},
    { code: 'MNGL', name: 'MAHARASTRA NATURAL GAS', category: "GAS" },
    { code: 'SBGL', name: 'SABARMATI GAS UP' , category: "GAS"},
    { code: 'SIGL', name: 'SITI GAS UP' , category: "GAS"},
    { code: 'TNGL', name: 'TRIPURA NATURAL GAS', category: "GAS" },
    { code: 'UCPG', name: 'UNIQUE CENTRAL PIPED GAS', category: "GAS" },
    { code: 'VDGL', name: 'VADODARA GAS', category: "GAS" }
  ];
  lpggasList = [
    {
      code: "INDG",
      name: "INDANE GAS (INDIAN OIL)",
      category: "GAS"
  },
  {
      code: "HPGA",
      name: "HINDUSTAN PETROLEUM CORPORATION LTD (HPCL)",
      category: "GAS"
  },
  {
      code: "BHGA",
      name: "BHARAT PETROLEUM CORPORATION LIMITED (BPCL)",
      category: "GAS"
   }
  ];
  fintechgasList= [
        {
            "code": "85",
            "name": "MAHANAGAR GAS LIMITED",
            "category": "GAS"
        },
        {
            "code": "132",
            "name": "HARYANA CITY GAS",
            "category": "GAS"
        },
        {
            "code": "133",
            "name": "SITI ENERGY",
            "category": "GAS"
        },
        {
            "code": "134",
            "name": "TRIPURA NATURAL GAS COMPANY LTD",
            "category": "GAS"
        },
        {
            "code": "150",
            "name": "ADANI GAS",
            "category": "GAS"
        },
        {
            "code": "154",
            "name": "TORRENT GAS MORADABAD LIMITED FORMERLY SITI  ENERGY LIMITED",
            "category": "GAS"
        }
  ];
  mobikwikhgasList= [
          {
              "code": "38",
              "name": "MAHANAGAR GAS LIMITED",
              "category": "GAS"
          },
          {
              "code": "65",
              "name": "INDRAPRASTHA GAS",
              "category": "GAS"
          },
          {
              "code": "66",
              "name": "GUJARAT GAS COMPANY LIMITED",
              "category": "GAS"
          },
          {
              "code": "126",
              "name": "ADANI GAS",
              "category": "GAS"
          },
          {
              "code": "148",
              "name": "TORRENT GAS MORADABAD LIMITED FORMERLY SITI ENERGY LIMITED",
              "category": "GAS"
          },
          {
              "code": "166",
              "name": "HARYANA CITY GAS",
              "category": "GAS"
          },
          {
              "code": "173",
              "name": "SABARMATI GAS LIMITED (SGL)",
              "category": "GAS"
          },
          {
              "code": "176",
              "name": "TRIPURA NATURAL GAS",
              "category": "GAS"
          },
          {
              "code": "195",
              "name": "UNIQUE CENTRAL PIPED GASES PVT LTD (UCPGPL)",
              "category": "GAS"
          },
          {
              "code": "196",
              "name": "VADODARA GAS LIMITED",
              "category": "GAS"
          },
          {
              "code": "202",
              "name": "MAHARASHTRA NATURAL GAS LIMITED",
              "category": "GAS"
          },
          {
              "code": "212",
              "name": "CHAROTAR GAS SAHAKARI MANDALI LTD",
              "category": "GAS"
          },
          {
              "code": "221",
              "name": "AAVANTIKA GAS LTD",
              "category": "GAS"
          },
          {
              "code": "226",
              "name": "CENTRAL U.P. GAS LIMITED",
              "category": "GAS"
          },
          {
              "code": "231",
              "name": "INDIAN OIL-ADANI GAS PRIVATE LIMITED",
              "category": "GAS"
          },
          {
              "code": "242",
              "name": "GAIL GAS LIMITED",
              "category": "GAS"
          },
          {
              "code": "244",
              "name": "IRM ENERGY PRIVATE LIMITED",
              "category": "GAS"
          },
          {
              "code": "266",
              "name": "GREEN GAS LIMITED(GGL)",
              "category": "GAS"
          },
          {
              "code": "287",
              "name": "ASSAM GAS COMPANY LIMITED",
              "category": "GAS"
          },
          {
              "code": "296",
              "name": "BHAGYANAGAR GAS LIMITED",
              "category": "GAS"
          },
          {
              "code": "316",
              "name": "SANWARIYA GAS LIMITED",
              "category": "GAS"
          },
          {
              "code": "450",
              "name": "MEGHA GAS",
              "category": "GAS"
          },
          {
              "code": "469",
              "name": "GAIL INDIA",
              "category": "GAS"
          },
          {
              "code": "382",
              "name": "NAVERIYA GAS PVT LTD",
              "category": "GAS"
          }
  ];
  insuranceList = [
    {
      code: "ABSL",
      name: "ADITYA BIRLA SUN LIFE INSURANCE",
      category: "INS"
  },
  {
      code: "AVVL",
      name: "AVIVA LIFE",
      category: "INS"
  },
  {
      code: "BALI",
      name: "BAJAJ ALLIANZ LIFE INSURANCE",
      category: "INS"
  },
  {
      code: "BAXI",
      name: "BHARTI AXA LIFE INSURANCE",
      category: "INS"
  },
  {
      code: "CHOL",
      name: "CANARA HSBC OBC LIFE INSURANCE",
      category: "INS"
  },
  {
      code: "ETLI",
      name: "EDELWEISS TOKIO LIFE INSURANCE",
      category: "INS"
  },
  {
      code: "EXLI",
      name: "EXIDE LIFE INSURANCE",
      category: "INS"
  },
  {
      code: "HDLI",
      name: "HDFC LIFE INSURANCE",
      category: "INS"
  },
  {
      code: "ICPLI",
      name: "ICICI PRUDENTIAL LIFE INSURANCE",
      category: "INS"
  },
  {
      code: "FGLI",
      name: "FUTURE GENERALI INDIA LIFE INSURANCE LTD",
      category: "INS"
  },
  {
      code: "IDFI",
      name: "IDBI FEDERAL LIFE INSURANCE",
      category: "INS"
  },
  {
      code: "IFLI",
      name: "INDIAFIRST LIFE INSURANCE",
      category: "INS"
  },
  {
      code: "MALI",
      name: "MAX LIFE INSURANCE",
      category: "INS"
  },
  {
      code: "PNMI",
      name: "PNB METLIFE INSURANCE",
      category: "INS"
  },
  {
      code: "PRLI",
      name: "PRAMERICA LIFE INSURANCE",
      category: "INS"
  },
  {
      code: "RNLI",
      name: "RELIANCE NIPPON LIFE INSURANCE",
      category: "INS"
  },
  {
      code: "SBLI",
      name: "SBI LIFE INSURANCE",
      category: "INS"
  },
  {
      code: "SHLI",
      name: "SHRIRAM LIFE INSURANCE CO LTD",
      category: "INS"
  },
  {
      code: "SULI",
      name: "STAR UNION DAI ICHI LIFE INSURANCE",
      category: "INS"
  },
  {
      code: "TALI",
      name: "TATA AIA LIFE INSURANCE",
      category: "INS"
  }
  ];
  mobikwikhinsuranceList =[
        {
            "code": "37",
            "name": "ICICI PRUDENTIAL LIFE INSURANCE",
            "category": "INSURANCE"
        },
        {
            "code": "42",
            "name": "TATA AIA LIFE INSURANCE",
            "category": "INSURANCE"
        },
        {
            "code": "248",
            "name": "EXIDE LIFE INSURANCE",
            "category": "INSURANCE"
        },
        {
            "code": "285",
            "name": "HDFC LIFE INSURANCE CO. LTD.",
            "category": "INSURANCE"
        },
        {
            "code": "315",
            "name": "PRAMERICA LIFE INSURANCE LIMITED",
            "category": "INSURANCE"
        },
        {
            "code": "319",
            "name": "FUTURE GENERALI INDIA LIFE INSURANCE COMPANY LIMITED",
            "category": "INSURANCE"
        },
        {
            "code": "328",
            "name": "RELIANCE NIPPON LIFE INSURANCE",
            "category": "INSURANCE"
        },
        {
            "code": "362",
            "name": "VASTU HOUSING FINANCE CORPORATION LIMITED",
            "category": "INSURANCE"
        },
        {
            "code": "363",
            "name": "STAR UNION DAI ICHI LIFE INSURANCE",
            "category": "INSURANCE"
        },
        {
            "code": "394",
            "name": "SHRIRAM LIFE INSURANCE CO LTD",
            "category": "INSURANCE"
        },
        {
            "code": "405",
            "name": "RELIANCE GENERAL INSURANCE COMPANY LIMITED",
            "category": "INSURANCE"
        },
        {
            "code": "417",
            "name": "MAX BUPA HEALTH INSURANCE",
            "category": "INSURANCE"
        },
        {
            "code": "418",
            "name": "SHRIRAM GENERAL INSURANCE",
            "category": "INSURANCE"
        },
        {
            "code": "465",
            "name": "MAGMA HDI - HEALTH INSURANCE",
            "category": "INSURANCE"
        },
        {
            "code": "466",
            "name": "MAGMA HDI - LIFE INSURANCE",
            "category": "INSURANCE"
        },
        {
            "code": "467",
            "name": "MAGMA HDI - MOTOR INSURANCE",
            "category": "INSURANCE"
        },
        {
            "code": "468",
            "name": "ROYAL SUNDARAM GENERAL INSURANCE CO. LIMITED",
            "category": "INSURANCE"
        },
        {
            "code": "492",
            "name": "KOTAK LIFE INSURANCE COMPANY LIMITED",
            "category": "INSURANCE"
        },
        {
            "code": "537",
            "name": "ADITYA BIRLA HEALTH INSURANCE CO LIMITED",
            "category": "INSURANCE"
        },
        {
            "code": "577",
            "name": "ICICI LOMBARD GENERAL INSURANCE (MOTOR)",
            "category": "INSURANCE"
        },
        {
            "code": "47",
            "name": "BIRLA SUN LIFE INSURANCE",
            "category": "INSURANCE"
        },
        {
            "code": "633",
            "name": "GO DIGIT INSURANCE",
            "category": "INSURANCE"
        }
  ];
  dthList = [
    { code: 'Dish-TV', name: 'DISH TV' },
    { code: 'Tata-Sky', name: 'TATA SKY' },
    { code: 'Sun-Direct-TV', name: 'SUN DIRECT TV' },
    { code: 'Videocon-D2H', name: 'VIDEOCON D2H' },
    { code: 'Airtel-DTH', name: 'AIRTEL DEGITAL TV' },
  ];

  fintechlandlineList = [
    {
      "code": "31",
      "name": "MTNL TELEPHONE",
      "category": "TELEPHONE"
  },
  {
      "code": "32",
      "name": "BSNL TELEPHONE",
      "category": "TELEPHONE"
  },
  {
      "code": "33",
      "name": "AIRTEL TELEPHONE",
      "category": "TELEPHONE"
  }
  ];
  fintechBroadbandList = [
  {
      "code": "33",
      "name": "AIRTEL TELEPHONE",
      "category": "TELEPHONE"
  }
  ];
  mobikwikhlandlineList= [
        {
            "code": "28",
            "name": "AIRTEL LANDLINE",
            "category": "LANDLINE"
        },
        {
            "code": "43",
            "name": "TATA TELESERVICES (CDMA)",
            "category": "LANDLINE"
        },
        {
            "code": "56",
            "name": "TIKONA",
            "category": "LANDLINE"
        },
        {
            "code": "131",
            "name": "BSNL LANDLINE - INDIVIDUAL",
            "category": "LANDLINE"
        },
        {
            "code": "133",
            "name": "MTNL MUMBAI",
            "category": "LANDLINE"
        },
        {
            "code": "136",
            "name": "CONNECT BROADBAND",
            "category": "LANDLINE"
        },
        {
            "code": "191",
            "name": "BSNL LANDLINE - CORPORATE",
            "category": "LANDLINE"
        }
  ];
  mobikwikhBroadbandList= [
        {
            "code": "129",
            "name": "ACT BROADBAND",
            "category": "BROADBAND"
        },
        {
            "code": "135",
            "name": "HATHWAY",
            "category": "BROADBAND"
        },
        {
            "code": "137",
            "name": "SPECTRANET BROADBAND",
            "category": "BROADBAND"
        },
        {
            "code": "145",
            "name": "NEXTRA BROADBAND",
            "category": "BROADBAND"
        },
        {
            "code": "213",
            "name": "TTN BROADBAND",
            "category": "BROADBAND"
        },
        {
            "code": "214",
            "name": "AIRTEL BROADBAND",
            "category": "BROADBAND"
        },
        {
            "code": "252",
            "name": "COMWAY BROADBAND",
            "category": "BROADBAND"
        },
        {
            "code": "253",
            "name": "FUSIONNET WEB SERVICES PRIVATE LIMITED",
            "category": "BROADBAND"
        },
        {
            "code": "254",
            "name": "ASIANET BROADBAND (ASIANET)",
            "category": "BROADBAND"
        },
        {
            "code": "278",
            "name": "INSTALINKS",
            "category": "BROADBAND"
        },
        {
            "code": "281",
            "name": "MNET BROADBAND",
            "category": "BROADBAND"
        },
        {
            "code": "283",
            "name": "DEN BROADBAND",
            "category": "BROADBAND"
        },
        {
            "code": "284",
            "name": "TIMBL BROADBAND",
            "category": "BROADBAND"
        },
        {
            "code": "289",
            "name": "VFIBERNET BROADBAND",
            "category": "BROADBAND"
        },
        {
            "code": "290",
            "name": "INSTANET BROADBAND",
            "category": "BROADBAND"
        },
        {
            "code": "305",
            "name": "NETPLUS BROADBAND",
            "category": "BROADBAND"
        },
        {
            "code": "306",
            "name": "RELIGARE HEALTH INSURANCE CO LTD.",
            "category": "BROADBAND"
        },
        {
            "code": "314",
            "name": "FLASH FIBERNET",
            "category": "BROADBAND"
        },
        {
            "code": "395",
            "name": "ION",
            "category": "BROADBAND"
        },
        {
            "code": "451",
            "name": "SWIFTTELE ENTERPRISES PRIVATE LIMITED",
            "category": "BROADBAND"
        },
        {
            "code": "519",
            "name": "ALLIANCE BROADBAND SERVICES PVT. LTD.",
            "category": "BROADBAND"
        },
        {
            "code": "523",
            "name": "AIRJALDI - RURAL BROADBAND",
            "category": "BROADBAND"
        },
        {
            "code": "543",
            "name": "SKYLINK FIBERNET PRIVATE LIMITED",
            "category": "BROADBAND"
        },
        {
            "code": "549",
            "name": "EXCELL BROADBAND",
            "category": "BROADBAND"
        },
        {
            "code": "588",
            "name": "WISH NET PVT LTD",
            "category": "BROADBAND"
        },
        {
            "code": "589",
            "name": "GTPL KCBPL BROADBAND PVT LTD",
            "category": "BROADBAND"
        },
        {
            "code": "629",
            "name": "FICUS TELECOM PVT LTD",
            "category": "BROADBAND"
        }
  ];
  mobikwikhFasttagList= [
        {
            "code": "294-1",
            "name": "INDIAN HIGHWAYS MANAGEMENT COMPANY LTD-INDUSIND FASTAG",
            "category": "FASTAG"
        },
        {
            "code": "294-2",
            "name": "INDUSIND BANK",
            "category": "FASTAG"
        },
        {
            "code": "294-3",
            "name": "BANK OF BARODA",
            "category": "FASTAG"
        },
        {
            "code": "294-4",
            "name": "ICICI BANK",
            "category": "FASTAG"
        },
        {
            "code": "294-5",
            "name": "HDFC BANK",
            "category": "FASTAG"
        },
        {
            "code": "294-6",
            "name": "IDFC FIRST BANK - FASTAG",
            "category": "FASTAG"
        },
        {
            "code": "294-7",
            "name": "AXIS BANK",
            "category": "FASTAG"
        },
        {
            "code": "294-8",
            "name": "KOTAK MAHINDRA BANK",
            "category": "FASTAG"
        },
        {
            "code": "294-9",
            "name": "EQUITAS FASTAG RECHARGE",
            "category": "FASTAG"
        },
        {
            "code": "294-10",
            "name": "PAYTM PAYMENTS BANK FASTAG",
            "category": "FASTAG"
        },
        {
            "code": "294-11",
            "name": "PAUL MERCHANTS",
            "category": "FASTAG"
        },
        {
            "code": "294-12",
            "name": "JAMMU AND KASHMIR BANK FASTAG",
            "category": "FASTAG"
        },
        {
            "code": "294-13",
            "name": "FEDERAL BANK - FASTAG\"",
            "category": "FASTAG"
        },
        {
            "code": "294-14",
            "name": "IDBI BANK FASTAG",
            "category": "FASTAG"
        },
        {
            "code": "294-15",
            "name": "UCO BANK FASTAG",
            "category": "FASTAG"
        },
        {
            "code": "294-16",
            "name": "TRANSACTION ANALYST FASTAG",
            "category": "FASTAG"
        },
        {
            "code": "294-17",
            "name": "IOB FASTAG",
            "category": "FASTAG"
        }
    ];
  stateList = [
    { id: 1, name: 'Andhra Pradesh' },
    { id: 2, name: 'Assam' },
    { id: 3, name: 'Bihar Jharkhand' },
    { id: 4, name: 'Chennai' },
    { id: 5, name: 'Delhi' },
    { id: 6, name: 'Gujarat' },
    { id: 7, name: 'Haryana' },
    { id: 8, name: 'Himachal Pradesh' },
    { id: 9, name: 'Jammu Kashmir' },
    { id: 10, name: 'Karnataka' },
    { id: 11, name: 'Kerala' },
    { id: 12, name: 'Kolkata' },
    { id: 13, name: 'Madhya Pradesh' },
    { id: 14, name: 'Chhattisgarh' },
    { id: 15, name: 'Maharashtra' },
    { id: 16, name: 'Mumbai' },
    { id: 17, name: 'North East' },
    { id: 18, name: 'Orissa' },
    { id: 19, name: 'Punjab' },
    { id: 20, name: 'Rajasthan' },
    { id: 21, name: 'Tamil Nadu' },
    { id: 22, name: 'UP East' },
    { id: 23, name: 'UP West' },
    { id: 24, name: 'West Bengal' }
  ];

  cityList = [
    { name: 'Agra', icon: 'dashboard.svg' }, { name: 'Ahmedabad', icon: 'dashboard.svg' }, { name: 'Ajmer', icon: 'dashboard.svg' }, { name: 'Alwar', icon: 'dashboard.svg' }, { name: 'Amritsar', icon: 'dashboard.svg' }, { name: 'Anand', icon: 'dashboard.svg' }, { name: 'Aurangabad', icon: 'dashboard.svg' }, { name: 'Baddi', icon: 'dashboard.svg' }, { name: 'Bahadurgarh', icon: 'dashboard.svg' }, { name: 'Bahraich', icon: 'dashboard.svg' }, { name: 'Bathinda', icon: 'dashboard.svg' }, { name: 'Bengaluru', icon: 'dashboard.svg' }, { name: 'Bhilwara', icon: 'dashboard.svg' }, { name: 'Bhiwadi', icon: 'dashboard.svg' }, { name: 'Bhopal', icon: 'dashboard.svg' }, { name: 'Bhubaneswar', icon: 'dashboard.svg' }, { name: 'Bikaner', icon: 'dashboard.svg' }, { name: 'Bulanshahr', icon: 'dashboard.svg' }, { name: 'Chandigarh', icon: 'dashboard.svg' }, { name: 'Chennai', icon: 'dashboard.svg' }, { name: 'Coimbatore', icon: 'dashboard.svg' }, { name: 'Dehradun', icon: 'dashboard.svg' }, { name: 'Dera Bassi', icon: 'dashboard.svg' }, { name: 'Dharampur', icon: 'dashboard.svg' }, { name: 'Dharuhera', icon: 'dashboard.svg' }, { name: 'Faridabad', icon: 'dashboard.svg' }, { name: 'Gandhi Nagar', icon: 'dashboard.svg' }, { name: 'Gautam Buddha Nagar', icon: 'dashboard.svg' }, { name: 'Ghaziabad', icon: 'dashboard.svg' }, { name: 'Goa', icon: 'dashboard.svg' }, { name: 'Gorakhpur', icon: 'dashboard.svg' }, { name: 'Greater Noida', icon: 'dashboard.svg' }, { name: 'Gurugram', icon: 'dashboard.svg' }, { name: 'Gwalior', icon: 'dashboard.svg' }, { name: 'Halol', icon: 'dashboard.svg' }, { name: 'Haridwar', icon: 'dashboard.svg' }, { name: 'Hisar', icon: 'dashboard.svg' }, { name: 'Hyderabad', icon: 'dashboard.svg' }, { name: 'Indore', icon: 'dashboard.svg' }, { name: 'Jaipur', icon: 'dashboard.svg' }, { name: 'Jalandhar', icon: 'dashboard.svg' }, { name: 'Jammu', icon: 'dashboard.svg' }, { name: 'Jamshedpur', icon: 'dashboard.svg' }, { name: 'Jhansi', icon: 'dashboard.svg' }, { name: 'Jhunjhunu', icon: 'dashboard.svg' }, { name: 'Jodhpur', icon: 'dashboard.svg' }, { name: 'Kalol', icon: 'dashboard.svg' }, { name: 'Kalyan', icon: 'dashboard.svg' }, { name: 'Kanpur', icon: 'dashboard.svg' }, { name: 'Karjat', icon: 'dashboard.svg' }, { name: 'Karnal', icon: 'dashboard.svg' }, { name: 'Kochi', icon: 'dashboard.svg' }, { name: 'Kolkata', icon: 'dashboard.svg' }, { name: 'Kota', icon: 'dashboard.svg' }, { name: 'Kurukshetra', icon: 'dashboard.svg' }, { name: 'Lavasa', icon: 'dashboard.svg' }, { name: 'Lucknow', icon: 'dashboard.svg' }, { name: 'Ludhiana', icon: 'dashboard.svg' }, { name: 'Mangalagiri', icon: 'dashboard.svg' }, { name: 'Mathura', icon: 'dashboard.svg' }, { name: 'Meerut', icon: 'dashboard.svg' }, { name: 'Mohali', icon: 'dashboard.svg' }, { name: 'Moradabad', icon: 'dashboard.svg' }, { name: 'Mumbai', icon: 'dashboard.svg' }, { name: 'Muzzaffarnagar', icon: 'dashboard.svg' }, { name: 'Mysore', icon: 'dashboard.svg' }, { name: 'Nagpur', icon: 'dashboard.svg' }, { name: 'Nashik', icon: 'dashboard.svg' }, { name: 'Navi Mumbai', icon: 'dashboard.svg' }, { name: 'Neemrana', icon: 'dashboard.svg' }, { name: 'New Delhi', icon: 'dashboard.svg' }, { name: 'Noida', icon: 'dashboard.svg' }, { name: 'Palghar', icon: 'dashboard.svg' }, { name: 'Palwal', icon: 'dashboard.svg' }, { name: 'Panchkula', icon: 'dashboard.svg' }, { name: 'Panipat', icon: 'dashboard.svg' }, { name: 'Pathankot', icon: 'dashboard.svg' }, { name: 'Patiala', icon: 'dashboard.svg' }, { name: 'Patna', icon: 'dashboard.svg' }, { name: 'Puducherry', icon: 'dashboard.svg' }, { name: 'Pune', icon: 'dashboard.svg' }, { name: 'Raigarh', icon: 'dashboard.svg' }, { name: 'Ranchi', icon: 'dashboard.svg' }, { name: 'Rewari', icon: 'dashboard.svg' }, { name: 'Rishikesh', icon: 'dashboard.svg' }, { name: 'Rohtak', icon: 'dashboard.svg' }, { name: 'Roorkee', icon: 'dashboard.svg' }, { name: 'Rudrapur', icon: 'dashboard.svg' }, { name: 'Secunderabad', icon: 'dashboard.svg' }, { name: 'Silvassa', icon: 'dashboard.svg' }, { name: 'Sirsa', icon: 'dashboard.svg' }, { name: 'Sonipat', icon: 'dashboard.svg' }, { name: 'Surat', icon: 'dashboard.svg' }, { name: 'Talegaon', icon: 'dashboard.svg' }, { name: 'Thane', icon: 'dashboard.svg' }, { name: 'Thiruvananthapuram', icon: 'dashboard.svg' }, { name: 'Thrissur', icon: 'dashboard.svg' }, { name: 'Trivandrum', icon: 'dashboard.svg' }, { name: 'Udaipur', icon: 'dashboard.svg' }, { name: 'Ujjain', icon: 'dashboard.svg' }, { name: 'Vadodara', icon: 'dashboard.svg' }, { name: 'Vapi', icon: 'dashboard.svg' }, { name: 'Varanasi', icon: 'dashboard.svg' }, { name: 'Vasai', icon: 'dashboard.svg' }, { name: 'Vijaywada', icon: 'dashboard.svg' }, { name: 'Visakhapatnam', icon: 'dashboard.svg' }, { name: 'Vishakapatnam', icon: 'dashboard.svg' }, { name: 'Vrindavan', icon: 'dashboard.svg' }, { name: 'Yamunanagar', icon: 'dashboard.svg' }, { name: 'Zirakpur', icon: 'dashboard.svg' }
  ];

  operatorList = [
    {
      code: '1',
      name: 'AIRTEL',
      category: 'MOBILE'
    },
    {
      code: '2',
      name: 'VODAFONE',
      category: 'MOBILE'
    },
    {
      code: '3',
      name: 'IDEA',
      category: 'MOBILE'
    },
    {
      code: '4',
      name: 'TATA INDICOM',
      category: 'MOBILE'
    },
    {
      code: '5',
      name: 'DOCOMO',
      category: 'MOBILE'
    },
    {
      code: '6',
      name: 'TELENOR',
      category: 'MOBILE'
    },
    {
      code: '7',
      name: 'MTNL',
      category: 'MOBILE'
    },
    {
      code: '8',
      name: 'BSNL',
      category: 'MOBILE'
    },
    {
      code: '9',
      name: 'AIRCEL',
      category: 'MOBILE'
    },
    {
      code: '10',
      name: 'VIDEOCON',
      category: 'MOBILE'
    },
    {
      code: '11',
      name: 'MTS',
      category: 'MOBILE'
    },
    {
      code: '12',
      name: 'DISH TV',
      category: 'DTH'
    },
    {
      code: '13',
      name: 'TATA SKY',
      category: 'DTH'
    },
    {
      code: '14',
      name: 'SUN TV',
      category: 'DTH'
    },
    {
      code: '15',
      name: 'VIDEOCON STV',
      category: 'DTH'
    },
    {
      code: '16',
      name: 'RELIANCE BIG TV',
      category: 'DTH'
    },
    {
      code: '17',
      name: 'AIRTEL DEGITAL TV',
      category: 'DTH'
    },
    {
      code: '18',
      name: 'MTS MBLAZE',
      category: 'DATACARD'
    },
    {
      code: '19',
      name: 'MTS MBROWSE',
      category: 'DATACARD'
    },
    {
      code: '20',
      name: 'RELIANCE NETCONNECT',
      category: 'DATACARD'
    },
    {
      code: '21',
      name: 'TATA PHOTON WHIZ',
      category: 'DATACARD'
    },
    {
      code: '22',
      name: 'TATA PHOTON MAX',
      category: 'DATACARD'
    },
    {
      code: '23',
      name: 'AIRTEL POSTPAID',
      category: 'POSTPAID'
    },
    {
      code: '24',
      name: 'IDEA POSTPAID',
      category: 'POSTPAID'
    },
    {
      code: '25',
      name: 'VODAFONE POSTPAID',
      category: 'POSTPAID'
    },
    {
      code: '26',
      name: 'RELIANCE GSM POSTPAID',
      category: 'POSTPAID'
    },
    {
      code: '27',
      name: 'RELIANCE CDMA POSTPAID',
      category: 'POSTPAID'
    },
    {
      code: '28',
      name: 'TATA DOCOMO  POSTPAID',
      category: 'POSTPAID'
    },
    {
      code: '29',
      name: 'AIRCEL  POSTPAID',
      category: 'POSTPAID'
    },
    {
      code: '30',
      name: 'MTS  POSTPAID',
      category: 'POSTPAID'
    },
    {
      code: '31',
      name: 'MTNL TELEPHONE',
      category: 'TELEPHONE'
    },
    {
      code: '32',
      name: 'BSNL TELEPHONE',
      category: 'TELEPHONE'
    },
    {
      code: '33',
      name: 'AIRTEL TELEPHONE',
      category: 'TELEPHONE'
    },
    {
      code: '34',
      name: 'BSES YAMUNA',
      category: 'ELECTRICITY'
    },
    {
      code: '35',
      name: 'BSES RAJDHANI',
      category: 'ELECTRICITY'
    },
    {
      code: '36',
      name: 'NORTH DELHI POWER LIMITED',
      category: 'ELECTRICITY'
    },
    {
      code: '39',
      name: 'RELIANCE GSM',
      category: 'MOBILE'
    },
    {
      code: '40',
      name: 'RELIANCE CDMA',
      category: 'MOBILE'
    },
    {
      code: '42',
      name: 'BSNL STV',
      category: 'STV'
    },
    {
      code: '43',
      name: 'TATA DOCOMO STV',
      category: 'STV'
    },
    {
      code: '44',
      name: 'TELENOR STV',
      category: 'STV'
    },
    {
      code: '47',
      name: 'MTNL STV',
      category: 'STV'
    },
    {
      code: '50',
      name: 'CHHATTISGARH ELECTRICITY BOARD',
      category: 'ELECTRICITY'
    },
    {
      code: '52',
      name: 'TORRENT POWER',
      category: 'ELECTRICITY'
    },
    {
      code: '55',
      name: 'RELIANCE ENERGY MUMBAI',
      category: 'ELECTRICITY'
    },
    {
      code: '56',
      name: 'UTTAR HARYANA BIJLI VITRANA NIGAM',
      category: 'ELECTRICITY'
    },
    {
      code: '57',
      name: 'WEST BENGAL ELECTRICITY DISTRI',
      category: 'ELECTRICITY'
    },
    {
      code: '58',
      name: 'TIKONA POSTPAID',
      category: 'ELECTRICITY'
    },
    {
      code: '59',
      name: 'BEST UNDERTAKING - MUMBAI',
      category: 'POSTPAID'
    },
    {
      code: '63',
      name: 'TATA POWER DELHI',
      category: 'ELECTRICITY'
    },
    {
      code: '69',
      name: 'PANJAB STATE POWER CORPORATION',
      category: 'ELECTRICITY'
    },
    {
      code: '71',
      name: 'TAMIL NADU ELECTICITY BOARD',
      category: 'ELECTRICITY'
    },
    {
      code: '73',
      name: 'BSNL POSTPAID',
      category: 'POSTPAID'
    },
    {
      code: '80',
      name: 'GUJARAT GAS COMPANY LTD',
      category: 'ELECTRICITY'
    },
    {
      code: '81',
      name: 'INDRAPRASHTA GAS LTD',
      category: 'ELECTRICITY'
    },
    {
      code: '82',
      name: 'TATA PHOTON PLUS',
      category: 'PHOTON'
    },
    {
      code: '83',
      name: 'CALCUTTA ELECTRICITY SUPPLY LTD -CESC',
      category: 'ELECTRICITY'
    },
    {
      code: '84',
      name: 'TATA TELE SERVICES POSTPAID',
      category: 'POSTPAID'
    },
    {
      code: '85',
      name: 'MAHANAGAR GAS LIMITED',
      category: 'GAS'
    },
    {
      code: '86',
      name: 'JAIPUR VIDYUT VITRAN NIGAM LIMITED- RAJASTHAN',
      category: 'ELECTRICITY'
    },
    {
      code: '87',
      name: 'BESCOM- BANGALORE',
      category: 'ELECTRICITY'
    },
    {
      code: '88',
      name: 'JODHPUR VIDYUT VITRAN NIGAM',
      category: 'ELECTRICITY'
    },
    {
      code: '89',
      name: 'SOUTH BIHAR POWER DISTRIBUTION COMPANY',
      category: 'ELECTRICITY'
    },
    {
      code: '90',
      name: 'NORTH BIHAR POWER DISTRIBUTION COMPANY',
      category: 'ELECTRICITY'
    },
    {
      code: '93',
      name: 'APSPDCL SOUTHERN POWER DISTRIBUTION COMPANY- ANDHRA',
      category: 'ELECTRICITY'
    },
    {
      code: '94',
      name: 'TSPDCL SOUTHERN POWER DISTRIBUTION COMPANY- TELANGANA',
      category: 'ELECTRICITY'
    },
    {
      code: '97',
      name: 'RAJASTHAN VIDYUT VITRAN NIGAM LIMITED',
      category: 'ELECTRICITY'
    },
    {
      code: '98',
      name: 'MSEDC LIMITED',
      category: 'ELECTRICITY'
    },
    {
      code: '99',
      name: 'INDIA POWER CORPORATION LIMITED',
      category: 'ELECTRICITY'
    },
    {
      code: '100',
      name: 'JAMSHEDPUR UTILITIES & SERVICES (JUSCO)',
      category: 'ELECTRICITY'
    },
    {
      code: '101',
      name: 'NOIDA POWER COMPANY LIMITED- NOIDA',
      category: 'ELECTRICITY'
    },
    {
      code: '102',
      name: 'BRIHAN MUMBAI ELECTRIC SUPPLY AND TRANSPORT UNDERTAKING',
      category: 'ELECTRICITY'
    },
    {
      code: '103',
      name: 'PASCHIM KSHETRA VITARAN - MADHYA PRADESH',
      category: 'ELECTRICITY'
    },
    {
      code: '109',
      name: 'JAMSHEDPUR UTILITIES AND SERVICES COMPANY LIMITED',
      category: 'ELECTRICITY'
    },
    {
      code: '112',
      name: 'RELIANCE JIO',
      category: 'MOBILE'
    },
    {
      code: '113',
      name: 'APDCL - ASSAM',
      category: 'ELECTRICITY'
    },
    {
      code: '114',
      name: 'TSECL - TRIPURA',
      category: 'ELECTRICITY'
    },
    {
      code: '115',
      name: 'UDIO WALLET',
      category: 'UDIO'
    },
    {
      code: '116',
      name: 'SOUTHERN POWER DISTRIBUTION',
      category: 'ELECTRICITY'
    },
    {
      code: '117',
      name: 'BHARATPUR ELECTRICITY SERVICES LTD',
      category: 'ELECTRICITY'
    },
    {
      code: '118',
      name: 'BIKANER ELECTRICITY SUPPLY LIMITED',
      category: 'ELECTRICITY'
    },
    {
      code: '119',
      name: 'DAMAN AND DIU ELECTRICITY DEPARTMENT',
      category: 'ELECTRICITY'
    },
    {
      code: '120',
      name: 'DAKSHIN GUJARAT VIJ COMPANY LIMITED',
      category: 'ELECTRICITY'
    },
    {
      code: '121',
      name: 'DNH POWER DISTRIBUTION COMPANY LIMITED',
      category: 'ELECTRICITY'
    },
    {
      code: '122',
      name: 'EASTERN POWER DISTRIBUTION COMPANY OF ANDHRA PRADESH LIMITED',
      category: 'ELECTRICITY'
    },
    {
      code: '123',
      name: 'KOTA ELECTRICITY DISTRIBUTION LTD',
      category: 'ELECTRICITY'
    },
    {
      code: '124',
      name: 'MEGHALAYA POWER DISTRIBUTION CORPORATI ON LTD',
      category: 'ELECTRICITY'
    },
    {
      code: '125',
      name: 'MADHYA GUJARAT VIJ COMPANY LIMITED',
      category: 'ELECTRICITY'
    },
    {
      code: '126',
      name: 'PASCHIM GUJARAT VIJ COMPANY LIMITED',
      category: 'ELECTRICITY'
    },
    {
      code: '127',
      name: 'TATA POWER  MUMBAI',
      category: 'ELECTRICITY'
    },
    {
      code: '128',
      name: 'UTTAR GUJARAT VIJ COMPANY LIMITED',
      category: 'ELECTRICITY'
    },
    {
      code: '129',
      name: 'ODISHA DISCOMS',
      category: 'ELECTRICITY'
    },
    {
      code: '130',
      name: 'MADHYA PRADESH POORV KSHETRA VIDYUT VITARAN COMPANY LIMITED(NGB)',
      category: 'ELECTRICITY'
    },
    {
      code: '131',
      name: 'MADHYA PRADESH PASCHIM KSHETRA VIDYUT VITARAN COMPANY LTD (INDORE)',
      category: 'ELECTRICITY'
    },
    {
      code: '132',
      name: 'HARYANA CITY GAS',
      category: 'GAS'
    },
    {
      code: '133',
      name: 'SITI ENERGY',
      category: 'GAS'
    },
    {
      code: '134',
      name: 'TRIPURA NATURAL GAS COMPANY LTD',
      category: 'GAS'
    },
    {
      code: '136',
      name: 'UTTARAKHAND POWER CORPORATION LIMITED',
      category: 'ELECTRICITY'
    },
    {
      code: '137',
      name: 'MUZAFFARPUR VIDYUT VITRAN LIMITED',
      category: 'ELECTRICITY'
    },
    {
      code: '138',
      name: 'UTTAR PRADESH POWER CORP LTD (UPPCL) - URBAN',
      category: 'ELECTRICITY'
    },
    {
      code: '139',
      name: 'NORTH BIHAR POWER DISTRIBUTION COMPANY LTD',
      category: 'ELECTRICITY'
    },
    {
      code: '140',
      name: 'SOUTH BIHAR POWER DISTRIBUTION COMPANY LTD.',
      category: 'ELECTRICITY'
    },
    {
      code: '141',
      name: 'ASSAM POWER DISTRIBUTION COMPANY LTD (APDCL)',
      category: 'ELECTRICITY'
    },
    {
      code: '142',
      name: 'UIT BHIWADI',
      category: 'WATER'
    },
    {
      code: '143',
      name: 'UTTARAKHAND JAL SANSTHAN(B2B)-RETAIL',
      category: 'WATER'
    },
    {
      code: '144',
      name: 'UTTARAKHAND JAL SANSTHAN(B2C)-ONLINE',
      category: 'WATER'
    },
    {
      code: '145',
      name: 'DELHI JAL BOARD',
      category: 'WATER'
    },
    {
      code: '146',
      name: 'MUNICIPAL CORPORATION OF GURUGRAM',
      category: 'WATER'
    },
    {
      code: '147',
      name: 'UTTAR PRADESH POWER CORPORATION LIMITED RURAL(UPPCLR)',
      category: 'ELECTRICITY'
    },
    {
      code: '148',
      name: 'DAKSHIN HARYANA BIJLI VITRAN NIGAM',
      category: 'ELECTRICITY'
    },
    {
      code: '149',
      name: 'M P POORV KSHETRA VIDYUT VITARAN COMPANY LIMITED-JABALPUR(RURAL)',
      category: 'ELECTRICITY'
    },
    {
      code: '150',
      name: 'ADANI GAS',
      category: 'GAS'
    },
    {
      code: '151',
      name: 'AJMER VIDUT VITRAN NIGAM LTD',
      category: 'ELECTRICITY'
    },
    {
      code: '152',
      name: 'MADHYA PRADESH POORV KSHETRA VIDYUT VITARAN COMPANY LIMITED(MPPKVVCL)-JABALPUR URBAN',
      category: 'ELECTRICITY'
    },
    {
      code: '153',
      name: 'MADHYA KSHETRA VIDYUT VITARAN COMPANY LIMITED - BHOPAL',
      category: 'ELECTRICITY'
    },
    {
      code: '154',
      name: 'TORRENT GAS MORADABAD LIMITED FORMERLY SITI  ENERGY LIMITED',
      category: 'GAS'
    },
    {
      code: '208',
      name: 'UJJAIN NAGAR NIGAM – PHED',
      category: 'WATER'
    },
    {
      code: '180',
      name: 'AAVANTIKA GAS LTD',
      category: 'GAS'
    },
    {
      code: '181',
      name: 'BHAGYANAGAR GAS LIMITED',
      category: 'GAS'
    },
    {
      code: '182',
      name: 'CENTRAL U.P. GAS LIMITED',
      category: 'GAS'
    },
    {
      code: '183',
      name: 'CHAROTAR GAS SAHAKARI MANDALI LTD',
      category: 'GAS'
    },
    {
      code: '188',
      name: 'MAHARASHTRA NATURAL GAS LIMITED',
      category: 'GAS'
    },
    {
      code: '189',
      name: 'SABARMATI GAS LIMITED (SGL)',
      category: 'GAS'
    },
    {
      code: '190',
      name: 'UNIQUE CENTRAL PIPED GASES PVT LTD (UCPGPL)',
      category: 'GAS'
    },
    {
      code: '191',
      name: 'VADODARA GAS LIMITED',
      category: 'GAS'
    },
    {
      code: '192',
      name: 'BANGALORE WATER SUPPLY',
      category: 'WATER'
    },
    {
      code: '193',
      name: 'BHOPAL MUNICIPAL CORPORATION',
      category: 'WATER'
    },
    {
      code: '194',
      name: 'GREATER WARANGAL MUNICIPAL CORPORATION – WATER',
      category: 'WATER'
    },
    {
      code: '195',
      name: 'GWALIOR MUNICIPAL CORPORATION',
      category: 'WATER'
    },
    {
      code: '196',
      name: 'HYDERABAD METROPOLITAN WATER SUPPLY AND SEWERAGE BOARD',
      category: 'WATER'
    },
    {
      code: '197',
      name: 'INDORE MUNICIPAL CORPORATION',
      category: 'WATER'
    },
    {
      code: '198',
      name: 'JABALPUR MUNICIPAL CORPORATION',
      category: 'WATER'
    },
    {
      code: '199',
      name: 'MUNICIPAL CORPORATION CHANDIGARH',
      category: 'WATER'
    },
    {
      code: '200',
      name: 'MUNICIPAL CORPORATION JALANDHAR',
      category: 'WATER'
    },
    {
      code: '201',
      name: 'MUNICIPAL CORPORATION LUDHIANA – WATER',
      category: 'WATER'
    },
    {
      code: '202',
      name: 'MUNICIPAL CORPORATION OF FARIDABAD - WATER',
      category: 'WATER'
    },
    {
      code: '203',
      name: 'MYSURU CITY CORPORATION',
      category: 'WATER'
    },
    {
      code: '204',
      name: 'NEW DELHI MUNICIPAL COUNCIL (NDMC) - WATER',
      category: 'WATER'
    },
    {
      code: '205',
      name: 'PUNE MUNICIPAL CORPORATION WATER',
      category: 'WATER'
    },
    {
      code: '206',
      name: 'RANCHI MUNICIPAL CORPORATION',
      category: 'WATER'
    },
    {
      code: '207',
      name: 'SURAT MUNICIPAL CORPORATION',
      category: 'WATER'
    },
    {
      code: '208',
      name: 'UJJAIN NAGAR NIGAM – PHED',
      category: 'WATER'
    },
    {
      code: '209',
      name: 'PHED RAJSTHAN',
      category: 'WATER'
    }
  ];

  partPaymentList = [
    {
      id: '5',
      name: 'TATA POWER DELHI',
      category: 'ELECTRICITY'
    }
  ];
  IglPaymentList = [
    {
        id:76,
        category: "GAS",
        name: "IGL (Indraprasth Gas Limited)"
    }
  ];
  
  indicoreElectricityList=[
    {
        code: "AJEB",
        name: "AJMER VIDYUT VITRAN NIGAM - RAJASTHAN",
        category: "ELECTRICITY"
    },
    {
        code: "AAEB",
        name: "APDCL - ASSAM",
        category: "ELECTRICITY"
    },
    {
        code: "EPEB",
        name: "APEPDCL - ANDHRA PRADESH",
        category: "ELECTRICITY"
    },
    {
        code: "SPEB",
        name: "APSPDCL - ANDHRA PRADESH",
        category: "ELECTRICITY"
    },
    {
        code: "BLEB",
        name: "BESCOM - BENGALURU",
        category: "ELECTRICITY"
    },
    {
        code: "BPEB",
        name: "BESL - BHARATPUR",
        category: "ELECTRICITY"
    },
    {
        code: "BMEB",
        name: "BEST UNDERTAKING - MUMBAI",
        category: "ELECTRICITY"
    },
    {
        code: "BKEB",
        name: "BKESL - BIKANER",
        category: "ELECTRICITY"
    },
    {
        code: "BREB",
        name: "BSES RAJDHANI - DELHI",
        category: "ELECTRICITY"
    },
    {
        code: "BYEB",
        name: "BSES YAMUNA - DELHI",
        category: "ELECTRICITY"
    },
    {
        code: "CSEB",
        name: "CESC - WEST BENGAL",
        category: "ELECTRICITY"
    },
    {
        code: "CGEB",
        name: "CSPDCL - CHHATTISGARH",
        category: "ELECTRICITY"
    },
    {
        code: "DDEB",
        name: "DAMAN AND DIU ELECTRICITY",
        category: "ELECTRICITY"
    },
    {
        code: "DGEB",
        name: "DGVCL - GUJARAT",
        category: "ELECTRICITY"
    },
    {
        code: "DHEB",
        name: "DHBVN - HARYANA",
        category: "ELECTRICITY"
    },
    {
        code: "DNEB",
        name: "DNHPDCL - DADRA & NAGAR HAVELI",
        category: "ELECTRICITY"
    },
    {
        code: "GKEB",
        name: "GESCOM - KARNATAKA",
        category: "ELECTRICITY"
    },
    {
        code: "IPEB",
        name: "INDIA POWER - BIHAR",
        category: "ELECTRICITY"
    },
    {
        code: "IWEB",
        name: "INDIA POWER - WEST BENGAL",
        category: "ELECTRICITY"
    },
    {
        code: "JPEB",
        name: "JAIPUR VIDYUT VITRAN NIGAM - RAJASTHAN",
        category: "ELECTRICITY"
    },
    {
        code: "JDEB",
        name: "JODHPUR VIDYUT VITRAN NIGAM - RAJASTHAN",
        category: "ELECTRICITY"
    },
    {
        code: "JUEB",
        name: "JUSCO - JAMSHEDPUR",
        category: "ELECTRICITY"
    },
    {
        code: "KREB",
        name: "KOTA ELECTRICITY DISTRIBUTION - RAJASTHAN",
        category: "ELECTRICITY"
    },
    {
        code: "MPEB",
        name: "MADHYA KSHETRA VITARAN - MADHYA PRADESH",
        category: "ELECTRICITY"
    },
    {
        code: "MEEB",
        name: "MEPDCL - MEGHALAYA",
        category: "ELECTRICITY"
    },
    {
        code: "MGEB",
        name: "MGVCL - GUJARAT",
        category: "ELECTRICITY"
    },
    {
        code: "MSEB",
        name: "MSEDC - MAHARASHTRA",
        category: "ELECTRICITY"
    },
    {
        code: "MBEB",
        name: "MUZAFFARPUR VIDYUT VITRAN",
        category: "ELECTRICITY"
    },
    {
        code: "NBEB",
        name: "NBPDCL - BIHAR",
        category: "ELECTRICITY"
    },
    {
        code: "ODEB",
        name: "NESCO - ODISHA",
        category: "ELECTRICITY"
    },
    {
        code: "NDEB",
        name: "NOIDA POWER - NOIDA",
        category: "ELECTRICITY"
    },
    {
        code: "PVEB",
        name: "PASCHIM KSHETRA VITARAN - MADHYA PRADESH",
        category: "ELECTRICITY"
    },
    {
        code: "PGEB",
        name: "PGVCL - GUJARAT",
        category: "ELECTRICITY"
    },
    {
        code: "PBEB",
        name: "PSPCL - PUNJAB",
        category: "ELECTRICITY"
    },
    {
        code: "REEB",
        name: "RELIANCE ENERGY",
        category: "ELECTRICITY"
    },
    {
        code: "SBEB",
        name: "SBPDCL - BIHAR",
        category: "ELECTRICITY"
    },
    {
        code: "SNDL",
        name: "SNDL POWER - NAGPUR",
        category: "ELECTRICITY"
    },
    {
        code: "SOEB",
        name: "SOUTHCO - ODISHA",
        category: "ELECTRICITY"
    },
    {
        code: "TDEB",
        name: "TATA POWER - DELHI",
        category: "ELECTRICITY"
    },
    {
        code: "TMEB",
        name: "TATA POWER - MUMBAI",
        category: "ELECTRICITY"
    },
    {
        code: "TNEB",
        name: "TNEB - TAMIL NADU",
        category: "ELECTRICITY"
    },
    {
        code: "TPEB",
        name: "TORRENT SURAT",
        category: "ELECTRICITY"
    },
    {
        code: "ATEB",
        name: "TPADL - AJMER",
        category: "ELECTRICITY"
    },
    {
        code: "TREB",
        name: "TSECL - TRIPURA",
        category: "ELECTRICITY"
    },
    {
        code: "UGEB",
        name: "UGVCL - GUJARAT",
        category: "ELECTRICITY"
    },
    {
        code: "UHEB",
        name: "UHBVN - HARYANA",
        category: "ELECTRICITY"
    },
    {
        code: "UKEB",
        name: "UPCL - UTTARAKHAND",
        category: "ELECTRICITY"
    },
    {
        code: "UREB",
        name: "UPPCL (RURAL) - UTTAR PRADESH",
        category: "ELECTRICITY"
    },
    {
        code: "UPEB",
        name: "UPPCL (URBAN) - UTTAR PRADESH",
        category: "ELECTRICITY"
    },
    {
        code: "WOEB",
        name: "WESCO - ODISHA",
        category: "ELECTRICITY"
    },
    {
        code: "HPEB",
        name: "HIMACHAL PRADESH STATE ELECTRICITY BOARD",
        category: "ELECTRICITY"
    },
    {
        code: "WBEB",
        name: "WEST BENGAL STATE ELEC DISTRIBUTION (WBSEDCL)",
        category: "ELECTRICITY"
    },
    {
        code: "JKEB",
        name: "JHARKHAND BIJLI VITRAN NIGAM LIMITED (JBVNL)",
        category: "ELECTRICITY"
    },
    {
        code: "MKEB",
        name: "MP POORV KSHETRA VIDYUT VITRAN JABALPUR -RURAL MPKV",
        category: "ELECTRICITY"
    },
    {
        code: "MKUEB",
        name: "MP POORV KSHETRA VIDYUT VITRAN JABALPUR -URBAN MPKVU",
        category: "ELECTRICITY"
    },
    {
        code: "TSEB",
        name: "TELANGANA STATE SOUTHERN POWER DISTRIBUTION COMPANY LTD-TSSPDCL",
        category: "ELECTRICITY"
    },
    {
        code: "ANEB",
        name: "APDCL-NON RAPDR",
        category: "ELECTRICITY"
    },
    {
        code: "CEEB",
        name: "CHAMUNDESHWARI ELECTRICITY SUPPLY CORP LTD (CESCOM)",
        category: "ELECTRICITY"
    },
    {
        code: "COEB",
        name: "CESU ODHISA",
        category: "ELECTRICITY"
    },
    {
        code: "DOEB",
        name: "ODISHA DISCOMS - ODISHA",
        category: "ELECTRICITY"
    },
    {
        code: "GEEB",
        name: "GOA ELECTRICITY DEPARTMENT",
        category: "ELECTRICITY"
    },
    {
        code: "HEEB",
        name: "HUBLI ELECTRICITY SUPPLY COMPANY LTD (HESCOM)",
        category: "ELECTRICITY"
    },
    {
        code: "KEEB",
        name: "KANPUR ELECTRICITY SUPPLY COMPANY LTD",
        category: "ELECTRICITY"
    },
    {
        code: "KSEB",
        name: "KERALA STATE ELECTRICITY BOARD",
        category: "ELECTRICITY"
    },
    {
        code: "MLEB",
        name: "MANGALORE ELECTRICITY (MESCOM)",
        category: "ELECTRICITY"
    },
    {
        code: "PNEB",
        name: "DEPARTMENT OF POWER NAGALAND",
        category: "ELECTRICITY"
    },
    {
        code: "PDEB",
        name: "GOVERNMENT OF PUDDUCHERY ELCETRICTY DEPARTMENT",
        category: "ELECTRICITY"
    },
    {
        code: "SKUEB",
        name: "SIKKIM POWER - URBAN",
        category: "ELECTRICITY"
    },
    {
        code: "SKEB",
        name: "SIKKIM POWER Â€“ RURAL",
        category: "ELECTRICITY"
    },
    {
        code: "CDEB",
        name: "ELECTRICITY DEPARTMENT CHANDIGARH",
        category: "ELECTRICITY"
    },
    {
        code: "MPUEB",
        name: "M.P. MADHYA KSHETRA VIDYUT VITARAN - URBAN",
        category: "ELECTRICITY"
    },
    {
        code: "MZEB",
        name: "POWER AND ELECTRICITY MIZORAM",
        category: "ELECTRICITY"
    },
    {
        code: "CPEB",
        name: "CENTRAL POWER DISTRIBUTION COMPANY LTD. OF ANDHRA PRADESH\r\n(APCPDCL)",
        category: "ELECTRICITY"
    },
    {
        code: "NDMC",
        name: "NEW DELHI MUNICIPAL COUNCIL (NDMC) - ELECTRICITY",
        category: "ELECTRICITY"
    },
    {
        code: "PMEB",
        name: "PASCHIMACHAL VIDYUT VITRAN NIGAM LIMITED",
        category: "ELECTRICITY"
    },
    {
        code: "TPEB",
        name: "TORRENT AHMEDABAD",
        category: "ELECTRICITY"
    },
    {
        code: "TPEB",
        name: "TORRENT BHIWANDI",
        category: "ELECTRICITY"
    },
    {
        code: "TPEB",
        name: "TORRENT AGRA",
        category: "ELECTRICITY"
    }
  ];
  finTechElectricityList=[
      {
          "code": "34",
          "name": "BSES YAMUNA",
          "category": "ELECTRICITY"
      },
      {
          "code": "35",
          "name": "BSES RAJDHANI",
          "category": "ELECTRICITY"
      },
      {
          "code": "36",
          "name": "NORTH DELHI POWER LIMITED",
          "category": "ELECTRICITY"
      },
      {
          "code": "50",
          "name": "CHHATTISGARH ELECTRICITY BOARD",
          "category": "ELECTRICITY"
      },
      {
          "code": "52",
          "name": "TORRENT POWER",
          "category": "ELECTRICITY"
      },
      {
          "code": "55",
          "name": "RELIANCE ENERGY MUMBAI",
          "category": "ELECTRICITY"
      },
      {
          "code": "56",
          "name": "UTTAR HARYANA BIJLI VITRANA NIGAM",
          "category": "ELECTRICITY"
      },
      {
          "code": "57",
          "name": "WEST BENGAL ELECTRICITY DISTRI",
          "category": "ELECTRICITY"
      },
      {
          "code": "58",
          "name": "TIKONA POSTPAID",
          "category": "ELECTRICITY"
      },
      {
          "code": "63",
          "name": "TATA POWER DELHI",
          "category": "ELECTRICITY"
      },
      {
          "code": "69",
          "name": "PANJAB STATE POWER CORPORATION",
          "category": "ELECTRICITY"
      },
      {
          "code": "71",
          "name": "TAMIL NADU ELECTICITY BOARD",
          "category": "ELECTRICITY"
      },
      {
          "code": "80",
          "name": "GUJARAT GAS COMPANY LTD",
          "category": "ELECTRICITY"
      },
      {
          "code": "81",
          "name": "INDRAPRASHTA GAS LTD",
          "category": "ELECTRICITY"
      },
      {
          "code": "83",
          "name": "CALCUTTA ELECTRICITY SUPPLY LTD -CESC",
          "category": "ELECTRICITY"
      },
      {
          "code": "86",
          "name": "JAIPUR VIDYUT VITRAN NIGAM LIMITED- RAJASTHAN",
          "category": "ELECTRICITY"
      },
      {
          "code": "87",
          "name": "BESCOM- BANGALORE",
          "category": "ELECTRICITY"
      },
      {
          "code": "88",
          "name": "JODHPUR VIDYUT VITRAN NIGAM",
          "category": "ELECTRICITY"
      },
      {
          "code": "89",
          "name": "SOUTH BIHAR POWER DISTRIBUTION COMPANY",
          "category": "ELECTRICITY"
      },
      {
          "code": "90",
          "name": "NORTH BIHAR POWER DISTRIBUTION COMPANY",
          "category": "ELECTRICITY"
      },
      {
          "code": "93",
          "name": "APSPDCL SOUTHERN POWER DISTRIBUTION COMPANY- ANDHRA",
          "category": "ELECTRICITY"
      },
      {
          "code": "94",
          "name": "TSPDCL SOUTHERN POWER DISTRIBUTION COMPANY- TELANGANA",
          "category": "ELECTRICITY"
      },
      {
          "code": "96",
          "name": "MADHYA KSHETRA VIDYUT VITARAN - BHOPAL",
          "category": "ELECTRICITY"
      },
      {
          "code": "97",
          "name": "RAJASTHAN VIDYUT VITRAN NIGAM LIMITED",
          "category": "ELECTRICITY"
      },
      {
          "code": "98",
          "name": "MSEDC LIMITED",
          "category": "ELECTRICITY"
      },
      {
          "code": "99",
          "name": "INDIA POWER CORPORATION LIMITED",
          "category": "ELECTRICITY"
      },
      {
          "code": "100",
          "name": "JAMSHEDPUR UTILITIES & SERVICES (JUSCO)",
          "category": "ELECTRICITY"
      },
      {
          "code": "101",
          "name": "NOIDA POWER COMPANY LIMITED- NOIDA",
          "category": "ELECTRICITY"
      },
      {
          "code": "102",
          "name": "BRIHAN MUMBAI ELECTRIC SUPPLY AND TRANSPORT UNDERTAKING",
          "category": "ELECTRICITY"
      },
      {
          "code": "103",
          "name": "PASCHIM KSHETRA VITARAN - MADHYA PRADESH",
          "category": "ELECTRICITY"
      },
      {
          "code": "109",
          "name": "JAMSHEDPUR UTILITIES AND SERVICES COMPANY LIMITED",
          "category": "ELECTRICITY"
      },
      {
          "code": "113",
          "name": "APDCL - ASSAM",
          "category": "ELECTRICITY"
      },
      {
          "code": "114",
          "name": "TSECL - TRIPURA",
          "category": "ELECTRICITY"
      },
      {
          "code": "116",
          "name": "SOUTHERN POWER DISTRIBUTION",
          "category": "ELECTRICITY"
      },
      {
          "code": "117",
          "name": "BHARATPUR ELECTRICITY SERVICES LTD",
          "category": "ELECTRICITY"
      },
      {
          "code": "118",
          "name": "BIKANER ELECTRICITY SUPPLY LIMITED",
          "category": "ELECTRICITY"
      },
      {
          "code": "119",
          "name": "DAMAN AND DIU ELECTRICITY DEPARTMENT",
          "category": "ELECTRICITY"
      },
      {
          "code": "120",
          "name": "DAKSHIN GUJARAT VIJ COMPANY LIMITED",
          "category": "ELECTRICITY"
      },
      {
          "code": "121",
          "name": "DNH POWER DISTRIBUTION COMPANY LIMITED",
          "category": "ELECTRICITY"
      },
      {
          "code": "122",
          "name": "EASTERN POWER DISTRIBUTION COMPANY OF ANDHRA PRADESH LIMITED",
          "category": "ELECTRICITY"
      },
      {
          "code": "123",
          "name": "KOTA ELECTRICITY DISTRIBUTION LTD",
          "category": "ELECTRICITY"
      },
      {
          "code": "124",
          "name": "MEGHALAYA POWER DISTRIBUTION CORPORATI ON LTD",
          "category": "ELECTRICITY"
      },
      {
          "code": "125",
          "name": "MADHYA GUJARAT VIJ COMPANY LIMITED",
          "category": "ELECTRICITY"
      },
      {
          "code": "126",
          "name": "PASCHIM GUJARAT VIJ COMPANY LIMITED",
          "category": "ELECTRICITY"
      },
      {
          "code": "127",
          "name": "TATA POWER  MUMBAI",
          "category": "ELECTRICITY"
      },
      {
          "code": "128",
          "name": "UTTAR GUJARAT VIJ COMPANY LIMITED",
          "category": "ELECTRICITY"
      },
      {
          "code": "129",
          "name": "ODISHA DISCOMS",
          "category": "ELECTRICITY"
      },
      {
          "code": "130",
          "name": "MADHYA PRADESH POORV KSHETRA VIDYUT VITARAN COMPANY LIMITED",
          "category": "ELECTRICITY"
      },
      {
          "code": "131",
          "name": "MADHYA PRADESH PASCHIM KSHETRA VIDYUT VITARAN COMPANY LTD (INDORE)",
          "category": "ELECTRICITY"
      },
      {
          "code": "136",
          "name": "UTTARAKHAND POWER CORPORATION LIMITED",
          "category": "ELECTRICITY"
      },
      {
          "code": "137",
          "name": "MUZAFFARPUR VIDYUT VITRAN LIMITED",
          "category": "ELECTRICITY"
      },
      {
          "code": "138",
          "name": "UTTAR PRADESH POWER CORP LTD (UPPCL) - URBAN",
          "category": "ELECTRICITY"
      },
      {
          "code": "139",
          "name": "NORTH BIHAR POWER DISTRIBUTION COMPANY LTD",
          "category": "ELECTRICITY"
      },
      {
          "code": "140",
          "name": "SOUTH BIHAR POWER DISTRIBUTION COMPANY LTD.",
          "category": "ELECTRICITY"
      },
      {
          "code": "141",
          "name": "ASSAM POWER DISTRIBUTION COMPANY LTD (APDCL)",
          "category": "ELECTRICITY"
      },
      {
          "code": "147",
          "name": "UTTAR PRADESH POWER CORPORATION LIMITED RURAL(UPPCLR)",
          "category": "ELECTRICITY"
      },
      {
          "code": "148",
          "name": "DAKSHIN HARYANA BIJLI VITRAN NIGAM",
          "category": "ELECTRICITY"
      },
      {
          "code": "149",
          "name": "M P POORV KSHETRA VIDYUT VITARAN COMPANY LIMITED-JABALPUR(RURAL)",
          "category": "ELECTRICITY"
      },
      {
          "code": "151",
          "name": "AJMER VIDUT VITRAN NIGAM LTD",
          "category": "ELECTRICITY"
      },
      {
          "code": "152",
          "name": "MADHYA PRADESH POORV KSHETRA VIDYUT VITARAN COMPANY LIMITED(MPPKVVCL)-JABALPUR URBAN",
          "category": "ELECTRICITY"
      },
      {
          "code": "153",
          "name": "MADHYA KSHETRA VIDYUT VITARAN COMPANY LIMITED - BHOPAL",
          "category": "ELECTRICITY"
      },
      {
        "code": "55",
        "name": "ADANI ELECTRICITY MUMBAI LIMITED",
        "category": "ELECTRICITY"
      },
      {
        "code": "59",
        "name": "B.E.S.T MUMBAI",
        "category": "ELECTRICITY"
      },
      {
        "code": "215",
        "name": "Jharkhand Bijli Vitran Nigam Limited (JBVNL)",
        "category": "ELECTRICITY"
      }
  ]
  mobikwikElectricityList=[
        {
            "code": "31",
            "name": "ADANI ELECTRICITY MUMBAI LIMITED",
            "category": "ELECTRICITY"
        },
        {
            "code": "32",
            "name": "BSES RAJDHANI POWER LIMITED",
            "category": "ELECTRICITY"
        },
        {
            "code": "33",
            "name": "BSES YAMUNA POWER LIMITED",
            "category": "ELECTRICITY"
        },
        {
            "code": "39",
            "name": "MSEB MUMBAI",
            "category": "ELECTRICITY"
        },
        {
            "code": "41",
            "name": "TATA POWER DELHI DISTRIBUTION LTD",
            "category": "ELECTRICITY"
        },
        {
            "code": "49",
            "name": "MADHYA GUJARAT VIJ COMPANY LTD",
            "category": "ELECTRICITY"
        },
        {
            "code": "50",
            "name": "DAKSHIN GUJARAT VIJ COMPANY LTD",
            "category": "ELECTRICITY"
        },
        {
            "code": "51",
            "name": "PASCHIM GUJARAT VIJ COMPANY LTD",
            "category": "ELECTRICITY"
        },
        {
            "code": "52",
            "name": "UTTAR GUJARAT VIJ COMPANY LTD",
            "category": "ELECTRICITY"
        },
        {
            "code": "59",
            "name": "B.E.S.T MUMBAI",
            "category": "ELECTRICITY"
        },
        {
            "code": "60",
            "name": "CHHATTISGARH ELECTRICITY BOARD",
            "category": "ELECTRICITY"
        },
        {
            "code": "61",
            "name": "NOIDA POWER COMPANY LIMITED",
            "category": "ELECTRICITY"
        },
        {
            "code": "62",
            "name": "JAIPUR VIDYUT VITRAN NIGAM LTD",
            "category": "ELECTRICITY"
        },
        {
            "code": "63",
            "name": "JODHPUR VIDYUT VITRAN NIGAM LTD",
            "category": "ELECTRICITY"
        },
        {
            "code": "67",
            "name": "BANGALORE ELECTRICITY SUPPLY",
            "category": "ELECTRICITY"
        },
        {
            "code": "68",
            "name": "M.P. PASCHIM KSHETRA VIDYUT VITARAN",
            "category": "ELECTRICITY"
        },
        {
            "code": "69",
            "name": "JAMSHEDPUR UTILITIES AND SERVICES COMPANY",
            "category": "ELECTRICITY"
        },
        {
            "code": "71",
            "name": "TORRENT POWER",
            "category": "ELECTRICITY"
        },
        {
            "code": "112",
            "name": "BHAGALPUR ELECTRICITY DISTRIBUTION COMPANY (P) LTD",
            "category": "ELECTRICITY"
        },
        {
            "code": "114",
            "name": "DNH POWER DISTRIBUTION COMPANY LIMITED",
            "category": "ELECTRICITTY"
        },
        {
            "code": "117",
            "name": "TRIPURA STATE ELECTRICITY BOARD",
            "category": "ELECTRICITY"
        },
        {
            "code": "120",
            "name": "MP-POORV KSHETRA VIDYUT VITARAN CO. LTD.(JABALPUR)",
            "category": "ELECTRICITY"
        },
        {
            "code": "121",
            "name": "DAMAN AND DIU ELECTRICITY DEPARTMENT",
            "category": "ELECTRICITY"
        },
        {
            "code": "122",
            "name": "CALCUTTA ELECTRICITY SUPPLY CO. LTD.",
            "category": "ELECTRICITY"
        },
        {
            "code": "123",
            "name": "MEGHALAYA POWER DISTRIBUTION COR. LTD",
            "category": "ELECTRICITY"
        },
        {
            "code": "132",
            "name": "AJMER VIDYUT VITRAN NIGAM LTD",
            "category": "ELECTRICITY"
        },
        {
            "code": "146",
            "name": "TATA POWER MUMBAI",
            "category": "ELECTRICITY"
        },
        {
            "code": "147",
            "name": "KANPUR ELECTRICITY SUPPLY COMPANY LTD",
            "category": "ELECTRICITY"
        },
        {
            "code": "150",
            "name": "ASSAM POWER DISTRIBUTION COMPANY LTD",
            "category": "ELECTRICITY"
        },
        {
            "code": "160",
            "name": "UTTAR PRADESH POWER CORP. LTD. (UPPCL) - URBAN",
            "category": "ELECTRICITY"
        },
        {
            "code": "163",
            "name": "SOUTH BIHAR POWER DISTRIBUTION COMPANY LTD.",
            "category": "ELECTRICITY"
        },
        {
            "code": "164",
            "name": "BHARATPUR ELECTRICITY SERVICES LTD. (BESL)",
            "category": "ELECTRICITY"
        },
        {
            "code": "165",
            "name": "BIKANER ELECTRICITY SUPPLY LIMITED (BKESL)",
            "category": "ELECTRICITY"
        },
        {
            "code": "169",
            "name": "KOTA ELECTRICITY DISTRIBUTION LIMITED (KEDL)",
            "category": "ELECTRICITY"
        },
        {
            "code": "171",
            "name": "NORTH BIHAR POWER DISTRIBUTION COMPANY LTD.",
            "category": "ELECTRICITY"
        },
        {
            "code": "172",
            "name": "NESCO, ODISHA",
            "category": "ELECTRICITY"
        },
        {
            "code": "175",
            "name": "SOUTHCO, ODISHA",
            "category": "ELECTRICITY"
        },
        {
            "code": "177",
            "name": "TP AJMER DISTRIBUTION LTD (TPADL)",
            "category": "ELECTRICITY"
        },
        {
            "code": "179",
            "name": "UTTARAKHAND POWER CORPORATION LIMITED",
            "category": "ELECTRICITY"
        },
        {
            "code": "182",
            "name": "WESCO UTILITY",
            "category": "ELECTRICITY"
        },
        {
            "code": "183",
            "name": "GULBARGA ELECTRICITY SUPPLY COMPANY LIMITED",
            "category": "ELECTRICITY"
        },
        {
            "code": "189",
            "name": "TAMIL NADU ELECTRICITY BOARD (TNEB)",
            "category": "ELECTRICITY"
        },
        {
            "code": "190",
            "name": "UTTAR PRADESH POWER CORP LTD (UPPCL) - RURAL",
            "category": "ELECTRICITY"
        },
        {
            "code": "192",
            "name": "UTTAR HARYANA BIJLI VITRAN NIGAM (UHBVN)",
            "category": "ELECTRICITY"
        },
        {
            "code": "193",
            "name": "DAKSHIN HARYANA BIJLI VITRAN NIGAM (DHBVN)",
            "category": "ELECTRICITY"
        },
        {
            "code": "194",
            "name": "PUNJAB STATE POWER CORPORATION LTD (PSPCL)",
            "category": "ELECTRICITY"
        },
        {
            "code": "197",
            "name": "JHARKHAND BIJLI VITRAN NIGAM LIMITED (JBVNL)",
            "category": "ELECTRICITY"
        },
        {
            "code": "198",
            "name": "ASSAM POWER DISTRIBUTION COMPANY LTD (NON-RAPDR)",
            "category": "ELECTRICITY"
        },
        {
            "code": "199",
            "name": "CHAMUNDESHWARI ELECTRICITY SUPPLY CORP LTD (CESCOM)",
            "category": "ELECTRICITY"
        },
        {
            "code": "200",
            "name": "HUBLI ELECTRICITY SUPPLY COMPANY LTD (HESCOM)",
            "category": "ELECTRICITY"
        },
        {
            "code": "204",
            "name": "WEST BENGAL STATE ELECTRICITY DISTRIBUTION CO. LTD",
            "category": "ELECTRICITY"
        },
        {
            "code": "206",
            "name": "HIMACHAL PRADESH ELECTRICITY",
            "category": "ELECTRICITY"
        },
        {
            "code": "215",
            "name": "M.P. MADHYA KSHETRA VIDYUT VITARAN - URBAN",
            "category": "ELECTRICITY"
        },
        {
            "code": "216",
            "name": "M.P. MADHYA KSHETRA VIDYUT VITARAN - RURAL",
            "category": "ELECTRICITY"
        },
        {
            "code": "217",
            "name": "M.P. POORV KSHETRA VIDYUT VITARAN - URBAN",
            "category": "ELECTRICITY"
        },
        {
            "code": "219",
            "name": "NEW DELHI MUNICIPAL COUNCIL (NDMC) - ELECTRICITY",
            "category": "ELECTRICITY"
        },
        {
            "code": "234",
            "name": "M.P. POORV KSHETRA VIDYUT VITARAN – RURAL",
            "category": "ELECTRICITY"
        },
        {
            "code": "235",
            "name": "SIKKIM POWER – RURAL",
            "category": "ELECTRICITY"
        },
        {
            "code": "243",
            "name": "GOA ELECTRICITY DEPARTMENT",
            "category": "ELECTRICITY"
        },
        {
            "code": "245",
            "name": "DEPARTMENT OF POWER, NAGALAND",
            "category": "ELECTRICITY"
        },
        {
            "code": "246",
            "name": "SIKKIM POWER - URBAN",
            "category": "ELECTRICITY"
        },
        {
            "code": "247",
            "name": "MANGALORE ELECTRICITY SUPPLY CO. LTD (MESCOM)",
            "category": "ELECTRICITY"
        },
        {
            "code": "249",
            "name": "CESU, ODISHA",
            "category": "ELECTRICITY"
        },
        {
            "code": "250",
            "name": "KERALA STATE ELECTRICITY BOARD LTD. (KSEBL)",
            "category": "ELECTRICITY"
        },
        {
            "code": "251",
            "name": "POWER & ELECTRICITY DEPARTMENT – MIZORAM",
            "category": "ELECTRICITY"
        },
        {
            "code": "280",
            "name": "GOVERNMENT OF PUDUCHERRY ELECTRICITY DEPARTMENT",
            "category": "ELECTRICITY"
        },
        {
            "code": "329",
            "name": "CHANDIGARH ELECTRICITY DEPARTMENT",
            "category": "ELECTRICITY"
        },
        {
            "code": "381",
            "name": "DEPARTMENT OF POWER, GOVERNMENT OF ARUNACHAL PRADESH",
            "category": "ELECTRICITY"
        },
        {
            "code": "438",
            "name": "JAMMU AND KASHMIR POWER DEVELOPMENT DEPARTMENT",
            "category": "ELECTRICITY"
        },
        {
            "code": "490",
            "name": "MANGALORE ELECTRICITY SUPPLY COMPANY LTD (NON RAPDR)",
            "category": "ELECTRICITY"
        },
        {
            "code": "513",
            "name": "LAKSHADWEEP ELECTRICITY DEPARTMENT",
            "category": "ELECTRICITY"
        },
        {
            "code": "524",
            "name": "GIFT POWER COMPANY LIMITED",
            "category": "ELECTRICITY"
        },
        {
            "code": "551",
            "name": "DEPARTMENT OF POWER, GOVERNMENT OF ARUNACHAL PRADESH - PREPAID",
            "category": "ELECTRICITY"
        },
        {
            "code": "552",
            "name": "KANNAN DEVAN HILLS PLANTATIONS COMPANY PRIVATE LIMITED",
            "category": "ELECTRICITY"
        },
        {
            "code": "620",
            "name": "THRISSUR CORPORATION ELECTRICITY DEPARTMENT",
            "category": "ELECTRICITY"
        },
        {
            "code": "779",
            "name": "PASCHIMACHAL VIDYUT VITRAN NIGAM LIMITED",
            "category": "ELECTRICITY"
        }
  ];
  bilMitraElectricityList=[
    {
     "category": "ELECTRICITY",
     "name": "ADANI ELECTRICITY MUMBAI LIMITED",
     "code": "AEML"
    },
    {
     "category": "ELECTRICITY",
     "name": "BSES Rajdhani - Delhi",
     "code": "BSESR"
    },
    {
     "category": "ELECTRICITY",
     "name": "BSES Yamuna - Delhi",
     "code": "BSESY"
    },
    {
     "category": "ELECTRICITY",
     "name": "Calcutta Electric Supply Corporation (CESC)",
     "code": "CESC"
    },
    {
     "category": "ELECTRICITY",
     "name": "Eastern Power Distribution Company of Andhra Pradesh Ltd",
     "code": "APEPDCL"
    },
    {
     "category": "ELECTRICITY",
     "name": "Southern Power Distribution Company of A.P Ltd.",
     "code": "APSPDCL"
    },
    {
     "category": "ELECTRICITY",
     "name": "Ajmer Vidyut Vitran Nigam Ltd",
     "code": "AVVNL"
    },
    {
     "category": "ELECTRICITY",
     "name": "Bangalore Electricity Supply Company Ltd. (BESCOM)",
     "code": "BESCOM"
    },
    {
     "category": "ELECTRICITY",
     "name": "BEST Mumbai",
     "code": "BESTMUMBAI"
    },
    {
     "category": "ELECTRICITY",
     "name": "Chamundeshwari Electricity Supply Corporation Ltd. (Cesc,Mysore)",
     "code": "CESCOM"
    },
    {
     "category": "ELECTRICITY",
     "name": "Chhattisgarh State Power Distribution Company Ltd. (CSPDCL)",
     "code": "CSPDCL"
    },
    {
     "category": "ELECTRICITY",
     "name": "Dakshin Gujarat Vij Company Ltd",
     "code": "DGVCL"
    },
    {
     "category": "ELECTRICITY",
     "name": "Dakshin Haryana Bijli Vitran Nigam",
     "code": "DHBVN"
    },
    {
     "category": "ELECTRICITY",
     "name": "Daman and Diu Electricity",
     "code": "DNDE"
    },
    {
     "category": "ELECTRICITY",
     "name": "DNH Power Distribution Company Limited",
     "code": "DNHPDCL"
    },
    {
     "category": "ELECTRICITY",
     "name": "Gulbarga Electricity Supply Company Ltd. (GESCOM)",
     "code": "GESCOM"
    },
    {
     "category": "ELECTRICITY",
     "name": "Goa Electricity",
     "code": "GOAELC"
    },
    {
     "category": "ELECTRICITY",
     "name": "Hubli Electricity Supply Company Ltd. (HESCOM)",
     "code": "HESCOM"
    },
    {
     "category": "ELECTRICITY",
     "name": "Himachal Pradesh State Electricity Board Ltd",
     "code": "HPSEBL"
    },
    {
     "category": "ELECTRICITY",
     "name": "Jodhpur Vidyut Vitran Nigam Ltd",
     "code": "JDVVNL"
    },
    {
     "category": "ELECTRICITY",
     "name": "Jaipur Vidyut Vitran Nigam Ltd",
     "code": "JVVNL"
    },
    {
     "category": "ELECTRICITY",
     "name": "Bharatpur Electricity Services Ltd",
     "code": "KEDL"
    },
    {
     "category": "ELECTRICITY",
     "name": "Bikaner Electricity Supply Limited",
     "code": "KEDL"
    },
    {
     "category": "ELECTRICITY",
     "name": "Kota Electricity Distribution Ltd",
     "code": "KEDL"
    },
    {
     "category": "ELECTRICITY",
     "name": "Kanpur Electricity Supply Company",
     "code": "KESCO"
    },
    {
     "category": "ELECTRICITY",
     "name": "Kerala State Electricity Board Ltd.",
     "code": "KSEB"
    },
    {
     "category": "ELECTRICITY",
     "name": "Mangalore Electricity Supply Co. Ltd (MESCOM) - RAPDR",
     "code": "MESCOMR"
    },
    {
     "category": "ELECTRICITY",
     "name": "Madhya Gujarat Vij Company Ltd",
     "code": "MGVCL"
    },
    {
     "category": "ELECTRICITY",
     "name": "Madhya Pradesh Paschim Kshetra Vidyut Vitaran Company Ltd",
     "code": "MPPKVVCL"
    },
    {
     "category": "ELECTRICITY",
     "name": "MP Madhya Kshetra Vidyut Vitran - Bhopal",
     "code": "MPPKVVCL"
    },
    {
     "category": "ELECTRICITY",
     "name": "MP Madhaya Kshetra Vidyut Vitaran- Rular",
     "code": "MPPKVVCLMR"
    },
    {
     "category": "ELECTRICITY",
     "name": "MP Madhaya Kshetra Vidyut Vitaran -Urban",
     "code": "MPPKVVCLMU"
    },
    {
     "category": "ELECTRICITY",
     "name": "MP Poorv Kshetra Vidyut Vitaran - Rular",
     "code": "MPPKVVCLPUR"
    },
    {
     "category": "ELECTRICITY",
     "name": "MP Poorv Kshetra Vidyut Vitaran - Jabalpur",
     "code": "MPPKVVCLPUU"
    },
    {
     "category": "ELECTRICITY",
     "name": "Maharashtra State Electricity Distribution",
     "code": "MSEDCL"
    },
    {
     "category": "ELECTRICITY",
     "name": "Mahavitaran-Maharashtra State Electricity Distribution Company Ltd.",
     "code": "MSEDCL"
    },
    {
     "category": "ELECTRICITY",
     "name": "North Bihar Power Distribution",
     "code": "NBPDCL"
    },
    {
     "category": "ELECTRICITY",
     "name": "NESCO Odisha",
     "code": "NESCO"
    },
    {
     "category": "ELECTRICITY",
     "name": "Assam Power Distribution Company Ltd (NON-RAPDR)",
     "code": "NRAPDR"
    },
    {
     "category": "ELECTRICITY",
     "name": "Paschim Gujarat Vij Company Ltd",
     "code": "PGVCL"
    },
    {
     "category": "ELECTRICITY",
     "name": "Punjab State Power Corporation Limted",
     "code": "PSPCL"
    },
    {
     "category": "ELECTRICITY",
     "name": "Assam Power Distribution Company Ltd (RAPDR)",
     "code": "RAPDR"
    },
    {
     "category": "ELECTRICITY",
     "name": "Reliance Energy",
     "code": "REL IANCE"
    },
    {
     "category": "ELECTRICITY",
     "name": "South Bihar Power Distribution",
     "code": "SBPDCL"
    },
    {
     "category": "ELECTRICITY",
     "name": "SOUTHCO Odisha",
     "code": "SOUTHCO"
    },
    {
     "category": "ELECTRICITY",
     "name": "Tata Power",
     "code": "TATA"
    },
    {
     "category": "ELECTRICITY",
     "name": "Tamil Nadu Electricity Board",
     "code": "TNEB"
    },
    {
     "category": "ELECTRICITY",
     "name": "Torrent Power Agra",
     "code": "TORRENTAGRA"
    },
    {
     "category": "ELECTRICITY",
     "name": "Torrent Power Ahemdabad",
     "code": "TORRENTAHME"
    },
    {
     "category": "ELECTRICITY",
     "name": "Torrent Power Bhivandi",
     "code": "TORRENTBHIVA"
    },
    {
     "category": "ELECTRICITY",
     "name": "Torrent Power Dahej",
     "code": "TORRENTDAHEJ"
    },
    {
     "category": "ELECTRICITY",
     "name": "Torrent Power Surat",
     "code": "TORRENTSURAT"
    },
    {
     "category": "ELECTRICITY",
     "name": "TP Ajmer Distribution Ltd",
     "code": "TPADL"
    },
    {
     "category": "ELECTRICITY",
     "name": "Tripura state Electricity corporation",
     "code": "TSECL"
    },
    {
     "category": "ELECTRICITY",
     "name": "UttarGujarat Vij Company Ltd",
     "code": "UGVCL"
    },
    {
     "category": "ELECTRICITY",
     "name": "Uttar Haryana Bijli Vitran Nigam",
     "code": "UHBVN"
    },
    {
     "category": "ELECTRICITY",
     "name": "Uttarakhand Power Corporation Limited",
     "code": "UPCL"
    },
    {
     "category": "ELECTRICITY",
     "name": "Uttar Pradesh Power Corporation Limited(URBAN)",
     "code": "UPPCL"
    },
    {
     "category": "ELECTRICITY",
     "name": "Uttar Pradesh Power Corporation Limited(RURAL)",
     "code": "UPPCLR"
    },
    {
     "category": "ELECTRICITY",
     "name": "West Bengal State Electricity Distribution Company Limited",
     "code": "WBSEEDCL"
    },
    {
     "category": "ELECTRICITY",
     "name": "Western Electricity supply co. Of orissa ltd.",
     "code": "WESCO"
    }
   ];
   billMitraGasList=[ 
   {
    "category": "GAS",
    "name": "ADANI GAS",
    "code": "GADNI"
   },
   {
    "category": "GAS",
    "name": "Gujarat Gas Company Limited",
    "code": "GGUJCL"
   },
   {
    "category": "GAS",
    "name": "IGL (Indraprasth Gas Limited)",
    "code": "GIGL"
   },
   {
    "category": "GAS",
    "name": "Haryana City Gas",
    "code": "GHYNCG"
   },
   {
    "category": "GAS",
    "name": "Siti Energy",
    "code": "GSITIE"
   },
   {
    "category": "GAS",
    "name": "Tripura Natural Gas Company Ltd",
    "code": "GTNGCL"
   },
   {
    "category": "GAS",
    "name": "Sabarmati Gas Limited (SGL)",
    "code": "GSGL"
   },
   {
    "category": "GAS",
    "name": "Vadodara Gas Limited",
    "code": "GVGL"
   },
   {
    "category": "GAS",
    "name": "Unique Central Piped Gases Pvt Ltd (UCPGPL)",
    "code": "GUCPGL"
   },
   {
    "category": "GAS",
    "name": "Mahanagar Gas Limited",
    "code": "GMHNGL"
   },
   {
    "category": "GAS",
    "name": "Unique Central Piped Gases Pvt Ltd (UCPGPL)",
    "code": "GUCPGL"
   },]
   billMitraWaterList=[ {
    "category": "WATER",
    "name": "UIT Bhiwadi-Retail",
    "code": "WUITB"
   },
   {
    "category": "WATER",
    "name": "Uttarakhand Jal Sansthan(B2B)-Retail",
    "code": "WUTKJS"
   },
   {
    "category": "WATER",
    "name": "Delhi Jal Board-Retail",
    "code": "WDLHJB"
   },
   {
    "category": "WATER",
    "name": "Municipal Corporation of Gurugram-Retail",
    "code": "WMCGRGM"
   }]
  fintechlicList = [
    {
      "code": "155",
      "name": "LIC",
      "category": "LIC"
  },
  ];
  idicorelicList = [
    {
      "code": "LICI",
      "name": "Life Insurance Corporation of INDIA",
      "category": "LIC"
  },
  ];
  emiMobikwikList=[
   {
       "code": "158",
       "name": "Bajaj Finserv",
       "category": "EMI"
   },
   {
       "code": "297",
       "name": "Flexsalary",
       "category": "EMI"
   },
   {
       "code": "299",
       "name": "L and T Financial Services",
       "category": "EMI"
   },
   {
       "code": "300",
       "name": "Loksuvidha",
       "category": "EMI"
   },
   {
       "code": "301",
       "name": "Motilal Oswal Home Finance",
       "category": "EMI"
   },
   {
       "code": "302",
       "name": "Paisa Dukan-Borrower EMI",
       "category": "EMI"
   },
   {
       "code": "303",
       "name": "Snapmint",
       "category": "EMI"
   },
   {
       "code": "304",
       "name": "Tata Capital Financial Services Limited",
       "category": "EMI"
   },
   {
       "code": "306",
       "name": "Religare Health Insurance Co Ltd.",
       "category": "EMI"
   },
   {
       "code": "307",
       "name": "Aditya Birla Housing Finance Limited",
       "category": "EMI"
   },
   {
       "code": "308",
       "name": "Shriram City Union Finance Ltd",
       "category": "EMI"
   },
   {
       "code": "309",
       "name": "Indiabulls Consumer Finance Limited",
       "category": "EMI"
   },
   {
       "code": "310",
       "name": "L and T Housing Finance",
       "category": "EMI"
   },
   {
       "code": "317",
       "name": "AAVAS FINANCIERS LIMITED",
       "category": "EMI"
   },
   {
       "code": "318",
       "name": "Indiabulls Housing Finance Limited",
       "category": "EMI"
   },
   {
       "code": "320",
       "name": "Avail",
       "category": "EMI"
   },
   {
       "code": "321",
       "name": "Clix",
       "category": "EMI"
   },
   {
       "code": "322",
       "name": "Varthana",
       "category": "EMI"
   },
   {
       "code": "324",
       "name": "Ess Kay Fincorp Limited (Sk Finance)",
       "category": "EMI"
   },
   {
       "code": "325",
       "name": "Faircent",
       "category": "EMI"
   },
   {
       "code": "326",
       "name": "i2iFunding",
       "category": "EMI"
   },
   {
       "code": "327",
       "name": "Capri Global Capital Limited",
       "category": "EMI"
   },
   {
       "code": "331",
       "name": "Manappuram Finance Limited-Vehicle Loan",
       "category": "EMI"
   },
   {
       "code": "344",
       "name": "Capri Global Housing Finance",
       "category": "EMI"
   },
   {
       "code": "387",
       "name": "Arohan Financial Services Ltd",
       "category": "EMI"
   },
   {
       "code": "390",
       "name": "Jana Small Finance Bank",
       "category": "EMI"
   },
   {
       "code": "391",
       "name": "LOANTAP CREDIT PRODUCTS PRIVATE LIMITED",
       "category": "EMI"
   },
   {
       "code": "392",
       "name": "Shriram Housing Finance Limited",
       "category": "EMI"
   },
   {
       "code": "393",
       "name": "Kissht",
       "category": "EMI"
   },
   {
       "code": "406",
       "name": "ICICI Bank Ltd - Loans",
       "category": "EMI"
   },
   {
       "code": "407",
       "name": "Kinara Capital",
       "category": "EMI"
   },
   {
       "code": "419",
       "name": "BERAR Finance Limited",
       "category": "EMI"
   },
   {
       "code": "420",
       "name": "Avanse Financial Services Ltd",
       "category": "EMI"
   },
   {
       "code": "421",
       "name": "Baid Leasing and Finance",
       "category": "EMI"
   },
   {
       "code": "422",
       "name": "OHMYLOAN",
       "category": "EMI"
   },
   {
       "code": "423",
       "name": "OMLP2P.COM",
       "category": "EMI"
   },
   {
       "code": "424",
       "name": "Annapurna Finance Private Limited-MSME",
       "category": "EMI"
   },
   {
       "code": "425",
       "name": "Home Credit India Finance Pvt. Ltd",
       "category": "EMI"
   },
   {
       "code": "426",
       "name": "India Shelter Finance Corporation Limited",
       "category": "EMI"
   },
   {
       "code": "427",
       "name": "Kanakadurga Finance Limited",
       "category": "EMI"
   },
   {
       "code": "428",
       "name": "Mahindra Rural Housing Finance",
       "category": "EMI"
   },
   {
       "code": "430",
       "name": "Fincare Small Finance Bank",
       "category": "EMI"
   },
   {
       "code": "440",
       "name": "Maxvalue Credits And Investments Ltd",
       "category": "EMI"
   },
   {
       "code": "441",
       "name": "Svatantra Microfin Private Limited",
       "category": "EMI"
   },
   {
       "code": "442",
       "name": "Altum Credo Home Finance",
       "category": "EMI"
   },
   {
       "code": "443",
       "name": "INDUSIND BANK - CFD",
       "category": "EMI"
   },
   {
       "code": "444",
       "name": "FlexiLoans",
       "category": "EMI"
   },
   {
       "code": "445",
       "name": "Credit Wise Capital",
       "category": "EMI"
   },
   {
       "code": "447",
       "name": "Chaitanya India Fin Credit Pvt Ltd",
       "category": "EMI"
   },
   {
       "code": "448",
       "name": "Digamber Capfin Limited",
       "category": "EMI"
   },
   {
       "code": "449",
       "name": "Midland Microfin Ltd",
       "category": "EMI"
   },
   {
       "code": "457",
       "name": "Ascend Capital",
       "category": "EMI"
   },
   {
       "code": "458",
       "name": "Nidhilakshmi Finance",
       "category": "EMI"
   },
   {
       "code": "459",
       "name": "NM Finance",
       "category": "EMI"
   },
   {
       "code": "460",
       "name": "Oroboro",
       "category": "EMI"
   },
   {
       "code": "461",
       "name": "India Home Loan Limited",
       "category": "EMI"
   },
   {
       "code": "462",
       "name": "DCB Bank Loan Repayment",
       "category": "EMI"
   },
   {
       "code": "463",
       "name": "Eduvanz Financing Pvt. Ltd.",
       "category": "EMI"
   },
   {
       "code": "464",
       "name": "Mintifi Finserve Private Limited",
       "category": "EMI"
   },
   {
       "code": "471",
       "name": "Hiranandani Financial Services Pvt  Ltd",
       "category": "EMI"
   },
   {
       "code": "472",
       "name": "Home First Finance Company India Limited",
       "category": "EMI"
   },
   {
       "code": "473",
       "name": "Ujjivan Small Finance Bank",
       "category": "EMI"
   },
   {
       "code": "474",
       "name": "Light Microfinance Private Limited",
       "category": "EMI"
   },
   {
       "code": "475",
       "name": "IIFL Finance Limited",
       "category": "EMI"
   },
   {
       "code": "476",
       "name": "IIFL Home Finance",
       "category": "EMI"
   },
   {
       "code": "479",
       "name": "TVS Credit",
       "category": "EMI"
   },
   {
       "code": "480",
       "name": "CreditAccess Grameen - Microfinance",
       "category": "EMI"
   },
   {
       "code": "481",
       "name": "CreditAccess Grameen - Retail Finance",
       "category": "EMI"
   },
   {
       "code": "482",
       "name": "Khush Housing Finance Pvt Ltd",
       "category": "EMI"
   },
   {
       "code": "487",
       "name": "Adani Housing Finance",
       "category": "EMI"
   },
   {
       "code": "488",
       "name": "Janakalyan Financial Services Private Limited",
       "category": "EMI"
   },
   {
       "code": "489",
       "name": "Muthoot Fincorp Ltd",
       "category": "EMI"
   },
   {
       "code": "491",
       "name": "Agora Microfinance India Ltd - AMIL",
       "category": "EMI"
   },
   {
       "code": "493",
       "name": "Jain Motor Finmart",
       "category": "EMI"
   },
   {
       "code": "494",
       "name": "Bharat Financial Inclusion Ltd",
       "category": "EMI"
   },
   {
       "code": "495",
       "name": "StashFin",
       "category": "EMI"
   },
   {
       "code": "496",
       "name": "Pooja Finelease",
       "category": "EMI"
   },
   {
       "code": "497",
       "name": "Mahaveer Finance India Limited",
       "category": "EMI"
   },
   {
       "code": "498",
       "name": "Nagar Nigam Aligarh- muncipality",
       "category": "EMI"
   },
   {
       "code": "500",
       "name": "Vistaar Financial services Private Limited" ,
       "category": "EMI"
   },
   {
       "code": "501",
       "name": "Axis Bank Limited-Microfinance",
       "category": "EMI"
   },
   {
       "code": "507",
       "name": "Kotak Mahindra Prime Limited",
       "category": "EMI"
   },
   {
       "code": "508",
       "name": "Mahindra and Mahindra Financial Services Limited",
       "category": "EMI"
   },
   {
       "code": "510",
       "name": "Dvara Kshetriya Gramin Financials Private Limited",
       "category": "EMI"
   },
   {
       "code": "511",
       "name": "Muthoot Finance",
       "category": "EMI"
   },
   {
       "code": "512",
       "name": "John Deere Financial India Private Limited",
       "category": "EMI"
   },
   {
       "code": "515",
       "name": "Tata Capital Housing Finance Limited",
       "category": "EMI"
   },
   {
       "code": "516",
       "name": "SMEcorner",
       "category": "EMI"
   },
   {
       "code": "518",
       "name": "Netafim Agricultural Financing Agency Pvt. Ltd.",
       "category": "EMI"
   },
   {
       "code": "520",
       "name": "Kotak Mahindra Bank Ltd.-Loans",
       "category": "EMI"
   },
   {
       "code": "521",
       "name": "Samasta Microfinance Limited",
       "category": "EMI"
   },
   {
       "code": "527",
       "name": "HDB Financial Services Limited",
       "category": "EMI"
   },
   {
       "code": "528",
       "name": "Novelty Finance Ltd",
       "category": "EMI"
   },
   {
       "code": "529",
       "name": "Aptus Value Housing Finance India Limited",
       "category": "EMI"
   },
   {
       "code": "530",
       "name": "Aptus Finance India Private Limited",
       "category": "EMI"
   },
   {
       "code": "531",
       "name": "Mitron Capital",
       "category": "EMI"
   },
   {
       "code": "532",
       "name": "Thazhayil Nidhi Ltd",
       "category": "EMI"
   },
   {
       "code": "533",
       "name": "X10 Financial Services Limited",
       "category": "EMI"
   },
   {
       "code": "534",
       "name": "Muthoot Housing Finance Company Limited",
       "category": "EMI"
   },
   {
       "code": "535",
       "name": "Gujarat State Petronet Limited",
       "category": "EMI"
   },
   {
       "code": "541",
       "name": "ESAF Small Finance Bank (Micro Loans)",
       "category": "EMI"
   },
   {
       "code": "542",
       "name": "Yogakshemam Loans Ltd",
       "category": "EMI"
   },
   {
       "code": "545",
       "name": "Rander Peoples Co Operative Bank Ltd",
       "category": "EMI"
   },
   {
       "code": "553",
       "name": "Annapurna Finance Private Limited-MFI",
       "category": "EMI"
   },
   {
       "code": "554",
       "name": "Axis Bank Limited - Retail Loan",
       "category": "EMI"
   },
   {
       "code": "555",
       "name": "Fullerton India Housing Finance Limited",
       "category": "EMI"
   },
   {
       "code": "556",
       "name": "Fullerton India credit company limited",
       "category": "EMI"
   },
   {
       "code": "557",
       "name": "G U Financial Services Pvt Ltd",
       "category": "EMI"
   },
   {
       "code": "558",
       "name": "InCred",
       "category": "EMI"
   },
   {
       "code": "559",
       "name": "MoneyTap",
       "category": "EMI"
   },
   {
       "code": "560",
       "name": "Muthoot Capital Services Ltd",
       "category": "EMI"
   },
   {
       "code": "561",
       "name": "Ayaan Finserve India Private LTD",
       "category": "EMI"
   },
   {
       "code": "562",
       "name": "Sarvjan India Fintech Private Limited",
       "category": "EMI"
   },
   {
       "code": "568",
       "name": "Aadhar Housing Finance Limited",
       "category": "EMI"
   },
   {
       "code": "569",
       "name": "IDF Financial Services Private Limited",
       "category": "EMI"
   },
   {
       "code": "570",
       "name": "Bajaj Housing Finance Limited",
       "category": "EMI"
   },
   {
       "code": "572",
       "name": "Centrum Microcredit Limited",
       "category": "EMI"
   },
   {
       "code": "574",
       "name": "Ziploan",
       "category": "EMI"
   },
   {
       "code": "575",
       "name": "Equitas SFB – Microfinance Loan",
       "category": "EMI"
   },
   {
       "code": "576",
       "name": "Indostar Capital Finance Limited - CV",
       "category": "EMI"
   },
   {
       "code": "579",
       "name": "RMK Fincorp Pvt Ltd",
       "category": "EMI"
   },
   {
       "code": "584",
       "name": "Smile Microfinance Limited",
       "category": "EMI"
   },
   {
       "code": "586",
       "name": "Belstar Microfinance Limited",
       "category": "EMI"
   },
   {
       "code": "587",
       "name": "Tata Motors Finance Limited",
       "category": "EMI"
   },
   {
       "code": "398",
       "name": "RupeeRedee",
       "category": "EMI"
   },
   {
       "code": "374",
       "name": "Muthoot Microfin Limited",
       "category": "EMI"
   },
   {
       "code": "375",
       "name": "Shriram Transport Finance Company Limited",
       "category": "EMI"
   },
   {
       "code": "376",
       "name": "Easy Home Finance Limited",
       "category": "EMI"
   },
   {
       "code": "377",
       "name": "Axis Finance Limited",
       "category": "EMI"
   },
   {
       "code": "378",
       "name": "Jain Autofin",
       "category": "EMI"
   },
   {
       "code": "379",
       "name": "Cars24 Financial Services Private Limited",
       "category": "EMI"
   },
   {
       "code": "383",
       "name": "Oxyzo Financial Services Pvt Ltd",
       "category": "EMI"
   },
   {
       "code": "384",
       "name": "Toyota Financial Services",
       "category": "EMI"
   },
   {
       "code": "385",
       "name": "AU Bank Loan Repayment",
       "category": "EMI"
   },
   {
       "code": "625",
       "name": "Aye Finance Pvt. Ltd.",
       "category": "EMI"
   },
   {
       "code": "626",
       "name": "Criss Financial Holdings Ltd",
       "category": "EMI"
   },
   {
       "code": "628",
       "name": "Spandana Sphoorty Financial Ltd",
       "category": "EMI"
   },
   {
       "code": "591",
       "name": "LIC Housing Finance Limited",
       "category": "EMI"
   },
   {
       "code": "635",
       "name": "Shubham Housing Development Finance Company Ltd",
       "category": "EMI"
   },
   {
       "code": "614",
       "name": "Diwakar Tracom Private Limited",
       "category": "EMI"
   },
   {
       "code": "615",
       "name": "Hindon Mercantile Limited - Mufin",
       "category": "EMI"
   },
   {
       "code": "616",
       "name": "Indostar Home Finance Private Limited",
       "category": "EMI"
   },
   {
       "code": "618",
       "name": "Muthoot Money",
       "category": "EMI"
   },
   {
       "code": "631",
       "name": "Indostar Capital Finance Limited - SME",
       "category": "EMI"
   },
   {
       "code": "645",
       "name": "DCBS Loan",
       "category": "EMI"
   },
   {
       "code": "646",
       "name": "Reliance ARC",
       "category": "EMI"
   },
   {
       "code": "649",
       "name": "Finova Capital Private Ltd",
       "category": "EMI"
   },
   {
       "code": "617",
       "name": "Loan2Wheels",
       "category": "EMI"
   },
   {
       "code": "651",
       "name": "Care India Finvest Limited",
       "category": "EMI"
   },
   {
       "code": "652",
       "name": "Electronica Finance Limited",
       "category": "EMI"
   },
   {
       "code": "653",
       "name": "Muthoot Homefin Limited",
       "category": "EMI"
   },
   {
       "code": "654",
       "name": "Spandana Rural And Urban Development Organisation",
       "category": "EMI"
   },
   {
       "code": "655",
       "name": "Suryoday Small Finance Bank",
       "category": "EMI"
   },
   {
       "code": "658",
       "name": "Moneywise Financial Services Private Limited",
       "category": "EMI"
   },
   {
       "code": "661",
       "name": "APAC Financial Services Pvt Ltd",
       "category": "EMI"
   },
   {
       "code": "662",
       "name": "NABFINS",
       "category": "EMI"
   },
   {
       "code": "663",
       "name": "Ekagrata Finance",
       "category": "EMI"
   },
   {
       "code": "667",
       "name": "ICICI BANK - Interest Repayment Loans",
       "category": "EMI"
   },
   {
       "code": "671",
       "name": "Bussan Auto Finance India Pvt Ltd",
       "category": "EMI"
   },
   {
       "code": "679",
       "name": "Fortune Credit Capital Limited",
       "category": "EMI"
   },
   {
       "code": "680",
       "name": "CNH Industrial Capital Pvt. Ltd.",
       "category": "EMI"
   },
   {
       "code": "681",
       "name": "Dev Finance",
       "category": "EMI"
   },
   {
       "code": "682",
       "name": "Muthoot Finance-Personal Loan",
       "category": "EMI"
   },
   {
       "code": "683",
       "name": "Shine Blue Hire Purchase Ltd.",
       "category": "EMI"
   },
   {
       "code": "691",
       "name": "STREE NIDHI - TELANGANA",
       "category": "EMI"
   },
   {
       "code": "692",
       "name": "Kanakadurga Finance Limited - Gold Loans",
       "category": "EMI"
   },
   {
    "code": "209",
    "name": "Aditya Birla Finance ltd. (ABFL)",
    "category": "EMI"
   },
   {
    "code": "210",
    "name": "BajajAutoFinanceLtd",
    "category": "EMI"
   },
   {
    "code": "233",
    "name": "DMI FInance",
    "category": "EMI"
   },
   {
    "code": "261",
    "name": "IDFC FIRST Bank",
    "category": "EMI"
   },
   {
    "code": "267",
    "name": "Hero FinCorp Ltd",
    "category": "EMI"
   },
   {
    "code": "640",
    "name": "Money View ",
    "category": "EMI"
   },
   {
    "code": "641",
    "name": "Kredit Bee",
    "category": "EMI"
   }
      
  ];
  fastagMobikwikList=[
        {
            "code": "294",
            "name": "Indian Highways Management Company Ltd-Indusind FASTag",
            "category": "Fastag"
        },
        {
            "code": "294",
            "name": "Indusind Bank",
            "category": "Fastag"
        },
        {
            "code": "294",
            "name": "Bank Of Baroda",
            "category": "Fastag"
        },
        {
            "code": "294",
            "name": "ICICI Bank",
            "category": "Fastag"
        },
        {
            "code": "294",
            "name": "HDFC Bank",
            "category": "Fastag"
        },
        {
            "code": "294",
            "name": "Airtel Payments Bank NETC FASTag",
            "category": "Fastag"
        },
        {
            "code": "294",
            "name": "IDFC FIRST Bank - FasTag",
            "category": "Fastag"
        },
        {
            "code": "294",
            "name": "Axis Bank",
            "category": "Fastag"
        },
        {
            "code": "294",
            "name": "Kotak Mahindra Bank",
            "category": "Fastag"
        },
        {
            "code": "294",
            "name": "Equitas FASTag Recharge",
            "category": "Fastag"
        },
        {
            "code": "294",
            "name": "Paytm Payments Bank FASTag",
            "category": "Fastag"
        },
        {
            "code": "294",
            "name": "Paul Merchants",
            "category": "Fastag"
        },
        {
            "code": "294",
            "name": "Jammu and Kashmir Bank Fastag",
            "category": "Fastag"
        },
        {
            "code": "294",
            "name": "Federal Bank - FASTag",
            "category": "Fastag"
        },
        {
            "code": "294",
            "name": "IDBI Bank FASTag",
            "category": "Fastag"
        },
        {
            "code": "294",
            "name": "UCO Bank FASTag",
            "category": "Fastag"
        },
        {
            "code": "294",
            "name": "Transaction Analyst FASTag",
            "category": "Fastag"
        },
        {
            "code": "294",
            "name": "IOB FASTag",
            "category": "Fastag"
        },
        {
            "code": "294",
            "name": "Transcorp International Limited",
            "category": "Fastag"
        },
        {
            "code": "294",
            "name": "Karnataka Bank Fastag",
            "category": "Fastag"
        }
        
  ];
  lpgGassMobikwikList=[
    {
        "code": "293",
        "name": "Indane Gas (Indian Oil)",
        "category": "LPG"
    },
    {
        "code": "288",
        "name": "Bharat Petroleum Corporation Limited (BPCL)",
        "category": "LPG"
    }
  ];
  providers=[
    {
     "code": "16",
     "category": "BROADBAND",
     "name": "TIKONA Broadband"
    },
    {
     "code": "178",
     "category": "BROADBAND",
     "name": "Connect Broadband-Online"
    },
    {
     "code": "179",
     "category": "BROADBAND",
     "name": "Hathway Broadband - Retail"
    },
    {
     "code": "180",
     "category": "BROADBAND",
     "name": "Hathway Broadband - Online"
    },
    {
     "code": "240",
     "category": "BROADBAND",
     "name": "Renewal Premium\/ Revival"
    },
    {
     "code": "26",
     "category": "BROADBAND",
     "name": "Connect Broadband-Retail"
    },
    {
     "code": "170",
     "category": "DATACARD",
     "name": "RELIANCE"
    },
    {
     "code": "171",
     "category": "DATACARD",
     "name": "TATA DOCOMO\/TATA PHOTON"
    },
    {
     "code": "172",
     "category": "DATACARD",
     "name": "TATA INDICOM"
    },
    {
     "code": "173",
     "category": "DATACARD",
     "name": "AIRTEL Datacard"
    },
    {
     "code": "174",
     "category": "DATACARD",
     "name": "AIRCEL"
    },
    {
     "code": "175",
     "category": "DATACARD",
     "name": "IDEA"
    },
    {
     "code": "176",
     "category": "DATACARD",
     "name": "BSNL"
    },
    {
     "code": "177",
     "category": "DATACARD",
     "name": "VODAFONE"
    },
    {
     "code": "181",
     "category": "DATACARD",
     "name": "MTS"
    },
    {
     "code": "18",
     "category": "DTH",
     "name": "AIRTEL DIGITAL TV"
    },
    {
     "code": "19",
     "category": "DTH",
     "name": "DISH TV"
    },
    {
     "code": "21",
     "category": "DTH",
     "name": "SUN DIRECT"
    },
    {
     "code": "22",
     "category": "DTH",
     "name": "TATA SKY"
    },
    {
     "code": "23",
     "category": "DTH",
     "name": "VIDEOCON D2H"
    },
    {
     "code": "182",
     "category": "ELECTRICITY",
     "name": "Assam Power Distribution Company Ltd (APDCL)-NON RAPDR"
    },
    {
     "code": "183",
     "category": "ELECTRICITY",
     "name": "Chamundeshwari Electricity Supply Corporation Limited (CESCOM)"
    },
    {
     "code": "184",
     "category": "ELECTRICITY",
     "name": "Jharkhand Bijli Vitran Nigam Limited (JBVNL)"
    },
    {
     "code": "185",
     "category": "ELECTRICITY",
     "name": "Adani Electricity Mumbai Limited"
    },
    {
     "code": "187",
     "category": "ELECTRICITY",
     "name": "Torrent Power (Agra)"
    },
    {
     "code": "188",
     "category": "ELECTRICITY",
     "name": "Torrent Power (Ahmedabad)"
    },
    {
     "code": "189",
     "category": "ELECTRICITY",
     "name": "Tamil Nadu Electricity Board (TNEB)"
    },
    {
     "code": "190",
     "category": "ELECTRICITY",
     "name": "TP Ajmer Distribution Ltd (TPADL)"
    },
    {
     "code": "191",
     "category": "ELECTRICITY",
     "name": "West Bengal State Electricity Distribution Co. Ltd. (WBSEDCL)"
    },
    {
     "code": "192",
     "category": "ELECTRICITY",
     "name": "Madhya Pradesh Madhya Kshetra Vidyut Vitaran Company Limited(URBAN)"
    },
    {
     "code": "203",
     "category": "ELECTRICITY",
     "name": "Madhya Pradesh Madhya Kshetra Vidyut Vitaran Company Limited(RURAL)"
    },
    {
     "code": "204",
     "category": "ELECTRICITY",
     "name": "Maharashtra State Electricity Distribution Company Ltd (MSEDCL)\/Mahavitran"
    },
    {
     "code": "205",
     "category": "ELECTRICITY",
     "name": "Department of Power Nagaland"
    },
    {
     "code": "206",
     "category": "ELECTRICITY",
     "name": "Sikkim Power - URBAN"
    },
    {
     "code": "208",
     "category": "ELECTRICITY",
     "name": "Goa Electricity Department"
    },
    {
     "code": "209",
     "category": "ELECTRICITY",
     "name": "Kanpur Electricity Supply Company Ltd."
    },
    {
     "code": "210",
     "category": "ELECTRICITY",
     "name": "Kerala State Electricity Board Ltd. (KSEBL)"
    },
    {
     "code": "227",
     "category": "ELECTRICITY",
     "name": "Himachal Pradesh State Electricity Board"
    },
    {
     "code": "228",
     "category": "ELECTRICITY",
     "name": "Torrent Power (Bhiwandi)"
    },
    {
     "code": "229",
     "category": "ELECTRICITY",
     "name": "Power And Electricity Department - MIZORAM"
    },
    {
     "code": "230",
     "category": "ELECTRICITY",
     "name": "New Delhi Municipal Council (NDMC)"
    },
    {
     "code": "231",
     "category": "ELECTRICITY",
     "name": "Central Electricity Supply Utility of Orissa Limited (CESU)"
    },
    {
     "code": "232",
     "category": "ELECTRICITY",
     "name": "Jaipur Vidhyut Vitran Nigam Limited (JVVNL)"
    },
    {
     "code": "234",
     "category": "ELECTRICITY",
     "name": "Western Electricity Supply Company of Odisha (WESCO)"
    },
    {
     "code": "235",
     "category": "ELECTRICITY",
     "name": "Madhya Pradesh Poorv Kshetra Vidyut Vitran Company Limited (MPPKVVCL URBAN) - Jabalpur"
    },
    {
     "code": "237",
     "category": "ELECTRICITY",
     "name": "Torrent Power (Surat)"
    },
    {
     "code": "280",
     "category": "ELECTRICITY",
     "name": "Telangana southern power"
    },
    {
     "code": "281",
     "category": "ELECTRICITY",
     "name": "Telangana northern power"
    },
    {
     "code": "29",
     "category": "ELECTRICITY",
     "name": "Ajmer Vidyut Vitran Nigam Ltd. (AVVNL)"
    },
    {
     "code": "30",
     "category": "ELECTRICITY",
     "name": "Assam Power Distribution Company Ltd (APDCL)- RAPDR"
    },
    {
     "code": "31",
     "category": "ELECTRICITY",
     "name": "Bangalore Electricity Supply Company Ltd. (BESCOM)"
    },
    {
     "code": "33",
     "category": "ELECTRICITY",
     "name": "Bharatpur Electricity Services Ltd. (BESL)"
    },
    {
     "code": "34",
     "category": "ELECTRICITY",
     "name": "Bikaner Electricity Supply Limited (BKESL)"
    },
    {
     "code": "35",
     "category": "ELECTRICITY",
     "name": "Brihan Mumbai Electric Supply and Transport Undertaking (BEST)"
    },
    {
     "code": "36",
     "category": "ELECTRICITY",
     "name": "BSES Rajdhani Power Limited"
    },
    {
     "code": "51",
     "category": "ELECTRICITY",
     "name": "BSES Yamuna Power Limited"
    },
    {
     "code": "52",
     "category": "ELECTRICITY",
     "name": "Calcutta Electricity Supply Ltd (CESC LTD)"
    },
    {
     "code": "53",
     "category": "ELECTRICITY",
     "name": "Chhattisgarh State Power Distribution Company Ltd."
    },
    {
     "code": "54",
     "category": "ELECTRICITY",
     "name": "Dakshin Gujarat Vij Company Limited (DGVCL)"
    },
    {
     "code": "55",
     "category": "ELECTRICITY",
     "name": "Dakshin Haryana Bijli Vitran Nigam Limited (DHBVNL)"
    },
    {
     "code": "56",
     "category": "ELECTRICITY",
     "name": "Daman and Diu Electricity"
    },
    {
     "code": "57",
     "category": "ELECTRICITY",
     "name": "DNH Power Distribution Company Limited"
    },
    {
     "code": "58",
     "category": "ELECTRICITY",
     "name": "Eastern Power Distribution Co. Ltd (APEPDCL)"
    },
    {
     "code": "59",
     "category": "ELECTRICITY",
     "name": "Gulbarga Electricity Supply Company Limited (GESCOM)"
    },
    {
     "code": "60",
     "category": "ELECTRICITY",
     "name": "Hubli Electricity Supply Company Ltd. (HESCOM)"
    },
    {
     "code": "64",
     "category": "ELECTRICITY",
     "name": "JUSCO - JAMSHEDPUR"
    },
    {
     "code": "65",
     "category": "ELECTRICITY",
     "name": "Jodhpur Vidyut Vitran Nigam Ltd. (JDVVNL)"
    },
    {
     "code": "67",
     "category": "ELECTRICITY",
     "name": "Kota Electricity Distribution Ltd. (KEDL)"
    },
    {
     "code": "68",
     "category": "ELECTRICITY",
     "name": "Madhya Gujarat Vij Company Limited (MGVCL)"
    },
    {
     "code": "69",
     "category": "ELECTRICITY",
     "name": "Madhya Pradesh Paschim Kshetra Vidyut Vitran Company Ltd. (Indore) - NONRAPDR"
    },
    {
     "code": "70",
     "category": "ELECTRICITY",
     "name": "Mangalore Electricity Supply Company Ltd. (MESCOM)"
    },
    {
     "code": "72",
     "category": "ELECTRICITY",
     "name": "Meghalaya Power Distribution Corporati on Ltd"
    },
    {
     "code": "73",
     "category": "ELECTRICITY",
     "name": "Madhya Pradesh Madhya Kshetra Vidhyut Vitram Company Limited - Bhopal"
    },
    {
     "code": "74",
     "category": "ELECTRICITY",
     "name": "Madhya Pradesh Poorv Kshetra Vidyut Vitran Company Limited (MPPKVVCL RURAL) - Jabalpur"
    },
    {
     "code": "77",
     "category": "ELECTRICITY",
     "name": "Noida Power Company Limited (NPCL)"
    },
    {
     "code": "78",
     "category": "ELECTRICITY",
     "name": "North Bihar Power Distribution Company Ltd. (NBPDCL)"
    },
    {
     "code": "79",
     "category": "ELECTRICITY",
     "name": "Tata Power - Delhi \/ North Delhi Power Limited (NDPL)"
    },
    {
     "code": "80",
     "category": "ELECTRICITY",
     "name": "North Eastern Electricity Supply Company of Odisha Limited (NESCO)"
    },
    {
     "code": "83",
     "category": "ELECTRICITY",
     "name": "Paschim Gujarat Vij Company Limited (PGVCL)"
    },
    {
     "code": "84",
     "category": "ELECTRICITY",
     "name": "Punjab State Power Corporation Limited (PSPCL)"
    },
    {
     "code": "87",
     "category": "ELECTRICITY",
     "name": "SNDL Nagpur"
    },
    {
     "code": "88",
     "category": "ELECTRICITY",
     "name": "Southern Bihar Power Distribution Company Ltd. (SBPDCL)"
    },
    {
     "code": "89",
     "category": "ELECTRICITY",
     "name": "Southern Electricity Supply Company Of Odisha Limited (SOUTHCO)"
    },
    {
     "code": "90",
     "category": "ELECTRICITY",
     "name": "Southern Power Distribution Co. Ltd (APSPDCL)"
    },
    {
     "code": "91",
     "category": "ELECTRICITY",
     "name": "Tata Power - Mumbai"
    },
    {
     "code": "94",
     "category": "ELECTRICITY",
     "name": "Tripura State Electricity Corporation Ltd"
    },
    {
     "code": "95",
     "category": "ELECTRICITY",
     "name": "Uttar Gujarat Vij Company Limited (UGVCL)"
    },
    {
     "code": "96",
     "category": "ELECTRICITY",
     "name": "Uttar Haryana Bijli Vitran Nigam Limited (UHBVNL)"
    },
    {
     "code": "97",
     "category": "ELECTRICITY",
     "name": "Uttar Pradesh Power Corp Ltd (UPPCL) - RURAL"
    },
    {
     "code": "98",
     "category": "ELECTRICITY",
     "name": "Uttar Pradesh Power Corporation Ltd. (UPPCL) - URBAN"
    },
    {
     "code": "99",
     "category": "ELECTRICITY",
     "name": "Uttarakhand Power Corporation Limited"
    },
    {
     "code": "245",
     "category": "Emi",
     "name": "Home Credit"
    },
    {
     "code": "253",
     "category": "Emi",
     "name": "Loan Tap"
    },
    {
     "code": "254",
     "category": "Emi",
     "name": "Shriram City Union Finance Limited"
    },
    {
     "code": "255",
     "category": "Emi",
     "name": "DMI Finance"
    },
    {
     "code": "256",
     "category": "Emi",
     "name": "Indiabulls Consumer Finance Limited"
    },
    {
     "code": "257",
     "category": "Emi",
     "name": "Tata Capital"
    },
    {
     "code": "258",
     "category": "Emi",
     "name": "Faircent"
    },
    {
     "code": "259",
     "category": "Emi",
     "name": "Capri Global Capital Limited"
    },
    {
     "code": "260",
     "category": "Emi",
     "name": "Capri Global Housing Finance"
    },
    {
     "code": "261",
     "category": "Emi",
     "name": "Bajaj Auto Finance"
    },
    {
     "code": "262",
     "category": "Emi",
     "name": "Snapmint"
    },
    {
     "code": "263",
     "category": "Emi",
     "name": "Aditya Birla Housing Finance Limited"
    },
    {
     "code": "264",
     "category": "Emi",
     "name": "L&T Housing Finance"
    },
    {
     "code": "265",
     "category": "Emi",
     "name": "L&T Finance Limited"
    },
    {
     "code": "266",
     "category": "Emi",
     "name": "Aspire Home Finance"
    },
    {
     "code": "267",
     "category": "Emi",
     "name": "ESS KAY FINCORP"
    },
    {
     "code": "268",
     "category": "Emi",
     "name": "Zest Money"
    },
    {
     "code": "269",
     "category": "Emi",
     "name": "Indiabulls Housing Finance"
    },
    {
     "code": "270",
     "category": "Emi",
     "name": "IDFC First Bank Limited"
    },
    {
     "code": "271",
     "category": "Emi",
     "name": "Hero FinCorp"
    },
    {
     "code": "272",
     "category": "Emi",
     "name": "Aavas Financiers"
    },
    {
     "code": "273",
     "category": "Emi",
     "name": "Arohan Financial Services Limited"
    },
    {
     "code": "274",
     "category": "Emi",
     "name": "I2I funding"
    },
    {
     "code": "275",
     "category": "Emi",
     "name": "LokSuvidha"
    },
    {
     "code": "276",
     "category": "Emi",
     "name": "Flex Salary"
    },
    {
     "code": "277",
     "category": "Emi",
     "name": "Paisa Dukan"
    },
    {
     "code": "278",
     "category": "Emi",
     "name": "Varthana"
    },
    {
     "code": "279",
     "category": "Emi",
     "name": "Jana Small Finance Bank"
    },
    {
     "code": "246",
     "category": "Fast Tag",
     "name": "Bank of Baroda"
    },
    {
     "code": "247",
     "category": "Fast Tag",
     "name": "IndusInd Bank"
    },
    {
     "code": "248",
     "category": "Fast Tag",
     "name": "Indian Highways Management Company"
    },
    {
     "code": "249",
     "category": "Fast Tag",
     "name": "Axis Bank"
    },
    {
     "code": "250",
     "category": "Fast Tag",
     "name": "IDFC First Bank"
    },
    {
     "code": "251",
     "category": "Fast Tag",
     "name": "HDFC Bank"
    },
    {
     "code": "252",
     "category": "Fast Tag",
     "name": "Kotak Mahindra Bank"
    },
    {
     "code": "103",
     "category": "GAS",
     "name": "ADANI GAS"
    },
    {
     "code": "104",
     "category": "GAS",
     "name": "Gujarat Gas company Limited"
    },
    {
     "code": "105",
     "category": "GAS",
     "name": "Haryana City gas"
    },
    {
     "code": "106",
     "category": "GAS",
     "name": "IGL (Indraprasth Gas Limited)"
    },
    {
     "code": "107",
     "category": "GAS",
     "name": "MAHANAGAR GAS LIMITED"
    },
    {
     "code": "108",
     "category": "GAS",
     "name": "Sabarmati Gas Limited (SGL)"
    },
    {
     "code": "109",
     "category": "GAS",
     "name": "Siti Energy"
    },
    {
     "code": "110",
     "category": "GAS",
     "name": "Tripura Natural Gas Company Ltd"
    },
    {
     "code": "117",
     "category": "GAS",
     "name": "Unique Central Piped Gases Pvt Ltd (UCPGPL)"
    },
    {
     "code": "199",
     "category": "GAS",
     "name": "Vadodara Gas Limited"
    },
    {
     "code": "218",
     "category": "GAS",
     "name": "Central UP Gas"
    },
    {
     "code": "219",
     "category": "GAS",
     "name": "Charotar Gas Sahakari Mandali Limited"
    },
    {
     "code": "220",
     "category": "GAS",
     "name": "GAIL Gas Limited"
    },
    {
     "code": "221",
     "category": "GAS",
     "name": "Indian Oil Adani Gas Pvt Ltd"
    },
    {
     "code": "222",
     "category": "GAS",
     "name": "IRM Energy Private Limited"
    },
    {
     "code": "193",
     "category": "LANDLINE",
     "name": "BSNL Landline-Retail"
    },
    {
     "code": "24",
     "category": "LANDLINE",
     "name": "AIRTEL LANDLINE"
    },
    {
     "code": "25",
     "category": "LANDLINE",
     "name": "BSNL Landline-Online"
    },
    {
     "code": "27",
     "category": "LANDLINE",
     "name": "MTNL Delhi Landline-Retail"
    },
    {
     "code": "28",
     "category": "LANDLINE",
     "name": "MTNL Mumbai Landline-Retail"
    },
    {
     "code": "12",
     "category": "POSTPAID",
     "name": "AIRTEL POSTPAID"
    },
    {
     "code": "13",
     "category": "POSTPAID",
     "name": "BSNL POSTPAID"
    },
    {
     "code": "14",
     "category": "POSTPAID",
     "name": "IDEA POSTPAID"
    },
    {
     "code": "17",
     "category": "POSTPAID",
     "name": "VODAFONE POSTPAID"
    },
    {
     "code": "10",
     "category": "PREPAID",
     "name": "RELIANCE JIO"
    },
    {
     "code": "11",
     "category": "PREPAID",
     "name": "VODAFONE"
    },
    {
     "code": "6",
     "category": "PREPAID",
     "name": "AIRTEL"
    },
    {
     "code": "7",
     "category": "PREPAID",
     "name": "BSNL"
    },
    {
     "code": "9",
     "category": "PREPAID",
     "name": "IDEA"
    },
    {
     "code": "165",
     "category": "WATER",
     "name": "Delhi Jal Board-Retail"
    },
    {
     "code": "166",
     "category": "WATER",
     "name": "Municipal Corporation of Gurugram-Retail"
    },
    {
     "code": "167",
     "category": "WATER",
     "name": "UIT Bhiwadi-Retail"
    },
    {
     "code": "168",
     "category": "WATER",
     "name": "Uttarakhand Jal Sansthan(B2B)-Retail"
    },
    {
     "code": "194",
     "category": "WATER",
     "name": "MTNL Delhi Landline-Online"
    },
    {
     "code": "195",
     "category": "WATER",
     "name": "UIT Bhiwadi-Online"
    },
    {
     "code": "196",
     "category": "WATER",
     "name": "Uttarakhand Jal Sansthan(B2C)-Online"
    },
    {
     "code": "197",
     "category": "WATER",
     "name": "Delhi Jal Board-Online"
    },
    {
     "code": "198",
     "category": "WATER",
     "name": "Municipal Corporation of Gurugram-Online"
    },
    {
     "code": "212",
     "category": "WATER",
     "name": "Greater Warangal Municipal Corporation - Water"
    },
    {
     "code": "213",
     "category": "WATER",
     "name": "Hyderabad Metropolitan Water Supply and Sewerage Board"
    },
    {
     "code": "214",
     "category": "WATER",
     "name": "Municipal Corporation of Amritsar"
    },
    {
     "code": "215",
     "category": "WATER",
     "name": "Ranchi Municipal Corporation"
    },
    {
     "code": "216",
     "category": "WATER",
     "name": "Silvassa Municipal Council"
    },
    {
     "code": "217",
     "category": "WATER",
     "name": "Ujjain Nagar Nigam - PHED"
    }
   ];
 LivenlpggasList = [
 {
      code: "221",
      name: "INDANE GAS (INDIAN OIL)",
      category: "GAS"
  },
  {
      code: "222",
      name: "HINDUSTAN PETROLEUM CORPORATION LTD (HPCL)",
      category: "GAS"
  },
  {
      code: "223",
      name: "BHARAT PETROLEUM CORPORATION LIMITED (BPCL)",
      category: "GAS"
   }
  ];
  mobiwiklicList = [
    {
      "code": "525",
      "name": "Life Insurance Corporation of INDIA",
      "category": "LIC"
  },
  ];
  participate_type = [
    {
        "code": "ELE",
        "name": "Electricity"
     },
    {
        "code": "WATER",
        "name": "Water"
    },
    {
        "code": "GAS",
        "name": "Gas"        
    },
    {
        "code": "INS",
        "name": "Insurance"        
    },
    {
        "code": "LIC",
        "name": "LIC"        
    },
    {
        "code": "DTH",
        "name": "DTH"       
    },
    {
        "code": "LANDLINE",
        "name": "Landline"       
    },
    {
        "code": "BROAD",
        "name": "Broadband"       
    },
    {
        "code": "LPG",
        "name": "LPG Booking"       
    },
    {
        "code": "FAST",
        "name": "FasTag"       
    },
    {
        "code": "ELECP",
        "name": "Electricity (Part Payment)"       
    }
  ];
  service_Reason = [
    {
      code: '1',
      name: 'Transaction Successful, account not updated'
      },
    {
      code: '2',
      name: 'Amount deducted, biller account credited but transaction ID not received'
      },
    {
      code: '3',
      name: 'Amount deducted, biller account not credited & transaction ID not received'      
    },
    {
      code: '4',
      name: 'Amount deducted multiple times'
      },
    {
      code: '5',
      name: 'Double payment updated'
      },
      {
      code: '6',
      name: 'Erroneously paid in wrong account'
      },
      {
       code: '7',
       name: 'Others provide details in description'
      },

  ];
  aepsState=[
    {
       "stateId":1,
       "state":"Telangana",
       "activeFlag":1,
       "stateCode":"TG"
    },
    {
       "stateId":2,
       "state":"Andhra Pradesh",
       "activeFlag":1,
       "stateCode":"AP"
    },
    {
       "stateId":3,
       "state":"Assam",
       "activeFlag":1,
       "stateCode":"AS"
    },
    {
       "stateId":4,
       "state":"Bihar",
       "activeFlag":1,
       "stateCode":"BR"
    },
    {
       "stateId":5,
       "state":"Chhattisgarh",
       "activeFlag":1,
       "stateCode":"CG"
    },
    {
       "stateId":6,
       "state":"Goa",
       "activeFlag":1,
       "stateCode":"GA"
    },
    {
       "stateId":7,
       "state":"Gujarath",
       "activeFlag":1,
       "stateCode":"GJ"
    },
    {
       "stateId":8,
       "state":"Haryana",
       "activeFlag":1,
       "stateCode":"HR"
    },
    {
       "stateId":9,
       "state":"Himachal Pradesh",
       "activeFlag":1,
       "stateCode":"HP"
    },
    {
       "stateId":10,
       "state":"Jammu and Kashmir",
       "activeFlag":1,
       "stateCode":"JK"
    },
    {
       "stateId":11,
       "state":"Jarkhand",
       "activeFlag":1,
       "stateCode":"JH"
    },
    {
       "stateId":12,
       "state":"Karnataka",
       "activeFlag":1,
       "stateCode":"KA"
    },
    {
       "stateId":13,
       "state":"Kerala",
       "activeFlag":1,
       "stateCode":"KL"
    },
    {
       "stateId":14,
       "state":"Madhya Pradesh",
       "activeFlag":1,
       "stateCode":"MP"
    },
    {
       "stateId":15,
       "state":"Maharashtra",
       "activeFlag":1,
       "stateCode":"MH"
    },
    {
       "stateId":16,
       "state":"Manipur",
       "activeFlag":1,
       "stateCode":"MN"
    },
    {
       "stateId":17,
       "state":"Meghalaya",
       "activeFlag":1,
       "stateCode":"ML"
    },
    {
       "stateId":18,
       "state":"Mizoram",
       "activeFlag":1,
       "stateCode":"MZ"
    },
    {
       "stateId":19,
       "state":"Nagaland",
       "activeFlag":1,
       "stateCode":"NL"
    },
    {
       "stateId":20,
       "state":"Orissa",
       "activeFlag":1,
       "stateCode":"OR"
    },
    {
       "stateId":21,
       "state":"Punjab",
       "activeFlag":1,
       "stateCode":"PB"
    },
    {
       "stateId":22,
       "state":"Rajasthan",
       "activeFlag":1,
       "stateCode":"RJ"
    },
    {
       "stateId":23,
       "state":"Sikkim",
       "activeFlag":1,
       "stateCode":"SK"
    },
    {
       "stateId":24,
       "state":"Tamil Nadu",
       "activeFlag":1,
       "stateCode":"TN"
    },
    {
       "stateId":25,
       "state":"Tripura",
       "activeFlag":1,
       "stateCode":"TR"
    },
    {
       "stateId":26,
       "state":"Uttaranchal",
       "activeFlag":1,
       "stateCode":"UK"
    },
    {
       "stateId":27,
       "state":"Uttar Pradhesh",
       "activeFlag":1,
       "stateCode":"UP"
    },
    {
       "stateId":28,
       "state":"West Bengal",
       "activeFlag":1,
       "stateCode":"WB"
    },
    {
       "stateId":29,
       "state":"Arunachal Pradesh",
       "activeFlag":1,
       "stateCode":"AR"
    },
    {
       "stateId":30,
       "state":"Delhi",
       "activeFlag":1,
       "stateCode":"DL"
    },
    {
       "stateId":31,
       "state":"uttarakhand",
       "activeFlag":1,
       "stateCode":"UK"
    },
    {
       "stateId":32,
       "state":"Puducherry",
       "activeFlag":1,
       "stateCode":"PY"
    },
    {
       "stateId":33,
       "state":"Chandigarh",
       "activeFlag":1,
       "remarks":"UT",
       "stateCode":"CH"
    },
    {
       "stateId":34,
       "state":"Dadra and Nagar Haveli",
       "activeFlag":1,
       "remarks":"UT",
       "stateCode":"DN"
    },
    {
       "stateId":35,
       "state":"Daman and Diu",
       "activeFlag":1,
       "remarks":"UT",
       "stateCode":"DD"
    },
    {
       "stateId":36,
       "state":"Lakshadweep",
       "activeFlag":1,
       "remarks":"UT",
       "stateCode":"LD"
    },
    {
       "stateId":37,
       "state":"Puducherry",
       "activeFlag":1,
       "remarks":"UT",
       "stateCode":"PY"
    },
    {
       "stateId":38,
       "state":"Andaman and Nicobar Islands",
       "activeFlag":1,
       "remarks":"UT",
       "stateCode":"AN"
    },
    {
       "stateId":39,
       "state":"NCT Delhi",
       "activeFlag":1,
       "remarks":"UT",
       "stateCode":"NDL"
    }
 ];
 companyType=[
    {
       "code":1,
       "desc":"Grocery Stores and Supermarkets"
    },
    {
        "code":2,
        "desc":"Digital Goods-Multi-Category"
    },
    {
        "code":3,
        "desc":"Miscellaneous General Merchandise"
    },
    {
        "code":4,
        "desc":"Telecommunication Equipment Including Telephone Sales"
    },
    {
        "code":5,
        "desc":"Debt collection agencies"
    },
  ];
  accountType=[
    {
       "code":"Savings Account",
       "desc":"Savings Account"
    },
    {
        "code":"Current Account",
        "desc":"Current Account"
    }
  ];
  constructor(
  ) {
  }

}
